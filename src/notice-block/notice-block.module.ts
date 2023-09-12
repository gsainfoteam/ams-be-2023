import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeBlockService } from './notice-block.service';
import { NoticeBlock } from './notice-block.entity';
import { NoticeBlockController } from './notice-block.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeBlock])],
  providers: [NoticeBlockService],
  exports: [NoticeBlockService],
  controllers: [NoticeBlockController]
})
export class NoticeBlockModule {}
