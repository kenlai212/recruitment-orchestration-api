import { Module } from "@nestjs/common";
import { CandidatesController } from "./candidates.controller";
import { CandidateService } from "./candidates.service";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { Candidate } from "./candidate.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Candidate]),
    ],
    controllers: [
        CandidatesController
    ],
    providers: [
        CandidateService
    ]
})
export class CandidatesModule { }