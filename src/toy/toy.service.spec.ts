import { Test, TestingModule } from '@nestjs/testing';
import { ToyService } from './toy.service';

describe('ToyService', () => {
  let service: ToyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToyService],
    }).compile();

    service = module.get<ToyService>(ToyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
