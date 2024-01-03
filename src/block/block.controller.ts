import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BlockService } from './block.service';
import { CreateBlockDto, UpdateBlockDto } from './dto/block.dto';
import { Block } from './entity/block.entity';

@Controller('v1/block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  async createBlock(@Body() createBlockDto: CreateBlockDto): Promise<Block> {
    return await this.blockService.createBlock(createBlockDto);
  }

  @Get(':block_uuid')
  async findBlockWithOption(
    @Param('block_uuid') blockUuid: string,
  ): Promise<Block | null> {
    return await this.blockService.findBlockWithBlockOption(blockUuid);
  }

  @Patch(':block_uuid')
  async updateBlock(
    @Param('block_uuid') blockUuid: string,
    @Body() updateBlockDto: UpdateBlockDto,
  ): Promise<Block | null> {
    return await this.blockService.updateBlockData(blockUuid, updateBlockDto);
  }

  @Delete(':block_uuid')
  async deleteBlock(@Param('block_uuid') blockUuid: string) {
    await this.blockService.deleteBlock(blockUuid);
    return { message: 'OK' };
  }
}
