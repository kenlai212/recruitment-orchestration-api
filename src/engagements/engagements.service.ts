import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Engagement } from "./engagement.entity";
import { Repository } from "typeorm";
import { RecruitmentCasesService } from "../recruitmentCases/recruitmentCases.service";
import { EngagementDTO } from "./engagements.dtos";

@Injectable()
export class EngagementsService {
    private readonly logger: Logger = new Logger('EngagementsService')

    constructor(
        @InjectRepository(Engagement)
        private readonly engagementsRepository: Repository<Engagement>,
        private readonly casesService: RecruitmentCasesService
    ) { }

    async createNewEngagement(recuritmentCaseId: string, type: string): Promise<EngagementDTO> {
        let engagement = new Engagement();

        await this.validateRecruitmentCaseId(recuritmentCaseId)
        engagement.recruitmentCaseId = recuritmentCaseId;

        this.validateType(type);
        engagement.type = type;

        await this.engagementsRepository.save(engagement)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewEngagement() not available");
            });

        return this.entityToDTO(engagement);
    }

    private async validateType(type: string) {

    }

    private async validateRecruitmentCaseId(caseId: string) {
        await this.casesService.validateRecruitmentCaseid(caseId);
    }

    entityToDTO(engagement: Engagement): EngagementDTO {
        let dto = new EngagementDTO();
        dto.engagementId = engagement.engagementId;
        dto.recruitmentCaseId = engagement.recruitmentCaseId;
        dto.type = engagement.type;

        return dto;
    }
}