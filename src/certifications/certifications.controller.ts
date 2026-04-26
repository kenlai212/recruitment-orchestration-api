import { Body, Controller, Delete, Get, NotFoundException, Post, Query } from "@nestjs/common";
import { CertificationDTO, NewCertificationRequestDTO, UploadLicenseRequestDTO } from "./certifications.dtos";
import { CertificationsService } from "./certifications.service";

@Controller()
export class CertificationsController {
    constructor(
        private readonly certificationsService: CertificationsService
    ) { }

    @Post("/certification")
    async newCertification(@Body() body: NewCertificationRequestDTO): Promise<CertificationDTO> {
        return this.certificationsService.createCertification(
            body.candidateId,
            body.authority,
            body.certificateName,
            body.certificateNumber,
            body.startDate,
            body.endDate
        );
    }

    @Get("/certification/:candidateId")
    async getCertificationsByCandidateId(@Query('candidateId') candidateId: string): Promise<Array<CertificationDTO>> {
        const certifications = await this.certificationsService.findCertifications(candidateId);

        if (certifications.length === 0) {
            throw new NotFoundException("No certifications found for candidate ID: " + candidateId);
        }

        return certifications;
    }

    @Delete("/certification/:certificationId")
    async deleteCertificationById(@Query('certificationId') certificationId: string): Promise<void> {
        await this.certificationsService.deleteCertification(certificationId);
    }

    @Post("/certification/upload-license")
    async uploadLicense(@Body() body: UploadLicenseRequestDTO): Promise<CertificationDTO> {
        return await this.certificationsService.uploadLicense(body.certificationId, body.documentBase64);
    }
}