import { ProductStock } from "@/product-stocks/schemas/product-stock.schema";
import { Product } from "@/products/schemas/product.schema";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProductStockDto } from "./dto/create-product-stock.dto";
import { ProductStockEntity } from "./entities/product-stock.entity";

@Injectable()
export class ProductStocksService {
  constructor(
    @InjectModel(ProductStock.name)
    private productStockModel: Model<ProductStock>,
    @InjectModel(Product.name)
    private productModel: Model<Product>
  ) {}

  async create(createProductStockDto: CreateProductStockDto) {
    const { productId } = createProductStockDto;

    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException();

    const createdProductStock = new this.productStockModel({
      productId,
      poId: createProductStockDto.poId,
      description: createProductStockDto.description,
      stockAddition: createProductStockDto.stockAddition,
      createdAt: new Date(),
    });
    const item = await createdProductStock.save();

    if (item) {
      product.stock = product.stock + createProductStockDto.stockAddition;
      await product.save();
    }

    return new ProductStockEntity(item);
  }

  async findByProductId(productId: string) {
    const items = await this.productStockModel
      .find({
        productId,
      })
      .exec();
    return items.map((item) => new ProductStockEntity(item));
  }
}
