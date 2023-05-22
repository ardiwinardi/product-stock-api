import { PurchaseOrder } from "../schemas/purchase-order.schema";

export class PurchaseOrderEntity {
  id: string;
  customerId: string;
  paymentId: string;
  createdAt: Date;
  paidAt: Date;
  canceledAt: Date;
  status: string;

  constructor(item: PurchaseOrder) {
    this.id = item._id.toString();
    this.customerId = item.customerId;
    this.paymentId = item.paymentId;
    this.createdAt = item.createdAt;
    this.paidAt = item.paidAt;
    this.canceledAt = item.canceledAt;
    this.status = item.status;
  }
}
