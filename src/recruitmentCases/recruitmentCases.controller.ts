import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { RecruitmentCaseDTO, PostCaseRequestDTO, GetCaseCyCandidateIdRequestDTO } from "./recruitmentCases.dtos";
import { RecruitmentCasesService } from "./recruitmentCases.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@Controller("/recruitment-case")
export class RecruitmentCasesController {
    constructor(
        private readonly recruitmentCasesService: RecruitmentCasesService
    ) { }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Recruitment Case.',
        description: `Create new Recruitment Case. This will also call the agency-actors-api to create a new Candidate`
    })
    @ApiOkResponse({
        description: 'Successfully POST a new recruitment case.',
        type: RecruitmentCaseDTO,
    })
    async newCase(@Body() body: PostCaseRequestDTO): Promise<RecruitmentCaseDTO> {
        return await this.recruitmentCasesService.createNewCase(body.recruiterId, body.candidateFullName, body.candidateEmailAddress, body.candidatePhoneNumber);
    }

    @Get("/:candidateId")
    @ApiOperation({
        summary: 'Get the recruitment case for a specific candidate.',
        description: `Get the recruitment case for a specific candidate. One candidate can have only one recruitment case.`
    })
    @ApiOkResponse({
        description: 'Get the recruitment case for a specific candidate.',
        type: RecruitmentCaseDTO,
    })
    async getCasesByCandidateId(@Query('candidateId') query: GetCaseCyCandidateIdRequestDTO): Promise<RecruitmentCaseDTO> {
        return await this.recruitmentCasesService.findByCandidateId(query.candidateId);
    }

    @Delete("/:caseId")
    async deleteCaseById(@Query('caseId') caseId: string): Promise<void> {
    }

    /*@Post("/:caseId/close")
    async closeCaseById(@Query('caseId') caseId: string): Promise<RecruitmentCaseDTO> {
        return new RecruitmentCaseDTO();
    }

    @Post("/case/:caseId/reopen")
    async reopenCaseById(@Query('caseId') caseId: string): Promise<RecruitmentCaseDTO> {
        return new RecruitmentCaseDTO();
    }*/

    @Post("/close")
    async assignCaseById(@Query('caseId') caseId: string, @Query('recruiterId') recruiterId: string): Promise<RecruitmentCaseDTO> {
        return new RecruitmentCaseDTO();
    }
}