import { Injectable, NotFoundException } from '@nestjs/common';
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

    async update(uuid: string, data: Partial<TextBlock>): Promise<TextBlock> {
        const existingBlock = await this.textBlockRepository.findOne({where : {text_uuid : uuid}});
        if (!existingBlock) {
            throw new NotFoundException(`TextBlock with UUID ${uuid} not found`);
        }
        const updatedBlock = Object.assign(existingBlock, data);
        return await this.textBlockRepository.save(updatedBlock);
    }

    async remove(uuid: string): Promise<void> {
        await this.textBlockRepository.delete(uuid);
    }
}
