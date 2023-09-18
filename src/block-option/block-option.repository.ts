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
  ): Promise<void> {
    const newBlockOption = new BlockOption();

    newBlockOption.option = createBlockOptionDto.option;
    newBlockOption.max = createBlockOptionDto.max;
    newBlockOption.min = createBlockOptionDto.min;
    newBlockOption.block = block;

    await transactionEntityManager.save(BlockOption, newBlockOption);
  }
}
