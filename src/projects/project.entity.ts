import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  project_uuid: string;

  @Column()
  title: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  image_url: string;

  @Column()
  recruit_num: number;

  @Column()
  state: boolean;

  @Column({ nullable: true })
  application_uuid: string;

  @Column('text', { nullable: true })
  admin_uuid: string;
}