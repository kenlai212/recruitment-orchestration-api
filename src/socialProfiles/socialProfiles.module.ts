import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { SocialProfile } from "./socialProfile.entity";
import { SocialProfilesController } from "./socialProfiles.controller";
import { SocialProfilesService } from "./socialProfiles.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([SocialProfile]),
    ],
    controllers: [
        SocialProfilesController
    ],
    providers: [
        SocialProfilesService
    ]
})
export class SocialProfilesModule { }