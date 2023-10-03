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

    @OneToOne(() => Response, (response) => response.answer, { cascade: true })
    @JoinColumn({ name: 'response_uuid' })
    response: Response;

    @CreateDateColumn()
    created_at: Date;

    @Column({ type: 'timestamp', default: null, nullable: true })
    deleted_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
