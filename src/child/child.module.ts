import { Module } from '@nestjs/common';
import { ChildService } from './child.service';
import { ChildController } from './child.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ChildController],
  providers: [ChildService, PrismaService],
})
export class ChildModule {}
