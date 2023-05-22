import { ApiProperty } from "@nestjs/swagger";
import { PurchaseOrderProductDto } from "./purchase-order-product-dto";

export class UpdatePurchaseOrderDto {
  @ApiProperty({
    isArray: true,
    type: PurchaseOrderProductDto,
  })
  products: PurchaseOrderProductDto[];
}
