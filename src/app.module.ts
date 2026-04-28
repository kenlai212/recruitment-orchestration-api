import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { RecruitmentCasesModule } from './recruitmentCases/recruitmentCases.module';
import { EngagementsModule } from './engagements/engagements.module';
import { RecruitmentCase } from './recruitmentCases/recruitmentCase.entity';
import { Engagement } from './engagements/engagement.entity';

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
        RecruitmentCase,
        Engagement
      ],
      synchronize: true,
      logging: process.env.DB_LOGGING === 'true' ? ['error', 'warn', 'info', 'log'] : false,
    }),
    RecruitmentCasesModule,
    EngagementsModule,
  ]
})
export class AppModule { }
