import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
  _id: string;

  @Prop()
  poId: string;

  @Prop()
  poProductId: string;

  @Prop()
  amount: number;

  @Prop()
  createdAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
