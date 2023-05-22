import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PurchaseOrderProductDocument =
  HydratedDocument<PurchaseOrderProduct>;

class Product {
  id: string;
  name: string;
  price: number;
}

@Schema({ collection: "purhase_order_products" })
export class PurchaseOrderProduct {
  _id: string;

  @Prop()
  poId: string;

  @Prop()
  product: Product;

  @Prop()
  quantity: number;

  @Prop()
  returnedAt: Date;
}

export const PurchaseOrderProductSchema =
  SchemaFactory.createForClass(PurchaseOrderProduct);
