import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { User } from "./schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const itemIsExist = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec();

    if (itemIsExist) throw new HttpException("User already exists", 409);

    const createduser = new this.userModel({
      username: createUserDto.username,
      password: await bcrypt.hash(
        createUserDto.password,
        parseInt(process.env.SALT_OR_ROUNDS)
      ),
    });

    const item = await createduser.save();
    return new UserEntity(item);
  }

  async findAll() {
    const items = await this.userModel.find().exec();
    return items.map((item) => new UserEntity(item));
  }

  async findOne(id: string) {
    const item = await this.userModel.findById(id).exec();
    return new UserEntity(item);
  }

  async findByUsername(username: string) {
    const item = await this.userModel.findOne({ username });
    return new UserEntity(item);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const item = await this.userModel.findByIdAndUpdate(id, {
      username: updateUserDto.username,
    });
    if (!item) throw new NotFoundException();
    return new UserEntity(item);
  }

  async remove(id: string) {
    const item = await this.userModel.findByIdAndRemove(id);
    if (!item) throw new NotFoundException();
    return new UserEntity(item);
  }
}
