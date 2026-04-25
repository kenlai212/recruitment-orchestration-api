import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Certification } from "./certification.entity";

@Injectable()
export class CertificationService {
    private readonly logger = new Logger('CertificationService');

    constructor(
        @InjectRepository(Certification)
        private readonly certificationRepository: Repository<Certification>,
    ) { }

}