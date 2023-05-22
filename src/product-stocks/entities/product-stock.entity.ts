import { ProductStock } from "../schemas/product-stock.schema";

export class ProductStockEntity {
  id: string;
  productId: string;
  poId: string;
  description: string;
  stockAddition: number;
  createdAt: Date;

  constructor(item: ProductStock) {
    this.id = item._id.toString();
    this.productId = item.productId;
    this.poId = item.poId;
    this.description = item.description;
    this.stockAddition = item.stockAddition;
    this.createdAt = item.createdAt;
  }
}
