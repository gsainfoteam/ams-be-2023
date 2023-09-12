import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationForm } from './application-form.entity';
import { TextBlockService } from 'src/text-block/text-block.service';
import { NoticeBlockService } from 'src/notice-block/notice-block.service';
import { QuestionChoiceBlockService } from 'src/question-choice-block/question-choice-block.service';
import { QuestionShortBlockService } from 'src/question-short-block/question-short-block.service';
import { QuestionLongBlockService } from 'src/question-long-block/question-long-block.service';

@Injectable()
export class ApplicationFormService {
    constructor(
        @InjectRepository(ApplicationForm)
        private applicationFormRepository: Repository<ApplicationForm>,
        private readonly textBlockService: TextBlockService,
        private readonly noticeBlockService: NoticeBlockService,
        private readonly questionChoiceBlockService: QuestionChoiceBlockService,
        private readonly questionShortBlockService: QuestionShortBlockService,
        private readonly questionLongBlockService: QuestionLongBlockService
    ) {}

    async create(data: Partial<ApplicationForm>): Promise<ApplicationForm> {
        if (data.block_id) {
            data.block_id = JSON.stringify(data.block_id);
        }
        const applicationForm = this.applicationFormRepository.create(data);
        return await this.applicationFormRepository.save(applicationForm);
    }

    async findAll(): Promise<ApplicationForm[]> {
        return await this.applicationFormRepository.find();
    }

    async findOne(uuid: string): Promise<ApplicationForm> {
        const applicationForm = await this.applicationFormRepository.findOne({
            where: { application_uuid: uuid }
        });
        if (!applicationForm) {
            throw new NotFoundException(`ApplicationForm with UUID ${uuid} not found`);
        }
        if (applicationForm.block_id) {
            applicationForm.block_id = JSON.parse(applicationForm.block_id);
        }
        return applicationForm;
    }

    async update(uuid: string, data: Partial<ApplicationForm>): Promise<ApplicationForm> {
        if (data.block_id) {
            data.block_id = JSON.stringify(data.block_id);
        }
        const updateResult = await this.applicationFormRepository.update(uuid, data);
        if (updateResult.affected === 0) {
            throw new NotFoundException(`ApplicationForm with UUID ${uuid} not found`);
        }
        return this.findOne(uuid);
    }

    async remove(uuid: string): Promise<void> {
        const applicationForm = await this.findOne(uuid);

        if (applicationForm && applicationForm.block_id) {
            const blockIdArray: [string, string][] = JSON.parse(applicationForm.block_id);

            for (const [blockType, blockUuid] of blockIdArray) {
                switch (blockType) {
                    case 'text_block':
                        await this.textBlockService.remove(blockUuid);
                        break;
                    case 'notice_block':
                        await this.noticeBlockService.remove(blockUuid);
                        break;
                    case 'question_choice_block':
                        await this.questionChoiceBlockService.remove(blockUuid);
                        break;
                    case 'question_short_block':
                        await this.questionShortBlockService.remove(blockUuid);
                        break;
                    case 'question_long_block':
                        await this.questionLongBlockService.remove(blockUuid);
                        break;
                }
            }
        }

        const deleteResult = await this.applicationFormRepository.delete(uuid);
        if (deleteResult.affected === 0) {
            throw new NotFoundException(`ApplicationForm with UUID ${uuid} not found`);
        }
    }

    async createWithBlocks(uuid: string, blockNames: string[]): Promise<ApplicationForm> {
        const appForm = await this.findOne(uuid);
        if (!appForm) {
            throw new NotFoundException(`ApplicationForm with UUID ${uuid} not found`);
        }

        const blockIdArray = [];
        for (const blockName of blockNames) {
            let blockUuid;
            switch (blockName) {
                case 'text_block':
                    blockUuid = await this.textBlockService.createAndReturnUUID();
                    break;
                case 'notice_block':
                    blockUuid = await this.noticeBlockService.createAndReturnUUID();
                    break;
                case 'question_choice_block':
                    blockUuid = await this.questionChoiceBlockService.createAndReturnUUID();
                    break;
                case 'question_short_block':
                    blockUuid = await this.questionShortBlockService.createAndReturnUUID();
                    break;
                case 'question_long_block':
                    blockUuid = await this.questionLongBlockService.createAndReturnUUID();
                    break;
                default:
                    throw new BadRequestException(`Invalid block name: ${blockName}`);
            }
            blockIdArray.push([blockName, blockUuid]);
        }

        appForm.block_id = JSON.stringify(blockIdArray);
        return await this.applicationFormRepository.save(appForm);
    }
}
