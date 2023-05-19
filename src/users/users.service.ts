import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const item = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec();

    if (item) throw new HttpException("User already exists", 409);

    const createduser = new this.userModel({
      username: createUserDto.username,
      password: await bcrypt.hash(
        createUserDto.password,
        parseInt(process.env.SALT_OR_ROUNDS)
      ),
    });

    return createduser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const item = this.userModel.findByIdAndUpdate(id, {
      username: updateUserDto.username,
    });
    if (!item) throw new NotFoundException();
    return item;
  }

  remove(id: string) {
    const item = this.userModel.findByIdAndRemove(id);
    if (!item) throw new NotFoundException();
    return item;
  }
}
