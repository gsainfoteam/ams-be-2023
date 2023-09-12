import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('question_short_block')
export class QuestionShortBlock {
    @PrimaryGeneratedColumn('uuid')
    short_question_uuid: string;

    @Column({ default: '' })
    short_question: string;

    @Column()
    limit: number;

    @Column('json')
    answer_id: string[];
}
