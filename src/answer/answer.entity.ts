import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Response } from '../response/response.entity';
@Entity()
export class Answer {
    @PrimaryGeneratedColumn('uuid')
    answer_uuid: string;

    @Column('json')
    answer_data: object;

    @Column()
    block_uuid: string;

    @Column()
    response_uuid: string;

    @OneToOne(() => Response, (response) => response.answer, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'response_uuid' })
    response: Response;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
