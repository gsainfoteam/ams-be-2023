import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

export enum AnswerType {
    CHOICE = 'choice',
    SHORT = 'short',
    LONG = 'long'
}

@Entity('answer')
export class Answer {
    @PrimaryGeneratedColumn('uuid')
    answer_uuid: string;

    @Column()
    answer: string;

    @Column({ type: 'enum', enum: AnswerType })
    answer_type: string;

    @Column()
    temporary_user: string;
}
