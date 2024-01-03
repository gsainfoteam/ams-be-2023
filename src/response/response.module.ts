import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseRepository } from './response.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ResponseRepository])],
  controllers: [],
  providers: [ResponseRepository],
  exports: [ResponseRepository], 
})
export class ResponseModule {}

