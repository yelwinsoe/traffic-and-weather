import { Test, TestingModule } from '@nestjs/testing';
import { TrafficController } from './traffic.controller';
import { TrafficService } from '../../../traffic/services/traffic/traffic.service';

describe('TrafficController', () => {
  let controller: TrafficController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrafficService],
      controllers: [TrafficController],
    }).compile();

    controller = module.get<TrafficController>(TrafficController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
