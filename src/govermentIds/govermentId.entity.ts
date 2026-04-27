import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum ActorType {
    AGENT = 'AGENT',
    CANDIDATE = 'CANDIDATE'
}

@Entity()
export class GovernmentId {
    @PrimaryGeneratedColumn('uuid')
    resumeId: string;

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
        type: "varchar",
        length: 255
    })
    documentIdentifier: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 3
    })
    issuerCountryCode: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    idType: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    idNumber: string;
}