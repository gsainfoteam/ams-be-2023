import { Injectable } from '@nestjs/common';
import { BlockRepository } from './block.repository';
import { CreateBlockDto, UpdateBlockDto } from './dto/block.dto';
import { DataSource, EntityManager } from 'typeorm';
import { Block } from './entity/block.entity';

@Injectable()
export class BlockService {
  constructor(
    private readonly blockRepository: BlockRepository,
    private dataSource: DataSource,
  ) {}
  async createBlock(createBlockDto: CreateBlockDto): Promise<Block> {
    return await this.dataSource.transaction(
      async (entityManager: EntityManager) => {
        return await this.blockRepository.createBlock(
          entityManager,
          createBlockDto,
        );
      },
    );
  }

  async findBlockWithBlockOption(blockUuid: string): Promise<Block | null> {
    return await this.dataSource.transaction(
      async (entityManager: EntityManager) => {
        return await this.blockRepository.findBlockWithBlockOption(
          entityManager,
          blockUuid,
        );
      },
    );
  }

  async updateBlockData(
    blockUuid: string,
    updateBlockDto: UpdateBlockDto,
  ): Promise<Block | null> {
    return await this.dataSource.transaction(
      async (entityManager: EntityManager) => {
        return await this.blockRepository.updateBlockData(
          entityManager,
          blockUuid,
          updateBlockDto,
        );
      },
    );
  }

  async deleteBlock(blockUuid: string): Promise<void> {
    await this.dataSource.transaction(async (entityManager: EntityManager) => {
      await this.blockRepository.deleteBlock(entityManager, blockUuid);
    });
  }
}
