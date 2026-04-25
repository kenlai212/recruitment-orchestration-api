export class SocialProfileDTO {
    id: string
    createdAt: Date
    updatedAt: Date
    candidateId: string
    provider: string
    url: string
    providerUserId: string
    providerHandle: string
}

export class PostSocialProfileRequestDTO {
    provider: string
    url: string
    providerUserId: string
    providerHandle: string
}