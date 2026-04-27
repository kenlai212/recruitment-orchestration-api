import { Module } from "@nestjs/common";
import { RecruitmentCasesController } from "./recruitmentCases.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecruitmentCase } from "./recruitmentCase.entity";
import { CandidatesModule } from "../candidates/candidates.module";
import { RecruitmentCasesService } from "./recruitmentCases.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([RecruitmentCase]),
        CandidatesModule
    ],
    controllers: [
        RecruitmentCasesController
    ],
    providers: [
        RecruitmentCasesService
    ]
})
export class RecruitmentCasesModule { }