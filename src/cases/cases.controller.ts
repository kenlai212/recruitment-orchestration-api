import { Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { CaseDTO } from "./cases.dtos";

@Controller('cases')
export class CasesController {
    @Post("/case")
    async newCase(): Promise<CaseDTO> {
        return new CaseDTO();
    }

    @Get("/case/:candidateId")
    async getCasesByCandidateId(@Query('candidateId') candidateId: string): Promise<Array<CaseDTO>> {
        return [];
    }

    @Delete("/case/:caseId")
    async deleteCaseById(@Query('caseId') caseId: string): Promise<void> {
    }

    @Post("/case/:caseId/close")
    async closeCaseById(@Query('caseId') caseId: string): Promise<CaseDTO> {
        return new CaseDTO();
    }

    @Post("/case/:caseId/reopen")
    async reopenCaseById(@Query('caseId') caseId: string): Promise<CaseDTO> {
        return new CaseDTO();
    }

    @Post("/case/:caseId/assign")
    async assignCaseById(@Query('caseId') caseId: string, @Query('recruiterId') recruiterId: string): Promise<CaseDTO> {
        return new CaseDTO();
    }

    @Post("/case/:caseId/unassign")
    async unassignCaseById(@Query('caseId') caseId: string): Promise<CaseDTO> {
        return new CaseDTO();
    }
}