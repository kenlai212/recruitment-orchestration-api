import { Module } from "@nestjs/common";
import { CasesController } from "./cases.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Case } from "./case.entity";
import { CandidatesModule } from "../candidates/candidates.module";
import { CasesService } from "./cases.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Case]),
        CandidatesModule
    ],
    controllers: [
        CasesController
    ],
    providers: [
        CasesService
    ]
})
export class CasesModule { }