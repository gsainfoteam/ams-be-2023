import { Answer } from '../answer/answer.entity';
import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Response {
    @PrimaryGeneratedColumn('uuid')
    response_uuid: string;

    @Column()
    user_uuid: string;

    @OneToOne(() => Answer, (answer) => answer.response)
    answer: Answer;

    @CreateDateColumn()
    created_at: Date;
}
