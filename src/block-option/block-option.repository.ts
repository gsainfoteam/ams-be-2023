import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import {
  CreateBlockOptionDto,
  UpdateBlockOptionDto,
} from './dto/block-option.dto';
import { BlockOption } from './entity/block-option.entity';
import { Block } from '../block/entity/block.entity';

@Injectable()
export class BlockOptionRepository {
  async createBlockOptions(
    transactionEntityManager: EntityManager,
    block: Block,
    createBlockOptionDto: CreateBlockOptionDto,
  ): Promise<BlockOption> {
    const newBlockOption = new BlockOption();

    newBlockOption.options = createBlockOptionDto.options;
    newBlockOption.max = createBlockOptionDto.max;
    newBlockOption.min = createBlockOptionDto.min;
    newBlockOption.block = block;

    return await transactionEntityManager.save(BlockOption, newBlockOption);
  }

  async updateBlockOption(
    transactionEntityManager: EntityManager,
    blockOptionUuid: string,
    updateBlockOptionDto: UpdateBlockOptionDto,
  ): Promise<BlockOption | null> {
    await transactionEntityManager.update(
      BlockOption,
      {
        block_option_uuid: blockOptionUuid,
      },
      {
        options: updateBlockOptionDto.options,
        max: updateBlockOptionDto.max,
        min: updateBlockOptionDto.min,
      },
    );
    return await this.findBlockOptionByUuid(
      transactionEntityManager,
      blockOptionUuid,
    );
  }

  async findBlockOptionByUuid(
    transactionEntityManager: EntityManager,
    blockOptionUuid: string,
  ): Promise<BlockOption | null> {
    return await transactionEntityManager.findOne(BlockOption, {
      where: { block_option_uuid: blockOptionUuid },
    });
  }

  async deleteBlockOption(
    transactionEntityManager: EntityManager,
    blockOptionUuid: string,
  ): Promise<void> {
    await transactionEntityManager.softDelete(BlockOption, {
      block_option_uuid: blockOptionUuid,
    });
  }
}
