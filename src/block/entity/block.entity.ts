import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BlockOption } from '../../block-option/entity/block-option.entity';
import { BlockType } from '../type/block.enum';

@Entity()
export class Block {
  @PrimaryGeneratedColumn('uuid')
  block_uuid: string;

  @Column()
  block_type: BlockType;

  @Column()
  block_data: string;

  @Column({ default: false })
  mandatory: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @OneToOne(() => BlockOption, (blockOption) => blockOption.block, {
    cascade: true,
  })
  block_option: BlockOption;
}
