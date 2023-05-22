import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PurchaseOrderDocument = HydratedDocument<PurchaseOrder>;

@Schema({ collection: "purhase_orders" })
export class PurchaseOrder {
  _id: string;

  @Prop()
  customerId: string;

  @Prop()
  paymentId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  paidAt: Date;

  @Prop()
  canceledAt: Date;

  @Prop()
  status: string;
}

export const PurchaseOrderSchema = SchemaFactory.createForClass(PurchaseOrder);
