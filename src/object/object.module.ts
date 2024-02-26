import { Module } from '@nestjs/common';
import {ObjectController} from "./object.controller";
import {ObjectService} from "./object.service";


@Module({
  providers: [ObjectService],
  controllers: [ObjectController],
})
export class ObjectModule {}
