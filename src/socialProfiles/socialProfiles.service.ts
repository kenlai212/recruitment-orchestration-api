import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { SocialProfile } from "./socialProfile.entity";
import { InjectRepository } from "@nestjs/typeorm/dist/common/typeorm.decorators";
import { Repository } from "typeorm/browser/repository/Repository.js";
import { SocialProfileDTO } from "./socialProfiles.dtos";

@Injectable()
export class SocialProfilesService {
    private readonly logger = new Logger('SocialProfilesService');

    constructor(
        @InjectRepository(SocialProfile)
        private readonly socialProfileRepository: Repository<SocialProfile>,
    ) { }

    async createSocialProfile(provider: string, url: string, providerUserId: string, providerHandle: string): Promise<SocialProfileDTO> {
        let socialProfile = new SocialProfile();
        socialProfile.provider = provider;
        socialProfile.url = url;
        socialProfile.providerUserId = providerUserId;
        socialProfile.providerHandle = providerHandle;

        await this.socialProfileRepository.save(socialProfile)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createSocialProfile() not available");
            });

        return this.socialProfileEntityToDTO(socialProfile);
    }

    async findCandidate(candidateId: string): Promise<Array<SocialProfileDTO>> {
        const socialProfiles = await this.socialProfileRepository.find({ where: { candidateId } });
        return socialProfiles.map((sp) => this.socialProfileEntityToDTO(sp));
    }

    async updateCandidate(socialProfileId: string, provider?: string, url?: string, providerUserId?: string, providerHandle?: string): Promise<SocialProfileDTO> {
        let socialProfile = await this.socialProfileRepository.findOne({ where: { socialProfileId } });
        if (!socialProfile) {
            throw new BadRequestException("Social profile not found");
        }


        if (!provider && !url && !providerUserId && !providerHandle) {
            throw new BadRequestException("At least one field must be provided for update");
        }

        if (provider) {
            socialProfile.provider = provider;
        }
        if (url) {
            socialProfile.url = url;
        }
        if (providerUserId) {
            socialProfile.providerUserId = providerUserId;
        }
        if (providerHandle) {
            socialProfile.providerHandle = providerHandle;
        }

        await this.socialProfileRepository.save(socialProfile)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("updateCandidate() not available");
            });

        return this.socialProfileEntityToDTO(socialProfile);
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