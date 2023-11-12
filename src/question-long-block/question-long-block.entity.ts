import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('question_long_block')
export class QuestionLongBlock {
    @PrimaryGeneratedColumn('uuid')
    long_question_uuid: string;

    @Column({ default: '' })
    long_question: string;

    @Column({ default: 0 })
    limit: number;

    @Column('json')
    answer_id: string[];
}
