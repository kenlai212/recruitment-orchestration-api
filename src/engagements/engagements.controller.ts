import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { EngagementDTO, GetEngagementsRequestDTO, PostEngagementRequestDTO } from "./engagements.dtos";
import { EngagementsService } from "./engagements.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@Controller("/engagement")
export class EngagementsController {
    constructor(
        private readonly engagementsService: EngagementsService
    ) { }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Engagement for a Recruitment Case.',
        description: `Each Engagement must be tie to an existing Recruitment Case. `
    })
    @ApiOkResponse({
        description: 'Successfully POST a new engagement.',
        type: EngagementDTO,
    })
    async newEngagement(@Body() body: PostEngagementRequestDTO): Promise<EngagementDTO> {
        return await this.engagementsService.createNewEngagement(body.recruitmentCaseId, body.engagementType);
    }

    @Get("/")
    @ApiOperation({
        summary: 'Get Engagement by the engagementId.',
        description: `Get the details of a specific Engagement record.`
    })
    @ApiOkResponse({
        description: 'Returns a list of engagements.',
        type: EngagementDTO,
    })
    async getEngagementsById(@Query() query: GetEngagementsRequestDTO): Promise<Array<EngagementDTO>> {
        return await this.engagementsService.findEngagements(query.recruitmentCaseId, query.engagementId);
    }

    @Delete("/:engagementId")
    async deleteEngagementById(@Param('engagementId') engagementId: string): Promise<string> {
        return await this.engagementsService.deleteEngagement(engagementId);
    }
}