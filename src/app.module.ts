import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToyModule } from './toy/toy.module';
import { ChildModule } from './child/child.module';

@Module({
  imports: [ToyModule, ChildModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
