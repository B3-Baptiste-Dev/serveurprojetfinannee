import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ResponseHelperService } from './response-helper/response-helper.service';
import {ConfigModule} from "@nestjs/config";
import { CategoryModule } from './category/category.module';
import { ReservationModule } from './reservation/reservation.module';
import { MessageModule } from './message/message.module';
import { ReviewModule } from './review/review.module';
import {ObjectModule} from "./object/object.module";
import { AnnonceModule } from './annonce/annonce.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, ConfigModule.forRoot(), CategoryModule, ReservationModule, MessageModule, ReviewModule, ObjectModule, AnnonceModule, UserModule],
  controllers: [AppController],
  providers: [AppService, ResponseHelperService],
})
export class AppModule {}
