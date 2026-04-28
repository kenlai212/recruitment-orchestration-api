import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum EngagementType {
    ONE_MEET = 'ONE_MEET',
    GROUP_MEET = 'GROUP_MEET',
    TRAINING = 'TRAINING'
}

@Entity()
export class Engagement {
    @PrimaryGeneratedColumn('uuid')
    engagementId: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @Column({
        nullable: false,
        type: "varchar",
        length: 36
    })
    recruitmentCaseId: string

    @Column({
        nullable: false,
        type: "enum",
        enum: EngagementType
    })
    engagementType: EngagementType
}