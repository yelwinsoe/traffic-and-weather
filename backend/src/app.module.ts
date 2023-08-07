import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TrafficModule } from './traffic/traffic.module';
import { WeatherModule } from './weather/weather.module';

import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    TrafficModule,
    WeatherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
