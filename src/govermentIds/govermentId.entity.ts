import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
        type: "varchar",
        length: 36
    })
    candidateId: string;

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