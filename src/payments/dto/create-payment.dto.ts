import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsMongoId, IsOptional } from "class-validator";

export class CreatePaymentDto {
  @ApiProperty()
  @IsMongoId()
  poId: string;

  @ApiPropertyOptional()
  @IsMongoId()
  @IsOptional()
  poProductId?: string;
}
