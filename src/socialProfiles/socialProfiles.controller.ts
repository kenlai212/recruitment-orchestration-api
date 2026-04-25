import { Body, Controller, Get, Logger, Param, Post, Query } from "@nestjs/common";
import { PostSocialProfileRequestDTO, SocialProfileDTO } from "./socialProfiles.dtos";
import { SocialProfilesService } from "./socialProfiles.service";

@Controller('social-profiles')
export class SocialProfilesController {
    logger = new Logger('SocialProfilesController');

    constructor(
        private readonly socialProfilesService: SocialProfilesService,
    ) { }

    /*@Get("/social-profile/:candidateId")
    async getCandidateById(@Param() param: GetCandidateRequestDTO): Promise<SocialProfileDTO> {
        return await this.socialProfilesService.findCandidate(param.candidateId, param.);
    }*/

    @Post("/social-profile")
    async newCandidate(@Body() requestBody: PostSocialProfileRequestDTO): Promise<SocialProfileDTO> {
        return await this.socialProfilesService.createSocialProfile(
            requestBody.provider,
            requestBody.url,
            requestBody.providerUserId,
            requestBody.providerHandle
        );
    }

    /*@Put("/social-profile")
    async updateCandidate(@Body() requestBody: UpdateCandidateRequestDTO): Promise<CandidateDTO> {
        return await this.candidatesService.updateCandidate(requestBody.candidateId, requestBody.fullName, requestBody.emailAddress, requestBody.phoneNumber);
    }*/
}