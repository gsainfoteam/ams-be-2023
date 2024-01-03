import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BlockOptionService } from './block-option.service';
import {
  CreateBlockOptionDto,
  UpdateBlockOptionDto,
} from './dto/block-option.dto';
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

  @Patch(':block_option_uuid')
  async updateBlockOption(
    @Param('block_option_uuid') blockOptionUuid: string,
    @Body() updateBlockOptionDto: UpdateBlockOptionDto,
  ): Promise<BlockOption | null> {
    return await this.blockOptionService.updateBlockOption(
      blockOptionUuid,
      updateBlockOptionDto,
    );
  }

  @Delete(':block_option_uuid')
  async deleteBlockOption(@Param('block_option_uuid') blockOptionUuid: string) {
    await this.blockOptionService.deleteBlockOption(blockOptionUuid);
    return { message: 'OK' };
  }
}
