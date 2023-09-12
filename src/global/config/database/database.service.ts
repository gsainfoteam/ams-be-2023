import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';
import { ApplicationForm } from 'src/application-form/application-form.entity';
import { Project } from 'src/projects/project.entity';

@Injectable()
export class MySQLConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      //username: this.configService.get<string>('MYSQL_DATABASE_USER'),
      //password: this.configService.get<string>('MYSQL_DATABASE_PASSWORD'),
      //port: this.configService.get<number>('MYSQL_DATABASE_PORT'),
      //host: this.configService.get<string>('MYSQL_DATABASE_HOST'),
      //database: this.configService.get<string>('MYSQL_DATABASE_NAME'),
      username: 'root',
      password: 'kim00714',
      port: 3306,
      host: 'localhost',
      database: 'ams-test',
      entities: [Project,ApplicationForm],
      synchronize: true,
    };
  }
}
