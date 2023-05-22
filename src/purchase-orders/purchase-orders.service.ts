import { Order } from "@/common/constants/order.constant";

import { PageOptionsDto } from "@/common/dtos/page-option.dto";
import { PageEntity } from "@/common/entities/page.entity";
import { ProductsService } from "@/products/products.service";
import { UserEntity } from "@/users/entities/user.entity";
import { UsersService } from "@/users/users.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PurchaseOrderStatus } from "./constants/purchase-order.constant";
import { CreatePurchaseOrderDto } from "./dto/create-purchase-order.dto";
import { FindAllPurchaseOrderDto } from "./dto/find-all-purchase-order.dto";
import { UpdatePurchaseOrderDto } from "./dto/update-purchase-order.dto";
import { UpdateStatusPurchaseOrderDto } from "./dto/update-status-purchase-order.dto";
import { PurchaseOrderProductEntity } from "./entities/purchase-order-product.entity";
import { PurchaseOrderEntity } from "./entities/purchase-order.entity";
import { PurchaseOrderProduct } from "./schemas/purchase-order-product.schema";
import { PurchaseOrder } from "./schemas/purchase-order.schema";

@Injectable()
export class PurchaseOrdersService {
  constructor(
    @InjectModel(PurchaseOrder.name)
    private purchaseOrderModel: Model<PurchaseOrder>,
    @InjectModel(PurchaseOrderProduct.name)
    private purchaseOrderProductModel: Model<PurchaseOrderProduct>,
    private productsService: ProductsService,
    private usersService: UsersService
  ) {}

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    const { customerId, products } = createPurchaseOrderDto;

    const createPurchaseOrder = new this.purchaseOrderModel({
      customerId,
      createdAt: new Date(),
      status: PurchaseOrderStatus.IN_PROGRESS,
    });

    const item = await createPurchaseOrder.save();

    if (item) {
      products.forEach(async (purchasedProduct) => {
        const product = await this.productsService.findOne(purchasedProduct.id);

        await new this.purchaseOrderProductModel({
          poId: item._id,
          product: product,
          quantity: purchasedProduct.quantity,
        }).save();
      });
    }

    return new PurchaseOrderEntity(item);
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
    findAllPurchaseOrderDto: FindAllPurchaseOrderDto
  ) {
    let query = {};
    if (findAllPurchaseOrderDto.dateFrom && findAllPurchaseOrderDto.dateTo) {
      const { dateFrom, dateTo } = findAllPurchaseOrderDto;
      query = {
        createdAt: {
          $gte: new Date(new Date(dateFrom).setHours(0, 0, 0)),
          $lt: new Date(new Date(dateTo).setHours(23, 59, 59)),
        },
      };
    }

    const items = await this.purchaseOrderModel
      .find(query)
      .sort({
        [`${pageOptionsDto.orderBy}`]:
          pageOptionsDto.order === Order.ASC ? 1 : -1,
      })
      .skip(pageOptionsDto.skip)
      .limit(pageOptionsDto.limit)
      .exec();

    const data = items.map((item) => new PurchaseOrderEntity(item));
    const itemCount = await this.purchaseOrderModel.find(query).count();

    return new PageEntity({
      data,
      itemCount,
      pageOptionsDto,
    });
  }

  async findOne(
    id: string,
    options?: { withProducts?: boolean; withCustomer?: boolean }
  ) {
    let products: PurchaseOrderProductEntity[] = undefined;
    let customer: UserEntity = undefined;

    const item = await this.purchaseOrderModel.findById(id).exec();
    if (!item) throw new NotFoundException();

    if (options?.withProducts) {
      const items = await this.purchaseOrderProductModel
        .find({ poId: id })
        .exec();
      products = items.map((item) => new PurchaseOrderProductEntity(item));
    }

    if (options?.withCustomer) {
      customer = await this.usersService.findOne(item.customerId);
    }

    return {
      ...new PurchaseOrderEntity(item),
      customer,
      products,
    };
  }

  async update(id: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    const { products } = updatePurchaseOrderDto;

    const item = await this.purchaseOrderModel.findById(id);
    if (!item) throw new NotFoundException();

    products.forEach(async (purchasedProduct) => {
      await this.purchaseOrderProductModel.findByIdAndUpdate(
        purchasedProduct.id,
        {
          quantity: purchasedProduct.quantity,
        }
      );
    });

    return new PurchaseOrderEntity(item);
  }

  async updateStatus(
    id: string,
    { status, paymentId }: UpdateStatusPurchaseOrderDto
  ) {
    let canceledAt = undefined;
    let paidAt = undefined;

    if (status === PurchaseOrderStatus.PAID) {
      paidAt = new Date();
    } else if (status === PurchaseOrderStatus.CANCELED) {
      canceledAt = new Date();
    }

    const item = await this.purchaseOrderModel.findByIdAndUpdate(id, {
      status,
      paymentId,
      canceledAt,
      paidAt,
    });

    if (!item) throw new NotFoundException();
    return new PurchaseOrderEntity(item);
  }
}
