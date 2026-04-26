import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Certification } from "./certification.entity";
import { CertificationDTO } from "./certifications.dtos";
import { CandidatesService } from "../candidates/candidates.service";
import { AuthoritiesService } from "./authoritries.service";

@Injectable()
export class CertificationsService {
    private readonly logger: Logger = new Logger('CertificationService')

    constructor(
        @InjectRepository(Certification)
        private readonly certificationRepository: Repository<Certification>,
        private readonly candidatesService: CandidatesService,
        private readonly authortiesService: AuthoritiesService
    ) { }

    async createCertification(candidateId: string, authority: string, certificateName: string, certificateNumber: string, startDate: Date, endDate: Date): Promise<CertificationDTO> {
        let certification = new Certification();

        // Validate candidate ID
        await this.validateCandidateId(candidateId);
        certification.candidateId = candidateId;

        // Validate authority and certificate name
        this.authortiesService.validateAuthority(authority);
        certification.authority = authority;

        // Validate certificate name
        this.authortiesService.validateCertificateName(certificateName);
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




    private async validateCandidateId(candidateId: string): Promise<boolean> {
        if (!candidateId) {
            throw new InternalServerErrorException("Candidate ID is required");
        }

        const candidateExists = await this.candidatesService.validateCandidateId(candidateId);
        if (!candidateExists) {
            throw new BadRequestException("Candidate with ID " + candidateId + " not found");
        }

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