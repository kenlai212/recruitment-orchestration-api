import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { EngagementDTO, PostEngagementRequestDTO } from "./engagements.dtos";
import { EngagementsService } from "./engagements.service";

@Controller()
export class EngagementsController {
    constructor(
        private readonly engagementsService: EngagementsService
    ) { }

    @Post("/engagement")
    async newEngagement(@Body() body: PostEngagementRequestDTO): Promise<EngagementDTO> {
        return await this.engagementsService.createNewEngagement(body.recruitmentCaseId, body.type);
    }

    @Get("/engagement/:engagementId")
    async getEngagementById(): Promise<void> {
    }

    @Delete("/engagement/:engagementId")
    async deleteEngagementById(): Promise<void> {
    }
}