import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BlockService } from './block.service';
import { CreateBlockDto } from './dto/block.dto';
import { Block } from './entity/block.entity';

@Controller('v1/block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  async createBlock(@Body() createBlockDto: CreateBlockDto): Promise<any> {
    await this.blockService.createBlock(createBlockDto);
    return { message: 'created successfully' };
  }

  @Get()
  async findBlockWithOption(
    @Query('block_uuid') blockUuid: string,
  ): Promise<Block | null> {
    return await this.blockService.findBlockWithBlockOption(blockUuid);
  }
}
