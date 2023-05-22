import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsOptional } from "class-validator";
import { PurchaseOrderProductDto } from "./purchase-order-product-dto";

export class CreatePurchaseOrderDto {
  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  customerId: string;

  @ApiProperty({
    isArray: true,
    type: PurchaseOrderProductDto,
  })
  products: PurchaseOrderProductDto[];
}
