import request from "supertest";
import app from "../src/app";
import { Server } from "http";

let server: Server;

beforeAll((done) => {
  server = app.listen(4000, () => {
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    done();
  });
});

describe("GET /", () => {
  it('should return 200 OK with "Hello, Express with TypeScript!"', async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, Express with TypeScript!");
  });
});
