import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CandidatesModule } from './candidates/candidates.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Candidate } from './candidates/candidate.entity';
import { SocialProfile } from './socialProfiles/socialProfile.entity';
import { SocialProfilesModule } from './socialProfiles/socialProfiles.module';
import { CertificationsModule } from './certifications/certifications.module';
import { Certification } from './certifications/certification.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Candidate,
        SocialProfile,
        Certification
      ],
      synchronize: true,
      logging: process.env.DB_LOGGING === 'true' ? ['error', 'warn', 'info', 'log'] : false,
    }),
    CandidatesModule,
    SocialProfilesModule,
    CertificationsModule
  ]
})
export class AppModule { }
