import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Block } from './entity/block.entity';
import { CreateBlockDto } from './dto/block.dto';

@Injectable()
export class BlockRepository {
  async createBlock(
    transactionEntityManager: EntityManager,
    createBlockDto: CreateBlockDto,
  ): Promise<void> {
    const newBlock = new Block();

    newBlock.block_type = createBlockDto.block_type;
    newBlock.block_data = createBlockDto.block_data;

    await transactionEntityManager.save(Block, newBlock);
  }

  async findBlockByBlockUuid(
    transactionEntityManager: EntityManager,
    blockUuid: string,
  ): Promise<Block | null> {
    return await transactionEntityManager.findOne(Block, {
      where: { block_uuid: blockUuid },
    });
  }

  async findBlockWithBlockOption(
    transactionEntityManager: EntityManager,
    blockUuid: string,
  ): Promise<Block | null> {
    return await transactionEntityManager.findOne(Block, {
      where: { block_uuid: blockUuid },
      relations: ['block_option'],
    });
  }
}
