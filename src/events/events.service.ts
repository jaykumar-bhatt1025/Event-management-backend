import { HttpException, Injectable } from '@nestjs/common';
import { Repository, Sequelize } from 'sequelize-typescript';
import { Events } from './events.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEventDto } from './dto/events.dto';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EventsService {
  constructor(private sequelize: Sequelize, 
    @InjectModel(Events)
    private eventsModel: typeof Events,
  ) {}

  saveImages(images: any[]){
    const uploadPath = './uploads'; // Specify your upload directory

    const paths = [];

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    for(let image of images) {
      const uniqueName = `${uuidv4()}${path.extname(image.originalname)}`;
      const filePath = path.join(uploadPath, uniqueName);
      fs.writeFileSync(filePath, image.buffer)
      paths.push(filePath);
    }

    return paths;
  }

  async createEvent(eventData: CreateEventDto, images: any[]): Promise<any>{
    try {
      // Save images
      const paths: string[] = this.saveImages(images);

      // Add paths
      eventData.images = [...paths]

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
      const getAllEvents = await this.eventsModel.findAndCountAll({ where: { deletedAt: null } });
      
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

  async updateEvent(id: string, eventData:CreateEventDto, images: any[]): Promise<any> {
    try {
      
      // Save images
      const paths: string[] = this.saveImages(images);

      // Add paths
      eventData.images = [...paths]

      await this.eventsModel.update(eventData, { where: { id, deletedAt: null } });
      const getEvent = this.eventsModel.findOne({ where: { id , deletedAt: null} });
      return getEvent;
    } catch(error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : 500
    );
    }
  }

  async deleteEvent(id: string) : Promise<any> {
    await this.eventsModel.update({ deletedAt: new Date() }, { where: { id } })
  }

}
