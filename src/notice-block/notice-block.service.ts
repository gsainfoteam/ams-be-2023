import { Injectable } from '@nestjs/common';
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

    async remove(uuid: string): Promise<void> {
        await this.noticeBlockRepository.delete(uuid);
    }
}