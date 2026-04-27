import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ActorType } from "./govermentId.entity";

export class GovermentIdDTO {
    governmentIdId: string;
    actorType: ActorType;
    actorId: string;
    documentIdentifier: string;
    issuerCountryCode: string;
    idType: string;
    idNumber: string;
    createdAt: Date;
    updatedAt: Date;
}

export class NewGovernmentIdRequestDTO {
    @ApiProperty({
        description: 'Actor Type, either agent or candidate',
        enum: ActorType,
        enumName: "ActorType"
    })
    @IsNotEmpty()
    actorType: ActorType;

    @ApiProperty({
        description: 'The ID of the candidate or agent',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    actorId: string;

    @ApiProperty({
        description: 'document base64 string',
    })
    @IsNotEmpty()
    @IsString()
    documentBase64: string;

    @ApiProperty({
        description: 'issuer goverment country',
    })
    @IsNotEmpty()
    @IsString()
    issuerCountryCode: string;

    @ApiProperty({
        description: 'Type of Goverment issued ID',
    })
    @IsNotEmpty()
    @IsString()
    idType: string;

    @ApiProperty({
        description: 'ID unique identifier',
    })
    @IsNotEmpty()
    @IsString()
    idNumber: string;
}