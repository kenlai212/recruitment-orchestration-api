import { Module } from "@nestjs/common";
import { CertificationsController } from "./certifications.controller";

@Module({
    controllers: [
        CertificationsController
    ]
})
export class CertificationsModule { }