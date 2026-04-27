import { Provider } from "./socialProfile.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';
import { ActorType } from "./socialProfile.entity";

export class SocialProfileDTO {
    id: string
    createdAt: Date
    updatedAt: Date
    actorType: ActorType
    actorId: string
    provider: Provider
    url: string
    providerUserId: string
    providerHandle: string
}

export class PostSocialProfileRequestDTO {
    @ApiProperty({
        description: 'The ID of the candidate',
        enum: ActorType,
        enumName: "ActorType"
    })
    @IsNotEmpty()
    actorType: ActorType;

    @ApiProperty({
        description: 'The ID of the candidate',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    actorId: string;

    @ApiProperty({
        description: 'provider of the social profile, e.g. LinkedIn, GitHub, etc.',
        enum: Provider,
        enumName: 'Provider',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    provider: Provider

    @ApiProperty({
        description: 'The handle of the social profile',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    providerHandle: string

    @ApiPropertyOptional({
        description: 'The URL of the social profile',
    })
    @IsString()
    @IsOptional()
    @MaxLength(255)
    url!: string

    @ApiPropertyOptional({
        description: 'The user ID of the provider',
    })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    providerUserId!: string


}

export class GetSocialProfilesRequestDTO {
    @ApiPropertyOptional({
        description: 'The ID of the candidate',
    })
    @IsString()
    @IsOptional()
    @MaxLength(36)
    candidateId!: string

    @ApiPropertyOptional({
        description: 'The provider of the social profile',
        enum: Provider,
        enumName: 'Provider',
    })
    @IsString()
    @IsOptional()
    @MaxLength(36)
    provider!: Provider

    @ApiPropertyOptional({
        description: 'The handle of the social profile',
    })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    providerHandle!: string
}