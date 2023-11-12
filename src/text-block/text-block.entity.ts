import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('text_block')
export class TextBlock {
    @PrimaryGeneratedColumn('uuid')
    text_uuid: string;

    @Column({ default: '' })
    text: string;   
}