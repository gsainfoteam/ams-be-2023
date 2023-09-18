import { Body, Controller, Post, Query } from '@nestjs/common';
import { BlockOptionService } from './block-option.service';
import { CreateBlockOptionDto } from './dto/block-option.dto';

@Controller('v1/block/option')
export class BlockOptionController {
  constructor(private readonly blockOptionService: BlockOptionService) {}

  @Post()
  async createBlockOption(
    @Query('block_uuid') blockUuid: string,
    @Body() createBlockOptionDto: CreateBlockOptionDto,
  ): Promise<any> {
    await this.blockOptionService.createBlockOption(
      blockUuid,
      createBlockOptionDto,
    );
    return { message: 'created successfully' };
  }
}
