import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('question_choice_block')
export class QuestionChoiceBlock {
    @PrimaryGeneratedColumn('uuid')
    choice_question_uuid: string;

    @Column({ default: '' })
    question: string;

    @Column('json')
    choice_case: string[];

    @Column('json')
    answer_id: string[];
}
