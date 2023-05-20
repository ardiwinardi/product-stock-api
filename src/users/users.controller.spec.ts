import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

const items: UserEntity[] = [
  {
    id: "63d6bb377c5eabd78f895648",
    username: "Belajar 2",
    password: "rahasia",
  },
];

const createUserDto: CreateUserDto = {
  username: "test",
  password: "test",
};

describe("UsersController", () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(items),
            create: jest.fn().mockResolvedValue(createUserDto),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll()", () => {
    it("should return an array of users", async () => {
      expect(controller.findAll()).resolves.toEqual(items);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe("create()", () => {
    it("should create a new user", async () => {
      const createSpy = jest.spyOn(service, "create");
      await controller.create(createUserDto);
      expect(createSpy).toHaveBeenCalledWith(createUserDto);
    });
  });
});
