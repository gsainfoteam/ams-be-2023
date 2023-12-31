import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Block } from './entity/block.entity';
import { CreateBlockDto, UpdateBlockDto } from './dto/block.dto';

@Injectable()
export class BlockRepository {
  async createBlock(
    transactionEntityManager: EntityManager,
    createBlockDto: CreateBlockDto,
  ): Promise<Block> {
    const newBlock = new Block();

    newBlock.block_type = createBlockDto.block_type;
    newBlock.block_data = createBlockDto.block_data;

    return await transactionEntityManager.save(Block, newBlock);
  }

  async updateBlockData(
    transactionEntityManager: EntityManager,
    blockUuid: string,
    updateBlockDto: UpdateBlockDto,
  ): Promise<Block | null> {
    await transactionEntityManager.update(
      Block,
      { block_uuid: blockUuid },
      {
        block_data: updateBlockDto.block_data,
        mandatory: updateBlockDto.mandatory,
      },
    );

    return await this.findBlockByBlockUuid(transactionEntityManager, blockUuid);
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

  async deleteBlock(
    transactionEntityManager: EntityManager,
    blockUuid: string,
  ): Promise<void> {
    const blockWithBlockOptions = await this.findBlockWithBlockOption(
      transactionEntityManager,
      blockUuid,
    );
    await transactionEntityManager.softRemove(blockWithBlockOptions);
  }
}
