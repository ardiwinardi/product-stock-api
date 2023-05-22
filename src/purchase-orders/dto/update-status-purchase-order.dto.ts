import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { PurchaseOrderStatus } from "../constants/purchase-order.constant";

export class UpdateStatusPurchaseOrderDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsEnum(PurchaseOrderStatus)
  status: keyof typeof PurchaseOrderStatus;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  paymentId?: string;
}
