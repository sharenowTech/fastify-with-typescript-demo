import { Model } from "mongoose";
import * as Mongoose from "mongoose";
import { VehicleModel, Vehicle } from "./models/vehicle";

import * as fp from "fastify-plugin";

export interface Models {
  Vehicle: Model<VehicleModel>;
}

export interface Db {
  models: Models;
}

export default fp(async (fastify, opts: { uri: string }, next) => {
  Mongoose.connection.on("connected", () => {
    fastify.log.info({ actor: "MongoDB" }, "connected");
  });

  Mongoose.connection.on("disconnected", () => {
    fastify.log.error({ actor: "MongoDB" }, "disconnected");
  });

  await Mongoose.connect(
    opts.uri,
    {
      useNewUrlParser: true,
      keepAlive: 1
    }
  );

  const models: Models = {
    Vehicle: Vehicle
  };

  fastify.decorate("db", { models });

  next();
});
