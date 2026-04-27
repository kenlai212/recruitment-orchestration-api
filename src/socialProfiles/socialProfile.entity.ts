import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum ActorType {
    AGENT = 'AGENT',
    CANDIDATE = 'CANDIDATE'
}

export enum Provider {
    INSTAGRAM = 'Instagram',
    LINKEDIN = 'LinkedIn',
    GITHUB = 'GitHub',
    FACEBOOK = 'Facebook',
    TWITTER = 'Twitter',
    LINE = 'Line',
}

@Entity()
export class SocialProfile {
    @PrimaryGeneratedColumn('uuid')
    socialProfileId: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @Column({
        nullable: false,
        type: "enum",
        enum: ActorType
    })
    actorType: ActorType

    @Column({
        nullable: false,
        type: "varchar",
        length: 36
    })
    actorId: string

    @Column({
        nullable: false,
        type: "enum",
        enum: Provider
    })
    provider: Provider

    @Column({
        nullable: true,
        type: "varchar",
        length: 255,
    })
    url!: string

    @Column({
        nullable: true,
        type: "varchar",
        length: 255,
    })
    providerUserId!: string

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    providerHandle: string
}