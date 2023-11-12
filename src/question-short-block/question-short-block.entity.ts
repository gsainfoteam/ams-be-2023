import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

@Entity('question_short_block')
export class QuestionShortBlock {
    @PrimaryGeneratedColumn('uuid')
    short_question_uuid: string;

    @Column({ default: '' })
    short_question: string;

    @Column({ default: 0 })
    limit: number;

    @Column('json', { nullable: true })
    answer_id: string[];

    @BeforeInsert()
    setDefaultAnswerId() {
        if (!this.answer_id) {
            this.answer_id = [];
        }
    }
}