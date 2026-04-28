import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { EngagementType } from "./engagement.entity";

export class EngagementDTO {
    engagementId: string;
    recruitmentCaseId: string;
    engagementType: string;
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
    engagementType: EngagementType;
}