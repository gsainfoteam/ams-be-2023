import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLConfigModule } from './global/config/database/database.module';
import { MySQLConfigService } from './global/config/database/database.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

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
    UserModule,
  ],
})
export class AppModule {}
