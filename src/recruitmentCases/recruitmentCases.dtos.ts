import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, IsEmail, IsOptional } from 'class-validator';

export class RecruitmentCaseDTO {
    caseId: string;
    candidateId: string;
    recruiterId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export class PostCaseRequestDTO {
    @ApiProperty({
        description: 'The ID of the Recruiter',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    recruiterId: string;

    @ApiProperty({
        description: `Candidate's full name`,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    candidateFullName: string;

    @ApiPropertyOptional({
        description: `Candidate's Email Address`,
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    candidateEmailAddress!: string;

    @ApiPropertyOptional({
        description: `Candidate's Phone Number`,
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    candidatePhoneNumber!: string;
}