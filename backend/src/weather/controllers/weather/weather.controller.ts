import { Controller, Get, ParseFloatPipe, Query } from '@nestjs/common';
import { WeatherService } from 'src/weather/services/weather/weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}
  @Get()
  async getWeather(
    @Query('dateTime') dateTime: string,
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('long', ParseFloatPipe) long: number,
  ) {
    const filterDateTime = dateTime
      ? dateTime + ':00'
      : new Date().toISOString().split('.')[0];
    const allWeather = await this.weatherService.fetchWeather(filterDateTime);
    const forecast = await this.weatherService.findNearestLocation(
      allWeather,
      lat,
      long,
    );
    return {
      forecast: forecast,
      update_timestamp: allWeather.items[0].update_timestamp,
      valid_period: allWeather.items[0].valid_period,
    };
  }
}
