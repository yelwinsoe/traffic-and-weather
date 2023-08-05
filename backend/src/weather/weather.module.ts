import { Module } from '@nestjs/common';
import { WeatherController } from './controllers/weather/weather.controller';

@Module({
  controllers: [WeatherController]
})
export class WeatherModule {}
