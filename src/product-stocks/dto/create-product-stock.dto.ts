import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductStockDto {
  @ApiProperty()
  @IsMongoId()
  productId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  poId?: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  stockAddition: number;
}
