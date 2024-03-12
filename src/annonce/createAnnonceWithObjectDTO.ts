import { Type } from 'class-transformer';
import { ValidateNested, IsLatitude, IsLongitude } from 'class-validator';
import { CreateObjectDto } from '../object/dto';

export class CreateAnnonceWithObjectDto {
  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  object: CreateObjectDto;
}
