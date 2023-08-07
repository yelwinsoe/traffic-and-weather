import { Module } from '@nestjs/common';
import { WeatherController } from './controllers/weather/weather.controller';
import { WeatherService } from './services/weather/weather.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
