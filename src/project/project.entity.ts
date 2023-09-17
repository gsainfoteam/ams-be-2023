import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm';
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

    @Column()
    image_url: string;

    @Column({ type: 'int' })
    recruit_num: number;

    @Column({ type: 'boolean' })
    state: boolean;

    @Column({ type: 'json' })
    block_uuid: string[];

    @ManyToMany(() => User)
    @JoinTable({ name: 'project_admin_users' })
    admin_users: User[];
}