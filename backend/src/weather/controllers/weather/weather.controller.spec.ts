import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from '../../../weather/services/weather/weather.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('WeatherController', () => {
  let controller: WeatherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [WeatherService, ConfigService],
      controllers: [WeatherController],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getWeather function should return proper data', async () => {
    const dateTime: string = new Date().toISOString().split('.')[0];
    // Bishan lat/long
    const lat = 1.3526;
    const long = 103.8352;
    const weather = await controller.getWeather(dateTime, lat, long);
    expect(weather.forecast).toBeDefined();
    expect(weather.update_timestamp).toBeDefined();
    expect(weather.forecast.area).toEqual('Bishan');
  });
});
