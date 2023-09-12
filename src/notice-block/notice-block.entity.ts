import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('notice_block')
export class NoticeBlock {
    @PrimaryGeneratedColumn('uuid')
    notice_uuid: string;

    @Column({ default: '' })
    notice: string;
}
