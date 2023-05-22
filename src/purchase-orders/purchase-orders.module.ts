import { ProductsModule } from "@/products/products.module";
import { Product, ProductSchema } from "@/products/schemas/product.schema";
import { UsersModule } from "@/users/users.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PurchaseOrdersController } from "./purchase-orders.controller";
import { PurchaseOrdersService } from "./purchase-orders.service";
import {
  PurchaseOrderProduct,
  PurchaseOrderProductSchema,
} from "./schemas/purchase-order-product.schema";
import {
  PurchaseOrder,
  PurchaseOrderSchema,
} from "./schemas/purchase-order.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PurchaseOrder.name, schema: PurchaseOrderSchema },
      { name: PurchaseOrderProduct.name, schema: PurchaseOrderProductSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
    ProductsModule,
    UsersModule,
  ],
  controllers: [PurchaseOrdersController],
  providers: [PurchaseOrdersService],
  exports: [PurchaseOrdersService],
})
export class PurchaseOrdersModule {}
