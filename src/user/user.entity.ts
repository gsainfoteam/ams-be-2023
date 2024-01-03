import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Project } from '../project/project.entity';


@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_uuid: string;

  @Column()
  user_name: string;

  @ManyToMany(() => Project, project => project.admin_users)
  @JoinTable({ name: 'project_admin_users' })
  admin_projects: Project[];
}
