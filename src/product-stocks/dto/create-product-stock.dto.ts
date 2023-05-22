import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductStockDto {
  @ApiProperty()
  @IsMongoId()
  productId: string;

  @ApiPropertyOptional()
  @IsMongoId()
  @IsOptional()
  poId?: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  stockAddition: number;
}
