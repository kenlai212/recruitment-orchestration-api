import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, IsEmail, IsOptional, IsDate } from 'class-validator';
import { CaseStatus } from "./recruitmentCase.entity";

export class RecruitmentCaseDTO {
    @ApiProperty({
        description: 'New Case ID',
        example: `803aaf29-3f15-43d0-91c4-02a3a9fad9c0`
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    caseId: string;

    @ApiProperty({
        description: 'New Candidate ID',
        example: `96e4e28e-2404-4a4f-b69a-6b0709559596`
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    candidateId: string;

    @ApiProperty({
        description: 'Recruiter ID (Agent Leader)',
        example: 'a54e4053-cee1-4a94-b72d-0cd271b76609'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    recruiterId: string;

    @ApiProperty({
        description: 'Recruit Case current status',
        example: 'OPEN'
    })
    @IsNotEmpty()
    status: CaseStatus;

    @ApiProperty({
        description: 'Record creation datetime',
        example: 'YYYY-MM-DDTHH:mm:ss.sssZ'
    })
    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

    @ApiProperty({
        description: 'Record last updated datetime',
        example: 'YYYY-MM-DDTHH:mm:ss.sssZ'
    })
    @IsNotEmpty()
    @IsDate()
    updatedAt: Date;
}

export class PostCaseRequestDTO {
    @ApiProperty({
        description: 'Recruiter ID (Agent Leader)',
        example: 'a54e4053-cee1-4a94-b72d-0cd271b76609'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    recruiterId: string;

    @ApiProperty({
        description: `Candidate's full name`,
        example: "John Smith"
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    candidateFullName: string;

    @ApiPropertyOptional({
        description: `Candidate's Email Address`,
        example: "john.smith@test.com"
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    candidateEmailAddress!: string;

    @ApiPropertyOptional({
        description: `Candidate's Phone Number`,
        example: `+852 1234 5678`
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    candidatePhoneNumber!: string;
}

export class GetCaseCyCandidateIdRequestDTO {
    @ApiProperty({
        description: 'Candidate ID',
        example: 'a54e4053-cee1-4a94-b72d-0cd271b76609'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    candidateId: string;
}