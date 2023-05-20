import { Exclude } from "class-transformer";
import { User } from "../schemas/user.schema";

export class UserEntity {
  id: string;
  username: string;
  @Exclude()
  password: string;

  constructor(item: User) {
    this.id = item._id.toString();
    this.username = item.username;
    this.password = item.password;
  }
}
