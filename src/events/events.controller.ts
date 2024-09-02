import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { EventsService } from './events.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateEventDto } from './dto/events.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService){}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async createEvents(@Body() eventData: CreateEventDto, @UploadedFiles() images: Array<Express.Multer.File>) {
    return await this.eventsService.createEvent(eventData, images);
  }

  @Get()
  async getAllEvents() {
    return await this.eventsService.getAllEvents();
  }

  @Get('/:id') 
  async getEvents(@Param('id') id: string,) {
    return await this.eventsService.getEvent(id);
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('images'))
  async updateEvent(@Param('id') id: string, @Body() eventData: CreateEventDto, @UploadedFiles() images: Array<Express.Multer.File>){

    return await this.eventsService.updateEvent(id, eventData, images);
  }

  @Delete('/:id')
  async deleteEvent(@Param('id') id: string){
    return await this.eventsService.deleteEvent(id)
  }
}
