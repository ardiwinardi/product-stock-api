import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsPositive } from "class-validator";

export class PurchaseOrderProductDto {
  @ApiProperty()
  @IsMongoId()
  id: string;

  @ApiProperty()
  @IsPositive()
  quantity: number;
}
