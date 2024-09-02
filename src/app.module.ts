import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import { Events } from './events/events.model'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: process.env.DIALECT as any || 'mysql',
      host: process.env.HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.USERNAME,
      password: process.env.PASSWORD || 'default_password',
      database: process.env.DATABASE || 'default_database',
      models: [Events],
    }),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
