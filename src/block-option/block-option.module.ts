import { Module } from '@nestjs/common';
import { BlockOptionController } from './block-option.controller';
import { BlockOptionService } from './block-option.service';
import { BlockOptionRepository } from './block-option.repository';
import { BlockRepository } from '../block/block.repository';

@Module({
  controllers: [BlockOptionController],
  providers: [BlockOptionService, BlockOptionRepository, BlockRepository],
})
export class BlockOptionModule {}
