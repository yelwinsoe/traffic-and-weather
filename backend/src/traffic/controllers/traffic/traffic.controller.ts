import { Controller, Get, Query } from '@nestjs/common';
import { TrafficService } from 'src/traffic/services/traffic/traffic.service';

@Controller('traffic')
export class TrafficController {
  constructor(private trafficService: TrafficService) {}
  @Get('/')
  getLocation(@Query('dateTime') dateTime: string) {
    const filterDateTime = dateTime
      ? dateTime + ':00'
      : new Date().toDateString().split('.')[0];
    console.log(filterDateTime);
    return this.trafficService.fetchTrafficCamLocation(filterDateTime);
  }
}
