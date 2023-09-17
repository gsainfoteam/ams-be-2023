import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  user_uuid: string;

  @Column()
  user_name: string;

  @Column()
  user_phone_number: string;

  @Column()
  student_number: string;

  @Column()
  user_email_id: string;

  @CreateDateColumn()
  created_at: Date;
}
