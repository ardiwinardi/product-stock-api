import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { PurchaseOrderStatus } from "../constants/purchase-order.constant";

export class UpdateStatusPurchaseOrderDto {
  @ApiPropertyOptional({
    enum: PurchaseOrderStatus,
    default: PurchaseOrderStatus.IN_PROGRESS,
  })
  @IsEnum(PurchaseOrderStatus)
  @IsOptional()
  status?: PurchaseOrderStatus = PurchaseOrderStatus.IN_PROGRESS;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  paymentId?: string;
}
