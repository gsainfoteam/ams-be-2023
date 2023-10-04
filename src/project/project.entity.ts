import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from '../user/user.entity';


@Entity('project')
export class Project {
    @PrimaryGeneratedColumn('uuid')
    project_uuid: string;

    @Column()
    title: string;

    @Column({ type: 'date' })
    start_date: Date;

    @Column({ type: 'date' })
    end_date: Date;

    @Column({ nullable: true })
    image_url?: string;

    @Column({ type: 'int', nullable: true })
    recruit_maximum?: number;

    @Column({ type: 'json' })
    block_uuid: string[];

    @ManyToMany(() => User)
    @JoinTable({ name: 'project_admin_users' })
    admin_users: User[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}