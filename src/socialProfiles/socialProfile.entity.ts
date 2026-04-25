import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
        type: "varchar",
        length: 36
    })
    candidateId: string

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    provider: string

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