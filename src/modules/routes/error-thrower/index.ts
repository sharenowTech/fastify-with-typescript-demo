import * as fp from "fastify-plugin";

export default fp(async (server, opts, next) => {
  server.route({
    url: "/error-thrower",
    method: ["GET"],
    handler: async (request, reply) => {
      throw new Error("Oh no, something bad happened, try to debug me");
      return reply.send({ date: new Date(), works: true });
    }
  });
  next();
});
