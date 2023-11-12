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
            for (const [blockType, blockUuid] of applicationForm.block_id) {
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

    async findDetailedOne(uuid: string): Promise<any> {
        const applicationForm = await this.findOne(uuid);
        if (!applicationForm) {
            throw new NotFoundException(`ApplicationForm with UUID ${uuid} not found`);
        }
    
        const detailedBlocks = [];
    
        for (const [blockType, blockUuid] of applicationForm.block_id) {
            let blockDetail;
            switch (blockType) {
                case 'text_block':
                    blockDetail = await this.textBlockService.findOne(blockUuid);
                    break;
                case 'notice_block':
                    blockDetail = await this.noticeBlockService.findOne(blockUuid);
                    break;
                case 'question_choice_block':
                    blockDetail = await this.questionChoiceBlockService.findOne(blockUuid);
                    break;
                case 'question_short_block':
                    blockDetail = await this.questionShortBlockService.findOne(blockUuid);
                    break;
                case 'question_long_block':
                    blockDetail = await this.questionLongBlockService.findOne(blockUuid);
                    break;
            }
            detailedBlocks.push({
                blockType,
                blockDetail
            });
        }
    
        return {
            applicationForm,
            blocks: detailedBlocks
        };
    }
    
}
