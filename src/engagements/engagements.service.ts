import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RecruitmentCasesService } from "../recruitmentCases/recruitmentCases.service";
import { EngagementDTO } from "./engagements.dtos";
import { Engagement, EngagementType } from "./engagement.entity";

@Injectable()
export class EngagementsService {
    private readonly logger: Logger = new Logger('EngagementsService')

    constructor(
        @InjectRepository(Engagement)
        private readonly engagementsRepository: Repository<Engagement>,
        private readonly casesService: RecruitmentCasesService
    ) { }

    async createNewEngagement(recuritmentCaseId: string, engagementType: EngagementType): Promise<EngagementDTO> {
        let engagement = new Engagement();

        await this.validateRecruitmentCaseId(recuritmentCaseId)
        engagement.recruitmentCaseId = recuritmentCaseId;
        engagement.engagementType = engagementType;

        await this.engagementsRepository.save(engagement)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewEngagement() not available");
            });

        return this.entityToDTO(engagement);
    }

    async findEngagements(recruitmentCaseId?: string, engagementId?: string): Promise<Array<EngagementDTO>> {
        if (!recruitmentCaseId && !engagementId)
            throw new BadRequestException("Must provide either recruitmentCaseId or engagementId");

        let whereClause = {}
        if (recruitmentCaseId)
            whereClause = { recruitmentCaseId }
        else
            whereClause = { engagementId }

        const engagements = await this.engagementsRepository.find({
            where: whereClause
        })
            .catch(error => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteEngagement() not available");
            })

        let engagementDTOs = [];
        engagements.forEach(element => {
            engagementDTOs.push(this.entityToDTO(element))
        });

        return engagementDTOs;
    }

    async deleteEngagement(engagementId: string): Promise<string> {
        const engagement = await this.engagementsRepository.findOne({ where: { engagementId } })
            .catch(error => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteEngagement() not available");
            });

        if (!engagement)
            throw new BadRequestException(`Invalid engagement id : ${engagementId}`);

        await this.engagementsRepository.delete({ engagementId })
            .then(() => {
                this.logger.log(`deleted engagement ${engagementId}`);
            })
            .catch(error => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteEngagement() not available");
            });

        const msg = `deleted engagement ${engagementId}`;
        return msg;
    }

    private async validateRecruitmentCaseId(caseId: string) {
        await this.casesService.validateRecruitmentCaseid(caseId);
    }

    entityToDTO(engagement: Engagement): EngagementDTO {
        let dto = new EngagementDTO();
        dto.engagementId = engagement.engagementId;
        dto.recruitmentCaseId = engagement.recruitmentCaseId;
        dto.engagementType = engagement.engagementType;

        return dto;
    }
}