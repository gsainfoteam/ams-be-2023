import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationFormService } from './application-form.service';
import { ApplicationFormController } from './application-form.controller';
import { ApplicationForm } from './application-form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationForm])],
  exports: [ApplicationFormService],
  providers: [ApplicationFormService],
  controllers: [ApplicationFormController],
})
export class ApplicationFormModule {}