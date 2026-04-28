import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CaseStatus, RecruitmentCase } from "./recruitmentCase.entity";
import { Repository } from "typeorm";
import { RecruitmentCaseDTO } from "./recruitmentCases.dtos";
import { RecruitmentCasesServiceHelper } from "./recruitmentCases.service.helper";

@Injectable()
export class RecruitmentCasesService {
    private readonly logger: Logger = new Logger('CasesService');

    constructor(
        @InjectRepository(RecruitmentCase)
        private readonly caseRepository: Repository<RecruitmentCase>,
        private readonly helper: RecruitmentCasesServiceHelper,
    ) { }

    async createNewCase(recruiterId: string, candidateFullName: string, emailAddress?: string, phoneNumber?: string): Promise<RecruitmentCaseDTO> {
        let recruitmentCase = new RecruitmentCase();
        recruitmentCase.status = CaseStatus.OPEN;

        //create canadidate
        const candidateId = await this.helper.createNewCandidate(candidateFullName, emailAddress, phoneNumber);
        recruitmentCase.candidateId = candidateId;

        //validate and set recruiterId (Agent Leader);
        await this.helper.validateRecuriterId(recruiterId);
        recruitmentCase.recuriterId = recruiterId;

        await this.caseRepository.save(recruitmentCase)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createCase() not available");
            });

        return this.entityToDTO(recruitmentCase);
    }

    async findByCandidateId(candidateId: string): Promise<RecruitmentCaseDTO> {
        let recuritmentCase = await this.caseRepository.findOne({ where: { candidateId } })
            .catch(error => {
                this.logger.error(error);
                throw new InternalServerErrorException("findByCandidateId() not available");
            })

        if (!recuritmentCase)
            throw new NotFoundException(`No recuritment case found for candidate ${candidateId}`);

        this.logger.debug(`found recruitment case : ${JSON.stringify(recuritmentCase)}`)

        return this.entityToDTO(recuritmentCase);
    }

    async validateRecruitmentCaseid(caseId: string) {
        let recuritmentCase = await this.caseRepository.findOne({ where: { caseId } })
            .catch(error => {
                this.logger.error(error);
                throw new InternalServerErrorException("validateRecruitemntCaseId() not available");
            })

        if (!recuritmentCase)
            throw new BadRequestException(`No recuritment case found with ID ${caseId}`);
    }

    private entityToDTO(caseEntity: RecruitmentCase) {
        let caseDTO = new RecruitmentCaseDTO();
        caseDTO.caseId = caseEntity.caseId;
        caseDTO.recruiterId = caseEntity.recuriterId;
        caseDTO.candidateId = caseEntity.candidateId;
        caseDTO.createdAt = caseEntity.createdAt;
        caseDTO.updatedAt = caseEntity.updatedAt;

        return caseDTO;
    }
}