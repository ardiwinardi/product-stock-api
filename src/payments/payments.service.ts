import { Order } from "@/common/constants/order.constant";
import { PageOptionsDto } from "@/common/dtos/page-option.dto";
import { PageEntity } from "@/common/entities/page.entity";
import { ProductStocksService } from "@/product-stocks/product-stocks.service";
import { PurchaseOrderStatus } from "@/purchase-orders/constants/purchase-order.constant";
import { PurchaseOrdersService } from "@/purchase-orders/purchase-orders.service";
import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { PaymentEntity } from "./entities/payment.entity";
import { Payment } from "./schemas/payment.schema";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    private purchaseOrderService: PurchaseOrdersService,
    private productStockService: ProductStocksService
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const { poId, poProductId } = createPaymentDto;

      // check is po has been paid
      const payment = await this.paymentModel.findOne({ poId }).exec();
      if (payment) throw new HttpException("Purchase order already paid", 409);

      // get products list
      const purchaseOrder = await this.purchaseOrderService.findOne(poId, {
        withProducts: true,
      });
      const { products } = purchaseOrder;

      // get total amount for payment
      const totalAmount = products.reduce(
        (value, item) => item.quantity * item.product.price + value,
        0
      );

      // create payment data
      const createPayment = new this.paymentModel({
        poId,
        poProductId,
        amount: totalAmount,
        createdAt: new Date(),
      });
      const item = await createPayment.save();

      if (item) {
        // update product stock
        products.forEach(async (purchasedProduct) => {
          await this.productStockService.create({
            productId: purchasedProduct.product.id,
            poId,
            description: "sold",
            stockAddition: -purchasedProduct.quantity,
          });
        });

        // update purchase order status
        this.purchaseOrderService.updateStatus(purchaseOrder.id, {
          paymentId: item._id,
          status: PurchaseOrderStatus.PAID,
        });
      }

      return new PaymentEntity(item);
    } catch (e) {
      throw e;
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const items = await this.paymentModel
      .find()
      .sort({
        [`${pageOptionsDto.orderBy}`]:
          pageOptionsDto.order === Order.ASC ? 1 : -1,
      })
      .skip(pageOptionsDto.skip)
      .limit(pageOptionsDto.limit)
      .exec();

    const data = items.map((item) => new PaymentEntity(item));
    const itemCount = await this.paymentModel.find().count();

    return new PageEntity({
      data,
      itemCount,
      pageOptionsDto,
    });
  }

  async findOne(id: string) {
    const item = await this.paymentModel.findById(id).exec();
    return new PaymentEntity(item);
  }
}
