import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TextBlock } from './text-block.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TextBlockService {
    constructor(
      @InjectRepository(TextBlock)
      private textBlockRepository: Repository<TextBlock>,
    ) {}

    async createAndReturnUUID(): Promise<string> {
        const textBlock = new TextBlock();
        const savedBlock = await this.textBlockRepository.save(textBlock);
        return savedBlock.text_uuid;
    }

    async remove(uuid: string): Promise<void> {
        await this.textBlockRepository.delete(uuid);
    }
}
