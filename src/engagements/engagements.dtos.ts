import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class EngagementDTO {
    engagementId: string;
    recruitmentCaseId: string;
    type: string;
}

export enum EngagementType {
    ONE_MEET = 'ONE_MEET',
    GROUP_MEET = 'GROUP_MEET',
    TRAINING = 'TRAINING'
}

export class PostEngagementRequestDTO {
    @ApiProperty({
        description: 'The ID of the candidate',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    recruitmentCaseId: string;

    @ApiProperty({
        description: 'The ID of the candidate',
        enum: EngagementType,
        enumName: 'EngagementType'
    })
    @IsNotEmpty()
    type: EngagementType;
}