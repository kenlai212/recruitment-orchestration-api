import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { CertificationDTO, NewCertificationRequestDTO } from "./certifications.dtos";

@Controller()
export class CertificationsController {
    @Post("/certification")
    async newCertification(@Body() body: NewCertificationRequestDTO): Promise<CertificationDTO> {
        return new CertificationDTO();
    }

    @Get("/certification/:candidateId")
    async getCertificationsByCandidateId(@Query('candidateId') candidateId: string): Promise<Array<CertificationDTO>> {
        return [];
    }

    @Delete("/certification/:certificationId")
    async deleteCertificationById(@Query('certificationId') certificationId: string): Promise<void> {
    }

    @Post("/certification/upload-license")
    async uploadLicense(@Query('certificationId') certificationId: string, @Body() licenseUrl: string): Promise<CertificationDTO> {
        return new CertificationDTO();
    }
}