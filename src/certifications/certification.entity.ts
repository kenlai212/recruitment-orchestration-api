import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum ActorType {
    AGENT = 'AGENT',
    CANDIDATE = 'CANDIDATE'
}

@Entity()
export class Certification {
    @PrimaryGeneratedColumn('uuid')
    certificationId: string;

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
    authority: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    certificateName: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    certificateNumber: string;

    @Column({
        nullable: true,
        type: "timestamp"
    })
    startDate!: Date;

    @Column({
        nullable: false,
        type: "timestamp"
    })
    endDate: Date;

    @Column({
        nullable: true,
        type: "varchar",
        length: 255
    })
    documentIdentifier!: string;
}