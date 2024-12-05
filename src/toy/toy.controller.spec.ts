import { Test, TestingModule } from '@nestjs/testing';
import { ToyController } from './toy.controller';
import { ToyService } from './toy.service';

describe('ToyController', () => {
  let controller: ToyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToyController],
      providers: [ToyService],
    }).compile();

    controller = module.get<ToyController>(ToyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
