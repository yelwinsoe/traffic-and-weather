import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [WeatherService, ConfigService],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  // Test service/function existence
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Testing weather api return
  it('fetchWeather is working as expected', async () => {
    const dateTime: string = new Date().toISOString().split('.')[0];
    const weathers = await service.fetchWeather(dateTime);
    expect(weathers.area_metadata).toBeDefined();
    expect(weathers.items).toBeDefined();
    expect(weathers.api_info).toBeDefined();
  });

  // Testing weather forecast return based on Lat/Long
  it('findNearestLocation is working as expected (Using Bishan lat/long)', async () => {
    const dateTime: string = new Date().toISOString().split('.')[0];
    // Bishan lat/long
    const lat = 1.3526;
    const long = 103.8352;
    const weathers = await service.fetchWeather(dateTime);
    const weather = await service.findNearestLocation(weathers, lat, long);
    expect(weather.area).toBeDefined();
    expect(weather.area).toEqual('Bishan');
    expect(weather.forecast).toBeDefined();
  });
});
