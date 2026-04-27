import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { RecruitmentCaseDTO, PostCaseRequestDTO } from "./recruitmentCases.dtos";
import { RecruitmentCasesService } from "./recruitmentCases.service";

@Controller("/recruitment-case")
export class RecruitmentCasesController {
    constructor(
        private readonly recruitmentCasesService: RecruitmentCasesService
    ) { }


    @Post("/")
    async newCase(@Body() body: PostCaseRequestDTO): Promise<RecruitmentCaseDTO> {
        return await this.recruitmentCasesService.createNewCase(body.recruiterId, body.candidateFullName, body.candidateEmailAddress, body.candidatePhoneNumber);
    }

    @Get("/:candidateId")
    async getCasesByCandidateId(@Query('candidateId') candidateId: string): Promise<RecruitmentCaseDTO> {
        return await this.recruitmentCasesService.findByCandidateId(candidateId);
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

    @Post("/case/reassign")
    async assignCaseById(@Query('caseId') caseId: string, @Query('recruiterId') recruiterId: string): Promise<RecruitmentCaseDTO> {
        return new RecruitmentCaseDTO();
    }
}