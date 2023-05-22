import {
  ProductStock,
  ProductStockSchema,
} from "@/product-stocks/schemas/product-stock.schema";
import { ProductsModule } from "@/products/products.module";
import { Product, ProductSchema } from "@/products/schemas/product.schema";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductStocksController } from "./product-stocks.controller";
import { ProductStocksService } from "./product-stocks.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductStock.name, schema: ProductStockSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
    ProductsModule,
  ],
  controllers: [ProductStocksController],
  providers: [ProductStocksService],
  exports: [ProductStocksService],
})
export class ProductStocksModule {}
