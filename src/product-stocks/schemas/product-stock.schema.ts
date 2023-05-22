import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductStockDocument = HydratedDocument<ProductStock>;

@Schema({ collection: "product_stocks" })
export class ProductStock {
  _id: string;

  @Prop()
  productId: string;

  @Prop()
  poId: string;

  @Prop()
  description: string;

  @Prop()
  stockAddition: number;

  @Prop()
  createdAt: Date;
}

export const ProductStockSchema = SchemaFactory.createForClass(ProductStock);
