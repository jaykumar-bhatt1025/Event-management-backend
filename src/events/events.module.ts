import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Events } from './events.model';

@Module({
  imports: [SequelizeModule.forFeature([Events])],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
