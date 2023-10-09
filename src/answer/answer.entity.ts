import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Response } from '../response/response.entity';

@Entity()
export class Answer {
    @PrimaryGeneratedColumn('uuid')
    answer_uuid: string;

    @Column('json')
    answer_data: object;

    @Column()
    block_uuid: string;

    @ManyToOne(() => Response, (response) => response.answers, { onDelete: 'CASCADE' })
    response: Response;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

