import { Payment } from "../schemas/payment.schema";

export class PaymentEntity {
  id: string;
  poId: string;
  poProductId: string;
  amount: number;
  createdAt: Date;

  constructor(item: Payment) {
    this.id = item._id.toString();
    this.poId = item.poId;
    this.poProductId = item.poProductId;
    this.amount = item.amount;
    this.createdAt = item.createdAt;
  }
}
