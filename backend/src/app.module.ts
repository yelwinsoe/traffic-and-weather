import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TrafficModule } from './traffic/traffic.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [ConfigModule.forRoot(), TrafficModule, WeatherModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
