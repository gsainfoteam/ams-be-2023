import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BlockOptionRepository } from './block-option.repository';
import { CreateBlockDto } from '../block/dto/block.dto';
import { DataSource, EntityManager } from 'typeorm';
import { CreateBlockOptionDto } from './dto/block-option.dto';
import { BlockRepository } from '../block/block.repository';
import { BlockOption } from './entity/block-option.entity';

@Injectable()
export class BlockOptionService {
  constructor(
    private readonly blockOptionRepository: BlockOptionRepository,
    private readonly blockRepository: BlockRepository,
    private dataSource: DataSource,
  ) {}

  async createBlockOption(
    blockUuid: string,
    createBlockOptionDto: CreateBlockOptionDto,
  ): Promise<BlockOption> {
    return await this.dataSource.transaction(
      async (entityManager: EntityManager) => {
        const block = await this.blockRepository.findBlockByBlockUuid(
          entityManager,
          blockUuid,
        );

        if (!block) {
          throw new HttpException(
            'Block does not exist',
            HttpStatus.BAD_REQUEST,
          );
        }

        return await this.blockOptionRepository.createBlockOptions(
          entityManager,
          block,
          createBlockOptionDto,
        );
      },
    );
  }
}
