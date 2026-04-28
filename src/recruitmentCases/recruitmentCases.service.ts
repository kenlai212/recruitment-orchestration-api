import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RecruitmentCase } from "./recruitmentCase.entity";
import { Repository } from "typeorm";
import { RecruitmentCaseDTO } from "./recruitmentCases.dtos";

@Injectable()
export class RecruitmentCasesService {
    private readonly logger: Logger = new Logger('CasesService');

    constructor(
        @InjectRepository(RecruitmentCase)
        private readonly caseRepository: Repository<RecruitmentCase>,
    ) { }

    async createNewCase(recruiterId: string, candidateFullName: string, emailAddress?: string, phoneNumber?: string): Promise<RecruitmentCaseDTO> {
        let recruitmentCase = new RecruitmentCase();

        //create canadidate
        const candidateDTO = await this.candidatesService.createCandidate(candidateFullName, emailAddress, phoneNumber);
        recruitmentCase.candidateId = candidateDTO.candidateId;

        //validate and set recruiterId (Agent Leader);
        await this.validateRecuriterId(recruiterId);
        recruitmentCase.recuriterId = recruiterId;

        await this.caseRepository.save(recruitmentCase)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createCase() not available");
            });

        return this.caseEntityToDTO(recruitmentCase);
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

        return this.caseEntityToDTO(recuritmentCase);
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

    private async validateRecuriterId(recuriterId: string): Promise<void> {
        //todo: implement validate agent leder id
    }

    private caseEntityToDTO(caseEntity: RecruitmentCase) {
        let caseDTO = new RecruitmentCaseDTO();
        caseDTO.caseId = caseEntity.caseId;
        caseDTO.recruiterId = caseEntity.recuriterId;
        caseDTO.candidateId = caseEntity.candidateId;

        return caseDTO;
    }
}