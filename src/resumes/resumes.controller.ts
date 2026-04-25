import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ResumeDTO, UploadResumeRequestDTO } from "./resumes.dtos";

@Controller()
export class ResumesController {
    @Post("/resume")
    async uploadResume(@Body() body: UploadResumeRequestDTO): Promise<ResumeDTO> {
        return new ResumeDTO();
    }

    @Delete("/resume/:resumeId")
    async deleteResume(@Param('resumeId') resumeId: string): Promise<void> {
        return;
    }

    @Get("/resume/:candidateId")
    async getResumeByCandidateId(@Param('candidateId') candidateId: string): Promise<Array<ResumeDTO>> {
        return [new ResumeDTO()];
    }
}