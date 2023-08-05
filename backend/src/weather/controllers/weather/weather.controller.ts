import { Controller, Get } from '@nestjs/common';

@Controller('weather')
export class WeatherController {
  @Get()
  getWeather() {
    return { weather: 'good' };
  }
}
