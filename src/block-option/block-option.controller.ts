import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
import { BlockOptionService } from './block-option.service';
import { CreateBlockOptionDto } from './dto/block-option.dto';
import { BlockOption } from './entity/block-option.entity';

@Controller('v1/block/option')
export class BlockOptionController {
  constructor(private readonly blockOptionService: BlockOptionService) {}

  @Post()
  async createBlockOption(
    @Query('block_uuid') blockUuid: string,
    @Body() createBlockOptionDto: CreateBlockOptionDto,
  ): Promise<BlockOption> {
    return await this.blockOptionService.createBlockOption(
      blockUuid,
      createBlockOptionDto,
    );
  }

  @Delete()
  async deleteBlockOption(
    @Query('block_option_uuid') blockOptionUuid: string,
  ): Promise<void> {
    await this.blockOptionService.deleteBlockOption(blockOptionUuid);
  }
}
