import { Body, Controller, Logger, Post } from "@nestjs/common";
import { CandidateDTO, NewCandidateRequestDTO } from "./candidates.dto";
import { CandidateService } from "./candidates.service";

@Controller()
export class CandidatesController {
    logger = new Logger('CandidatesController');

    constructor(
        private readonly candidatesService: CandidateService,
    ) { }

    @Post("/candidate")
    async newCandidate(@Body() requestBody: NewCandidateRequestDTO): Promise<CandidateDTO> {
        return await this.candidatesService.createCandidate(requestBody.name);
    }
}