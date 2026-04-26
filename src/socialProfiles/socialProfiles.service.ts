import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { SocialProfile } from "./socialProfile.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { SocialProfileDTO } from "./socialProfiles.dtos";
import { CandidatesService } from "../candidates/candidates.service";

@Injectable()
export class SocialProfilesService {
    private readonly logger: Logger = new Logger('SocialProfilesService')

    constructor(
        @InjectRepository(SocialProfile)
        private readonly socialProfileRepository: Repository<SocialProfile>,
        private readonly candidatesService: CandidatesService
    ) { }

    async createSocialProfile(candidateId: string, provider: string, providerHandle: string, url?: string, providerUserId?: string): Promise<SocialProfileDTO> {
        if (!await this.checkSocialProfileUnique(provider, providerHandle)) {
            throw new BadRequestException("Social profile with the same provider and provider handle already exists");
        }

        let socialProfile = new SocialProfile();

        await this.validateCandidateId(candidateId);
        socialProfile.candidateId = candidateId;

        socialProfile.provider = provider;
        socialProfile.providerHandle = providerHandle;

        if (url) {
            socialProfile.url = url;
        }
        if (providerUserId) {
            socialProfile.providerUserId = providerUserId;
        }

        await this.socialProfileRepository.save(socialProfile)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createSocialProfile() not available");
            });

        return this.socialProfileEntityToDTO(socialProfile);
    }

    async findSocialProfiles(candidateId?: string, provider?: string, providerHandle?: string): Promise<Array<SocialProfileDTO>> {
        if (!candidateId && !provider && !providerHandle) {
            throw new BadRequestException("At least one of candidateId, provider or providerHandle must be provided");
        }

        let whereClause: any = {};
        if (candidateId) {
            whereClause.candidateId = candidateId;
        }

        if (provider && providerHandle) {
            whereClause.provider = provider;
            whereClause.providerHandle = providerHandle;
        }

        const socialProfiles = await this.socialProfileRepository.find({ where: whereClause });
        return socialProfiles.map((sp) => this.socialProfileEntityToDTO(sp));
    }

    async deleteSocialProfile(socialProfileId: string): Promise<void> {
        await this.socialProfileRepository.delete({ socialProfileId })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteSocialProfile() not available");
            });
    }

    private async validateCandidateId(candidateId: string): Promise<boolean> {
        const candidate = await this.candidatesService.validateCandidateId(candidateId);

        if (!candidate) {
            throw new BadRequestException("Candidate with ID " + candidateId + " not found");
        } else {
            return true;
        }
    }

    private async checkSocialProfileUnique(provider: string, providerHandle: string): Promise<boolean> {
        return await this.socialProfileRepository.findOne({ where: { provider, providerHandle } })
            .then((socialProfile) => {
                return socialProfile ? false : true;
            }
            )
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("checkSocialProfileUnique() not available");
            });

    }

    private socialProfileEntityToDTO(socialProfile: SocialProfile): SocialProfileDTO {
        let socialProfileDTO = new SocialProfileDTO();
        socialProfileDTO.id = socialProfile.socialProfileId;
        socialProfileDTO.createdAt = socialProfile.createdAt;
        socialProfileDTO.updatedAt = socialProfile.updatedAt;
        socialProfileDTO.candidateId = socialProfile.candidateId;
        socialProfileDTO.provider = socialProfile.provider;
        socialProfileDTO.url = socialProfile.url;
        socialProfileDTO.providerUserId = socialProfile.providerUserId;
        socialProfileDTO.providerHandle = socialProfile.providerHandle;
        return socialProfileDTO;
    }

}