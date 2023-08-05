import { Injectable } from '@nestjs/common';
import axios from 'axios';

const localDB: object = {};

@Injectable()
export class TrafficService {
  async fetchTrafficCamLocation(dateTime: string) {
    // Get all locations
    const locationUrl = `${process.env.GOV_SG_API}/v1/transport/traffic-images?date_time=${dateTime}`;
    const location = await axios.get(locationUrl);
    // Get geo data and save it in local variable
    const locationWithCameras = location.data.items[0].cameras;
    const config = {
      headers: {
        Authorization: process.env.ONEMAP_TOKEN,
      },
    };
    for (let i = 0; i < locationWithCameras.length; i++) {
      const latLong = `${locationWithCameras[i].location.latitude},${locationWithCameras[i].location.longitude}`;
      if (latLong in localDB) {
        // Geo data exist in local var
        locationWithCameras[i]['geo'] = localDB[latLong];
      } else {
        // Geo data does not exist in local var
        const url = `${process.env.ONEMAP_API}/public/revgeocode?location=${latLong}`;
        // const geo = await axios.get(url, config);
        // localDB[latLong] = geo.data.GeocodeInfo[0];
        // locationWithCameras[i]['geo'] = geo.data.GeocodeInfo[0];
      }
    }
    return locationWithCameras;
  }
}
