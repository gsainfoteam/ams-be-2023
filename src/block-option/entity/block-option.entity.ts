import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Block } from '../../block/entity/block.entity';

@Entity()
export class BlockOption {
  @PrimaryGeneratedColumn('uuid')
  block_option_uuid: string;

  @Column({ type: 'json' })
  options: string[];

  @Column({ default: 1 })
  max: number;

  @Column({ default: 1 })
  min: number;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToOne(() => Block, (block) => block.block_uuid, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'block_uuid' })
  block: Block;
}
