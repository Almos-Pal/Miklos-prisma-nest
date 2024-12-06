import { Module } from '@nestjs/common';
import { ToyService } from './toy.service';
import { ToyController } from './toy.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ToyController],
  providers: [ToyService, PrismaService],
})
export class ToyModule {}
