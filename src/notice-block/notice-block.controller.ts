import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NoticeBlockService } from './notice-block.service';
import { NoticeBlock } from './notice-block.entity';

@Controller('notice-block')
export class NoticeBlockController {
    constructor(private readonly service: NoticeBlockService) {}

    @Put(':uuid')
    update(@Param('uuid') uuid: string, @Body() data: Partial<NoticeBlock>): Promise<NoticeBlock> {
        return this.service.update(uuid, data);
    }
}
