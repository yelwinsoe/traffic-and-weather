import { Test, TestingModule } from '@nestjs/testing';
import { TrafficService } from './traffic.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('TrafficService', () => {
  let service: TrafficService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [TrafficService, ConfigService],
    }).compile();

    service = module.get<TrafficService>(TrafficService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('fetchTrafficImageLocation should be returning locations with camera', async () => {
    const dateTime: string = new Date().toISOString().split('.')[0];
    const locations = await service.fetchTrafficImageLocation(dateTime);
    expect(locations.length).toBeGreaterThan(0);
    expect(locations[0].timestamp).toBeDefined();
    expect(locations[0].image).toBeDefined();
  }, 60000); // Set a timeout of 1 minute because of reverse geocoding, this wouldn't be necessary in the future
});
