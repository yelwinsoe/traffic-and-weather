import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface AreaProps {
  name: string;
  label_location: {
    latitude: number;
    longitude: number;
  };
}

interface ForeCastProps {
  forecasts: {
    area: string;
    forecast: string;
  }[];
}

interface AllWeatherProps {
  area_metadata: AreaProps[];
  items: ForeCastProps[];
}

@Injectable()
export class WeatherService {
  private distance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    unit: string,
  ) {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == 'K') {
      dist = dist * 1.609344;
    }
    if (unit == 'N') {
      dist = dist * 0.8684;
    }
    return dist;
  }

  async fetchWeather(dateTime: string) {
    // Get Weather
    const weatherUrl = `${process.env.GOV_SG_API}/v1/environment/2-hour-weather-forecast?dateTime=${dateTime}`;
    const weather = await axios.get(weatherUrl);
    return weather.data;
  }

  async findNearestLocation(allWeather: AllWeatherProps, latLong: string) {
    let nearest = Infinity;
    let nearestLocation = null;
    const lat = latLong.split(',')[0] as unknown as number;
    const long = latLong.split(',')[1] as unknown as number;
    // Find nearest location based on lat/long
    for (const aw of allWeather.area_metadata) {
      if (aw.label_location) {
        const tempDistance: number = this.distance(
          lat,
          long,
          aw.label_location.latitude,
          aw.label_location.longitude,
          'K',
        );
        if (tempDistance < nearest || nearestLocation === null) {
          nearest = tempDistance;
          nearestLocation = aw;
        }
      }
    }
    // Get weather forecast based on the location name and area name
    for (const awItem of allWeather.items[0].forecasts) {
      if (nearestLocation.name === awItem['area']) {
        nearestLocation = awItem;
      }
    }
    return nearestLocation;
  }
}
