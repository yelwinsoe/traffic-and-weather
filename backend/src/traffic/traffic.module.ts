import { Module, OnModuleInit } from '@nestjs/common';
import { TrafficController } from './controllers/traffic/traffic.controller';
import { TrafficService } from './services/traffic/traffic.service';

@Module({
  controllers: [TrafficController],
  providers: [TrafficService],
})
export class TrafficModule implements OnModuleInit {
  constructor(private trafficService: TrafficService) {}
  async onModuleInit() {
    console.log('Getting geo data - reverse geocode started');
    await this.trafficService.fetchTrafficCamLocation(
      new Date().toISOString().split('.')[0],
    );
    console.log('Getting geo data - reverse geocode done');
  }
}
