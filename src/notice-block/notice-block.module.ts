import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeBlockService } from './notice-block.service';
import { NoticeBlock } from './notice-block.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeBlock])],
  providers: [NoticeBlockService],
  exports: [NoticeBlockService]
})
export class NoticeBlockModule {}
