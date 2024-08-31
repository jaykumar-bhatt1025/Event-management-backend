import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseInterceptors } from '@nestjs/common';
import { EventsService } from './events.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEventDto } from './dto/events.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService){}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createEvents(@Body() eventData: CreateEventDto) {
    return await this.eventsService.createEvent(eventData);
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
  @UseInterceptors(FileInterceptor('file'))
  async updateEvent(@Param('id') id: string, @Body() eventData: CreateEventDto){
    return await this.eventsService.updateEvent(id, eventData)
  }

  @Delete('/:id')
  async deleteEvent(@Param('id') id: string){
    return await this.eventsService.deleteEvent(id)
  }
}
