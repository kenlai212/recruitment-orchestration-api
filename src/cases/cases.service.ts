import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Case } from "./case.entity";
import { Repository } from "typeorm";
import { CandidatesService } from "../candidates/candidates.service";
import { CaseDTO } from "./cases.dtos";

@Injectable()
export class CasesService {
    private readonly logger: Logger = new Logger('CasesService');

    constructor(
        @InjectRepository(Case)
        private readonly caseRepository: Repository<Case>,
        private readonly candidatesService: CandidatesService
    ) { }

    async createNewCase(recruiterId: string, candidateFullName: string, emailAddress?: string, phoneNumber?: string): Promise<CaseDTO> {
        let recruitmentCase = new Case();

        //create canadidate
        const candidateDTO = await this.candidatesService.createCandidate(candidateFullName, emailAddress, phoneNumber);
        recruitmentCase.candidateId = candidateDTO.candidateId;

        recruitmentCase.recuriterId = recruiterId;

        await this.caseRepository.save(recruitmentCase)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createCandidate() not available");
            });

        return this.caseEntityToDTO(recruitmentCase);
    }

    private caseEntityToDTO(caseEntity: Case) {
        let caseDTO = new CaseDTO();
        caseDTO.caseId = caseEntity.caseId;
        caseDTO.candidateId = caseEntity.candidateId;
        caseDTO.recruiterId = caseEntity.recuriterId;

        return caseDTO;
    }
}