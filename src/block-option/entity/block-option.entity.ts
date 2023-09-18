import {
  Column,
  CreateDateColumn,
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
  option: string[];

  @Column()
  max: number;

  @Column()
  min: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => Block, (block) => block.block_uuid, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'block_uuid' })
  block: Block;
}
