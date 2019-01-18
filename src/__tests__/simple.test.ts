import * as fastify from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

import statusRoutes from "../modules/routes/status";

describe("/status", () => {
  let server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>;

  beforeAll(() => {});

  beforeEach(async () => {
    server = fastify({});
    // eslint-disable-next-line global-require
    server.register(statusRoutes);
    await server.ready();

    jest.clearAllMocks();
  });

  it("GET returns 200", async done => {
    const response = await server.inject({ method: "GET", url: "/status" });
    expect(response.statusCode).toEqual(200);
    const payload: { date: Date; works: boolean } = JSON.parse(
      response.payload
    );
    expect(payload).toMatchSnapshot({ date: expect.any(String), works: true });

    done();
  });

  it("POST returns 404", async done => {
    const response = await server.inject({ method: "POST", url: "/status" });
    expect(response.statusCode).toEqual(404);
    expect(response.payload).toMatchSnapshot();

    done();
  });
});
