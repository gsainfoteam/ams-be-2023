import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';
import { Answer } from 'src/answer/answer.entity';
import { Response } from 'src/response/response.entity';
import { Block } from '../../../block/entity/block.entity';
import { BlockOption } from '../../../block-option/entity/block-option.entity';
import { Project } from 'src/project/project.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class MySQLConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      username: this.configService.get<string>('MYSQL_DATABASE_USER'),
      password: this.configService.get<string>('MYSQL_DATABASE_PASSWORD'),
      port: this.configService.get<number>('MYSQL_DATABASE_PORT'),
      host: this.configService.get<string>('MYSQL_DATABASE_HOST'),
      database: this.configService.get<string>('MYSQL_DATABASE_NAME'),
      entities: [Block, BlockOption, Project, User, Answer, Response],
      synchronize: true,
    };
  }
}
