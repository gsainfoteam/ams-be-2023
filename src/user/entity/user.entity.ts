import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  userUuid: string;

  @Column()
  userName: string;

  @Column()
  userPhoneNumber: string;

  @Column()
  studentNumber: string;

  @Column()
  userEmailId: string;

  @CreateDateColumn()
  createdAt: Date;
}
