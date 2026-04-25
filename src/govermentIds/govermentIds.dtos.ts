export class GovermentIdDTO {
    governmentIdId: string;
    candidateId: string;
    documentIdentifier: string;
    issuerCountryCode: string;
    idType: string;
    idNumber: string;
    createdAt: Date;
    updatedAt: Date;
}

export class NewGovernmentIdRequestDTO {
    candidateId: string;
    documentBase64: string;
    issuerCountryCode: string;
    idType: string;
    idNumber: string;
}