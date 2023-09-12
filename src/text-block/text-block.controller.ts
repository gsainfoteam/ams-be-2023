import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TextBlockService } from './text-block.service';
import { TextBlock } from './text-block.entity';

@Controller('text-block')
export class TextBlockController {
    constructor(private readonly service: TextBlockService) {}

    // text block 수정
    @Put(':uuid')
    update(@Param('uuid') uuid: string, @Body() data: Partial<TextBlock>): Promise<TextBlock> {
        return this.service.update(uuid, data);
    }
}
