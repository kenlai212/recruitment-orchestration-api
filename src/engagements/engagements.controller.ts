import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { PostCaseRequestDTO } from "../recruitmentCases/recruitmentCases.dtos";
import { EngagementDTO } from "./engagements.dtos";

@Controller()
export class EngagementsController {
    constructor() { }

    @Post("/engagement")
    async newEngagement(@Body() body: PostCaseRequestDTO): Promise<EngagementDTO> {
        return new EngagementDTO;
    }

    @Get("/engagement/:engagementId")
    async getEngagementById(): Promise<void> {
    }

    @Delete("/engagement/:engagementId")
    async deleteEngagementById(): Promise<void> {
    }
}