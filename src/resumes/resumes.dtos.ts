import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ActorType } from "./resume.entity";

export class ResumeDTO {
    resumeId: string;
    actorType: ActorType;
    actorId: string;
    documentIdentifier: string;
}

export class UploadResumeRequestDTO {
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

    documentBase64: string;
}

export class GetResumesRequestDTO {
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
}