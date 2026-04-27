import { Module } from "@nestjs/common";
import { EngagementsController } from "./engagements.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Engagement } from "./engagement.entity";
import { RecruitmentCasesModule } from "../recruitmentCases/recruitmentCases.module";
import { EngagementsService } from "./engagements.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Engagement]),
        RecruitmentCasesModule
    ],
    controllers: [
        EngagementsController
    ],
    providers: [
        EngagementsService
    ]
})
export class EngagementsModule { }