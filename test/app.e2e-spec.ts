import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/auth/login (POST)", async () => {
    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ username: "asep", password: "ardi" })
      .expect(201);

    expect(response.body).toHaveProperty("access_token");
  });
});
