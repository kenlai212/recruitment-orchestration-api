import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class RecruitmentCasesServiceHelper {
    constructor() { }

    async createNewCandidate(fullName: string, emailAddress?: string, phoneNumber?: string): Promise<string> {
        const candidateId = "P12345"
        return candidateId
    }

    async validateRecuriterId(recuriterId: string): Promise<void> {
        //todo: implement validate agent leder id
    }
}