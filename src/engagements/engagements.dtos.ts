import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { EngagementType } from "./engagement.entity";

export class EngagementDTO {
    @ApiProperty({
        description: 'Unique Engagement ID',
        example: `803aaf29-3f15-43d0-91c4-02a3a9fad9c0`
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    engagementId: string;

    @ApiProperty({
        description: 'Corrisponding Recruitment Case ID',
        example: `96e4e28e-2404-4a4f-b69a-6b0709559596`
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    recruitmentCaseId: string;

    @ApiProperty({
        description: `Engagement Type, must be one of : ${Object.keys(EngagementType)}`,
        example: `${EngagementType.GROUP_MEET}`
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    engagementType: EngagementType;
}

export class PostEngagementRequestDTO {
    @ApiProperty({
        description: 'Recruitment Case ID',
        example: '96e4e28e-2404-4a4f-b69a-6b0709559596'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    recruitmentCaseId: string;

    @ApiProperty({
        description: 'The ID of the candidate',
        example: EngagementType.GROUP_MEET,
        enum: EngagementType,
        enumName: 'EngagementType'
    })
    @IsNotEmpty()
    engagementType: EngagementType;
}

export class GetEngagementsRequestDTO {
    @ApiPropertyOptional({
        description: 'Recruitment Case ID, using this will return all the Engagements of the target Recruitment Case',
        example: '803aaf29-3f15-43d0-91c4-02a3a9fad9c0'
    })
    @IsString()
    @MaxLength(36)
    recruitmentCaseId!: string;

    @ApiPropertyOptional({
        description: 'Engagement ID, usign this will return a single engagement',
        example: '96e4e28e-2404-4a4f-b69a-6b0709559596'
    })
    @IsString()
    @MaxLength(36)
    engagementId!: string;
}