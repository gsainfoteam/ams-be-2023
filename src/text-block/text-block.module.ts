import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextBlockService } from './text-block.service';
import { TextBlock } from './text-block.entity'; // TextBlock 엔터티를 임포트합니다.
import { TextBlockController } from './text-block.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TextBlock])], 
  providers: [TextBlockService],
  exports: [TextBlockService],
  controllers: [TextBlockController]
})
export class TextBlockModule {}