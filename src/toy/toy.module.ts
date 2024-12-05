import { Module } from '@nestjs/common';
import { ToyService } from './toy.service';
import { ToyController } from './toy.controller';

@Module({
  controllers: [ToyController],
  providers: [ToyService],
})
export class ToyModule {}
