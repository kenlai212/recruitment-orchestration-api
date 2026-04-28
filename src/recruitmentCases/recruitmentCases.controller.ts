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

    @ApiOperation({
        summary: 'Delete the recruitment case for a specific candidate.',
        description: `Please becareful, this will be a hard delete. and all of it's engagement records`
    })
    @ApiOkResponse({
        description: 'Successfull delete message',
        type: String,
    })
    @Delete("/:caseId")
    async deleteCaseById(@Query('caseId') caseId: string): Promise<string> {
        return "successful deletion";
    }

    @ApiOperation({
        summary: 'Close the recruitment case.',
        description: `Close case will only change the status`
    })
    @ApiOkResponse({
        description: 'Change the Recruitemnt Case status to CLOSE',
        type: RecruitmentCaseDTO,
    })
    @Post("/close")
    async closeCase(@Query('caseId') caseId: string, @Query('recruiterId') recruiterId: string): Promise<RecruitmentCaseDTO> {
        return new RecruitmentCaseDTO();
    }

    //todo: reopen case
}