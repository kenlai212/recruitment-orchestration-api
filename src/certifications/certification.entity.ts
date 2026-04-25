import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    name: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    licenseNumber: string;

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
}