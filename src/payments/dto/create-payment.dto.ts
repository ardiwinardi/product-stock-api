import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsOptional } from "class-validator";

export class CreatePaymentDto {
  @ApiProperty()
  @IsMongoId()
  poId: string;

  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  poProductId?: string;
}
