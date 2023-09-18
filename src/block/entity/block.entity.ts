import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlockOption } from '../../block-option/entity/block-option.entity';

@Entity()
export class Block {
  @PrimaryGeneratedColumn('uuid')
  block_uuid: string;

  @Column()
  block_type: string;

  @Column()
  block_data: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;

  @OneToOne(() => BlockOption, (blockOption) => blockOption.block, {
    cascade: true,
  })
  block_option: BlockOption;
}
