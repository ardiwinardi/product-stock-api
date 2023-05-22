import { ProductEntity } from "@/products/entities/product.entity";
import { PurchaseOrderProduct } from "../schemas/purchase-order-product.schema";

export class PurchaseOrderProductEntity {
  id: string;
  product: Partial<ProductEntity>;
  quantity: number;

  constructor(item: PurchaseOrderProduct) {
    this.id = item._id.toString();
    this.product = item.product;
    this.quantity = item.quantity;
  }
}
