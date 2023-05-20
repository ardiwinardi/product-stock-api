import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { ProductsModule } from "./products/products.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI),
    UsersModule,
    AuthModule,
    ProductsModule,
  ],
})
export class AppModule {}
