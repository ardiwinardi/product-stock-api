import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { ProductsModule } from "./products/products.module";
import { UsersModule } from "./users/users.module";
import { ProductStocksModule } from './product-stocks/product-stocks.module';
import { PurchaseOrdersModule } from './purchase-orders/purchase-orders.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI),
    UsersModule,
    AuthModule,
    ProductsModule,
    ProductStocksModule,
    PurchaseOrdersModule,
    PaymentsModule,
  ],
})
export class AppModule {}
