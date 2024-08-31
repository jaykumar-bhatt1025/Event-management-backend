import { HttpException, Injectable } from '@nestjs/common';
import { Repository, Sequelize } from 'sequelize-typescript';
import { Events } from './events.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEventDto } from './dto/events.dto';

@Injectable()
export class EventsService {
  constructor(private sequelize: Sequelize, 
    @InjectModel(Events)
    private eventsModel: typeof Events,
  ) {}

  async createEvent(eventData: CreateEventDto): Promise<any>{
    try {
      const createdEvents = await this.eventsModel.create(eventData);

      return createdEvents;
    } catch(error){
      throw new HttpException(
        error.message,
        error.status ? error.status : 500
    );
    }
  }

  async getAllEvents(): Promise<any> {
    try{
      const getAllEvents  = await this.eventsModel.findAndCountAll({ where: {deletedAt: null} });
      
      return getAllEvents;
    } catch(error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : 500
    );
    }
  }

  async getEvent(id: string): Promise<any> {
    try{
      const getEvent  = await this.eventsModel.findOne({
        where: {
          id, deletedAt: null
        }
      });
      
      return getEvent;
    } catch(error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : 500
    );
    }
  }

  async updateEvent(id: string, eventData:CreateEventDto): Promise<any> {
    try{
      await this.eventsModel.update(eventData, { where: {id, deletedAt: null } });
      const getEvent = this.eventsModel.findOne({ where: {id , deletedAt: null} });
      return getEvent;
    } catch(error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : 500
    );
    }
  }

  async deleteEvent(id: string) : Promise<any> {
    await this.eventsModel.update({deletedAt: new Date()}, {where: { id }})
  }

}
