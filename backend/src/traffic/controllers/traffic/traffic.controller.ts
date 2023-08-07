import { Controller, Get, Query } from '@nestjs/common';
import { TrafficService } from '../../services/traffic/traffic.service';

@Controller('traffic')
export class TrafficController {
  constructor(private trafficService: TrafficService) {}
  @Get('/')
  getLocation(@Query('dateTime') dateTime: string) {
    const filterDateTime = dateTime
      ? dateTime + ':00'
      : new Date().toISOString().split('.')[0];
    return this.trafficService.fetchTrafficImageLocation(filterDateTime);
  }
}
