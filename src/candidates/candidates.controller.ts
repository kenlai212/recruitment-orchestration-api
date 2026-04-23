import { Body, Controller, Logger, Post } from "@nestjs/common";
import { CandidateDTO, NewCandidateRequestDTO } from "./candidates.dto";

@Controller()
export class CandidatesController {
    logger = new Logger('CandidatesController');

    @Post("/candidate")
    async newCandidate(@Body() requestBody: NewCandidateRequestDTO): Promise<CandidateDTO> {
        return new CandidateDTO(requestBody.name);
        //return await this.candidatesService.createCandidate(requestBody);
    }
}