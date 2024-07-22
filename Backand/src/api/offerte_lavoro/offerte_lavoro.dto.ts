//npm install class-transformer //npm install class-validator
import {
  IsMongoId,
  IsString,
  IsOptional,
  IsDateString,
  IsNumber,
  Min,
} from "class-validator";
import mongoose from "mongoose";

export class offerte_lavoro_dto {
  @IsMongoId()
  @IsOptional()
  id: mongoose.Types.ObjectId;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @IsNumber()
  @Min(0, { message: "Retribution must be a non-negative number" })
  retribution: number;
}
