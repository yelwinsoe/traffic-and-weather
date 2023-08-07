import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { readFileSync, writeFileSync } from 'fs';

@Injectable()
export class TrafficService {
  localDB: object = {};
  dbUrl = 'src/db/geo.json';

  constructor() {
    const rawdata = readFileSync(this.dbUrl);
    this.localDB = JSON.parse(rawdata as unknown as string);
  }
  async fetchTrafficImageLocation(dateTime: string) {
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

    let newRecord = false;
    for (let i = 0; i < locationWithCameras.length; i++) {
      const latLong = `${locationWithCameras[i].location.latitude},${locationWithCameras[i].location.longitude}`;
      if (latLong in this.localDB) {
        // Geo data exist in local var
        locationWithCameras[i]['geo'] = this.localDB[latLong];
      } else {
        newRecord = true;
        // Geo data does not exist in local var
        const url = `${process.env.ONEMAP_API}/public/revgeocode?location=${latLong}`;
        const geo = await axios.get(url, config);
        this.localDB[latLong] = geo.data.GeocodeInfo[0] || {};

        locationWithCameras[i]['geo'] = geo.data.GeocodeInfo[0];
      }
    }

    if (newRecord) {
      const stringLocalDb = JSON.stringify(this.localDB);
      writeFileSync(this.dbUrl, stringLocalDb);
    }

    return locationWithCameras;
  }
}
