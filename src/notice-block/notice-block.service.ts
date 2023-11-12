import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticeBlock } from './notice-block.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeBlockService {
    constructor(
      @InjectRepository(NoticeBlock)
      private noticeBlockRepository: Repository<NoticeBlock>,
    ) {}

    async createAndReturnUUID(): Promise<string> {
        const noticeBlock = new NoticeBlock();
        const savedBlock = await this.noticeBlockRepository.save(noticeBlock);
        return savedBlock.notice_uuid;
    }

    async findOne(uuid: string): Promise<NoticeBlock> {
        const noticeBlock = await this.noticeBlockRepository.findOne({where : {notice_uuid : uuid}});
        if (!noticeBlock) {
            throw new NotFoundException(`NoticeBlock with UUID ${uuid} not found`);
        }
        return noticeBlock;
    }    

    async update(uuid: string, data: Partial<NoticeBlock>): Promise<NoticeBlock> {
        const existingBlock = await this.noticeBlockRepository.findOne({where : {notice_uuid : uuid}});
        if (!existingBlock) {
            throw new NotFoundException(`NoticeBlock with UUID ${uuid} not found`);
        }
        const updatedBlock = Object.assign(existingBlock, data);
        return await this.noticeBlockRepository.save(updatedBlock);
    }

    async remove(uuid: string): Promise<void> {
        await this.noticeBlockRepository.delete(uuid);
    }
}