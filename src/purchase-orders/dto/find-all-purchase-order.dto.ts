import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsOptional } from "class-validator";

export class FindAllPurchaseOrderDto {
  @IsDateString()
  @ApiPropertyOptional()
  @IsOptional()
  dateFrom: string;

  @IsDateString()
  @ApiPropertyOptional()
  @IsOptional()
  dateTo: string;
}
