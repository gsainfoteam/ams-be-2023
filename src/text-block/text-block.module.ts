import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextBlockService } from './text-block.service';
import { TextBlock } from './text-block.entity'; // TextBlock 엔터티를 임포트합니다.

@Module({
  imports: [TypeOrmModule.forFeature([TextBlock])], 
  providers: [TextBlockService],
  exports: [TextBlockService]
})
export class TextBlockModule {}