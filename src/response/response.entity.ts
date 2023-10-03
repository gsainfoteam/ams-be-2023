import { Answer } from '../answer/answer.entity';
import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity()
export class Response {
    @PrimaryGeneratedColumn('uuid')
    response_uuid: string;

    @Column()
    user_uuid: string;

    @OneToOne(() => Answer, (answer) => answer.response)
    @JoinColumn({ name: 'answer_uuid' })
    answer: Answer;

    @CreateDateColumn()
    created_at: Date;
}
