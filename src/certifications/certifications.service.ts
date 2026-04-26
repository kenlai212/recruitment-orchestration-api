import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Certification } from "./certification.entity";
import { CertificationDTO } from "./certifications.dtos";

@Injectable()
export class CertificationsService {
    private readonly logger = new Logger('CertificationService');

    constructor(
        @InjectRepository(Certification)
        private readonly certificationRepository: Repository<Certification>,
    ) { }

    async createCertification(candidateId: string, authority: string, certificateName: string, certificateNumber: string, startDate: Date, endDate: Date): Promise<CertificationDTO> {
        let certification = new Certification();

        // Validate candidate ID
        if (!await this.validateCandidateId(candidateId)) {
            throw new BadRequestException("");
        }
        certification.candidateId = candidateId;

        // Validate authority and certificate name
        if (!await this.validateAuthorityAndCertificateName(authority, certificateName)) {
            throw new BadRequestException("Authority and certificate name not recognized");
        }
        certification.authority = authority;
        certification.certificateName = certificateName;

        certification.certificateNumber = certificateNumber;
        certification.startDate = startDate;
        certification.endDate = endDate;

        await this.certificationRepository.save(certification)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createCertification() not available");
            });

        return this.certificationToDTO(certification);
    }

    async findCertifications(candidateId: string): Promise<Array<CertificationDTO>> {
        const certifications = await this.certificationRepository.find({ where: { candidateId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("findCertifications() not available");
            });

        let certificationDTOs: Array<CertificationDTO> = [];
        for (const certification of certifications) {
            this.logger.debug(`Found certification: ${JSON.stringify(certification)}`);
            certificationDTOs.push(this.certificationToDTO(certification));
        }

        return certificationDTOs;
    }

    async deleteCertification(certificationId: string): Promise<void> {
        const certification = await this.certificationRepository.findOne({ where: { certificationId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteCertification() not available");
            });

        if (!certification) {
            throw new BadRequestException("Certification with ID " + certificationId + " not found");
        }

        await this.certificationRepository.delete({ certificationId })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteCertification() not available");
            });
    }

    async uploadLicense(certificationId: string, documentBase64: string): Promise<CertificationDTO> {
        const certification = await this.certificationRepository.findOne({ where: { certificationId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("uploadLicense() not available");
            });

        if (!certification) {
            throw new BadRequestException("Certification with ID " + certificationId + " not found");
        }

        const documentUrl = await this.callExternalDocumentStorageService(documentBase64)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("Failed to upload document to external storage service");
            });
        certification.documentIdentifier = documentUrl;

        await this.certificationRepository.save(certification)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("uploadLicense() not available");
            });

        let certificationDTO = this.certificationToDTO(certification);
        certificationDTO.documentIdentifier = documentUrl;

        return certificationDTO;
    }

    private async callExternalDocumentStorageService(documentBase64: string): Promise<string> {
        return "https://example.com/document/12345";
    }

    private async validateAuthorityAndCertificateName(authority: string, certificateName: string): Promise<boolean> {
        if (!authority || !certificateName) {
            throw new BadRequestException("Authority and certificate name are required");
        }

        //todo: implement actual validation logic, e.g. check against a list of known authorities and certificate names

        return true;
    }


    private async validateCandidateId(candidateId: string): Promise<boolean> {
        if (!candidateId) {
            throw new InternalServerErrorException("Candidate ID is required");
        }

        //todo: implement actual validation logic, e.g. check if candidate exists in the database

        return true;
    }

    private certificationToDTO(certification: Certification): CertificationDTO {
        const certificationDTO = new CertificationDTO();
        certificationDTO.certificationId = certification.certificationId;
        certificationDTO.candidateId = certification.candidateId;
        certificationDTO.authority = certification.authority;
        certificationDTO.certificateName = certification.certificateName;
        certificationDTO.certificateNumber = certification.certificateNumber;
        certificationDTO.startDate = certification.startDate;
        certificationDTO.endDate = certification.endDate;
        return certificationDTO;
    }
}