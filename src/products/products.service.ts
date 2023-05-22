import { Order } from "@/common/constants/order.constant";
import { PageOptionsDto } from "@/common/dtos/page-option.dto";
import { PageEntity } from "@/common/entities/page.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductEntity } from "./entities/product.entity";
import { Product } from "./schemas/product.schema";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel({
      name: createProductDto.name,
      price: createProductDto.price,
      stock: createProductDto.stock,
    });
    const item = await createdProduct.save();
    return new ProductEntity(item);
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const items = await this.productModel
      .find()
      .sort({
        [`${pageOptionsDto.orderBy}`]:
          pageOptionsDto.order === Order.ASC ? 1 : -1,
      })
      .skip(pageOptionsDto.skip)
      .limit(pageOptionsDto.limit)
      .exec();

    const data = items.map((item) => new ProductEntity(item));
    const itemCount = await this.productModel.find().count();

    return new PageEntity({
      data,
      itemCount,
      pageOptionsDto,
    });
  }

  async findOne(id: string) {
    const item = await this.productModel.findById(id).exec();
    return new ProductEntity(item);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const item = await this.productModel.findByIdAndUpdate(id, {
      name: updateProductDto.name,
      price: updateProductDto.price,
      stock: updateProductDto.stock,
    });

    if (!item) throw new NotFoundException();
    return new ProductEntity(item);
  }

  async remove(id: string) {
    const item = await this.productModel.findByIdAndRemove(id);
    if (!item) throw new NotFoundException();
    return new ProductEntity(item);
  }
}
