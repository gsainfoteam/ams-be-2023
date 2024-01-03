import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLConfigModule } from './global/config/database/database.module';
import { MySQLConfigService } from './global/config/database/database.service';
import { AnswerModule } from './answer/answer.module';
import { ResponseModule } from './response/response.module';
import { BlockModule } from './block/block.module';
import { BlockOptionController } from './block-option/block-option.controller';
import { BlockOptionService } from './block-option/block-option.service';
import { BlockOptionModule } from './block-option/block-option.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [MySQLConfigModule],
      useClass: MySQLConfigService,
      inject: [MySQLConfigService],
    }),
    AnswerModule,
    ResponseModule,
    BlockModule,
    BlockOptionModule,
    ProjectModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
