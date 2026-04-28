import { Module } from "@nestjs/common";
import { RecruitmentCasesController } from "./recruitmentCases.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecruitmentCase } from "./recruitmentCase.entity";
import { RecruitmentCasesService } from "./recruitmentCases.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([RecruitmentCase]),
    ],
    controllers: [
        RecruitmentCasesController
    ],
    providers: [
        RecruitmentCasesService
    ],
    exports: [
        RecruitmentCasesService
    ]
})
export class RecruitmentCasesModule { }