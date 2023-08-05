import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from 'src/weather/services/weather/weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}
  @Get()
  async getWeather(
    @Query('dateTime') dateTime: string,
    @Query('latLong') latLong: string,
  ) {
    const filterDateTime = dateTime
      ? dateTime + ':00'
      : new Date().toISOString().split('.')[0];
    const allWeather = await this.weatherService.fetchWeather(filterDateTime);
    return await this.weatherService.findNearestLocation(allWeather, latLong);
  }
}
