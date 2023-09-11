import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('application_form')
export class ApplicationForm {
    @PrimaryGeneratedColumn('uuid')
    application_uuid: string;

    @Column('text', { array: true })
    block_id: string[];
}