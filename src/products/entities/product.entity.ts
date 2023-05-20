import { Product } from "../schemas/product.schema";

export class ProductEntity {
  id: string;
  name: string;
  price: number;
  stock: number;

  constructor(item: Product) {
    this.id = item._id.toString();
    this.name = item.name;
    this.price = item.price;
    this.stock = item.stock;
  }
}
