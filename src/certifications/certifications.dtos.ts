import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CertificationDTO {
    certificationId: string;
    candidateId: string;
    authority: string;
    certificateName: string;
    certificateNumber: string;
    startDate!: Date;
    endDate: Date;
    documentIdentifier!: string;
}

export class NewCertificationRequestDTO {
    @ApiProperty({
        description: 'The ID of the candidate',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    candidateId: string;

    @ApiProperty({
        description: 'The authority that issued the certification',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    authority: string;

    @ApiProperty({
        description: 'The name of the certificate',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    certificateName: string;

    @ApiProperty({
        description: 'Certificate number or identifier',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    certificateNumber: string;

    @ApiProperty({
        description: 'The start date of the certification',
    })
    @IsNotEmpty()
    @IsString()
    startDate!: Date;

    @ApiProperty({
        description: 'The end date of the certification',
    })
    @IsNotEmpty()
    @IsString()
    endDate: Date;
}

export class UploadLicenseRequestDTO {
    @ApiProperty({
        description: 'The ID of the certification',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    certificationId: string;

    @ApiProperty({
        description: 'The base64-encoded license document',
    })
    @IsNotEmpty()
    @IsString()
    documentBase64: string;
}