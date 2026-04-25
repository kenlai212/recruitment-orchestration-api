export class CertificationDTO {
    certificationId: string;
    candidateId: string;
    authority: string;
    name: string;
    licenseNumber: string;
    startDate!: Date;
    endDate: Date;
}

export class NewCertificationRequestDTO {
    candidateId: string;
    authority: string;
    name: string;
    licenseNumber: string;
    startDate!: Date;
    endDate: Date;
}