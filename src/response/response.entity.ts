import { Answer } from '../answer/answer.entity';
import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Response {
    @PrimaryGeneratedColumn('uuid')
    response_uuid: string;

    @Column()
    user_uuid: string;

    @Column()
    project_uuid: string;

    @OneToMany(() => Answer, (answer) => answer.response, { cascade: true })
    answers: Answer[];

    @CreateDateColumn()
    created_at: Date;
}

