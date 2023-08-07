import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/weather (GET)', async () => {
    const dateTime: string = new Date().toISOString().split('.')[0];
    // Bishan lat/long
    const lat = 1.3526;
    const long = 103.8352;
    const res = await request(app.getHttpServer()).get(
      `/weather?dateTime=${dateTime}&lat=${lat}&long=${long}`,
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body.forecast).toBeDefined();
    expect(res.body.update_timestamp).toBeDefined();
    expect(res.body.forecast.area).toEqual('Bishan');
  });

  it('/weather (GET) without lat/long', async () => {
    const dateTime: string = new Date().toISOString().split('.')[0];
    const res = await request(app.getHttpServer()).get(
      `/weather?dateTime=${dateTime}`,
    );
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
      'Validation failed (numeric string is expected)',
    );
    expect(res.body.error).toEqual('Bad Request');
  });
});
