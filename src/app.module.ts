import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import {Events} from './events/events.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: process.env.DIALECT as any,
        host: process.env.HOST ||'127.0.0.1',
        port: process.env.DB_PORT|| 3306 as any,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    }),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
