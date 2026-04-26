export class ResumeDTO {
    resumeId: string;
    candidateId: string;
    documentIdentifier: string;
}

export class UploadResumeRequestDTO {
    candidateId: string;
    documentBase64: string;
}