import { Controller, Delete, Get, Post } from "@nestjs/common";

@Controller()
export class EngagementsController {
    @Post("/engagement")
    async newEngagement(): Promise<void> {
    }

    @Get("/engagement/:engagementId")
    async getEngagementById(): Promise<void> {
    }

    @Delete("/engagement/:engagementId")
    async deleteEngagementById(): Promise<void> {
    }
}