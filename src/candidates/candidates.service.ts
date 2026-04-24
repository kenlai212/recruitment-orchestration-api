import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Candidate } from "./candidate.entity";
import { Repository } from 'typeorm';
import { CandidateDTO } from "./candidates.dto";

@Injectable()
export class CandidateService {
    private readonly logger = new Logger('CandidateService');

    constructor(
        @InjectRepository(Candidate)
        private readonly candidateRepository: Repository<Candidate>,
    ) { }

    async createCandidate(fullName: string): Promise<CandidateDTO> {
        let candidate = new Candidate();
        candidate.fullName = fullName;

        await this.candidateRepository.save(candidate)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createCandidate() not available");
            });

        return this.candidateEntityToDTO(candidate);
    }

    private candidateEntityToDTO(candidate: Candidate): CandidateDTO {
        let dto = new CandidateDTO(candidate.fullName);
        dto.candidateId = candidate.candidateId;
        dto.createdAt = candidate.createdAt;
        dto.updatedAt = candidate.updatedAt;
        return dto;
    }
}