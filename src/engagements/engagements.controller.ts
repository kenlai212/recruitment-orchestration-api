import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { EngagementDTO, PostEngagementRequestDTO } from "./engagements.dtos";
import { EngagementsService } from "./engagements.service";

@Controller("/engagement")
export class EngagementsController {
    constructor(
        private readonly engagementsService: EngagementsService
    ) { }

    @Post("/")
    async newEngagement(@Body() body: PostEngagementRequestDTO): Promise<EngagementDTO> {
        return await this.engagementsService.createNewEngagement(body.recruitmentCaseId, body.engagementType);
    }

    @Get("/:engagementId")
    async getEngagementById(@Param('engagementId') engagementId: string): Promise<EngagementDTO> {
        return await this.engagementsService.findEngagementById(engagementId);
    }

    @Delete("/:engagementId")
    async deleteEngagementById(@Param('engagementId') engagementId: string): Promise<string> {
        return await this.engagementsService.deleteEngagement(engagementId);
    }
}