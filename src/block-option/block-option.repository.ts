import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateBlockOptionDto } from './dto/block-option.dto';
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
}
