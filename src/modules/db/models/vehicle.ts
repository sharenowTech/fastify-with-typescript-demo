import { Document, Schema, Model, model } from "mongoose";

export interface VehicleDocument extends Document {
  year: number;
  name: string;
  createdDate: Date;
}

export interface VehicleModel extends VehicleDocument {}

export const VehicleSchema: Schema = new Schema(
  {
    year: Number,
    name: String,
    createdDate: Date
  },
  { collection: "vehicles" }
);

VehicleSchema.pre<VehicleDocument>("save", async function() {
  this.createdDate = new Date();
});

export const Vehicle: Model<VehicleModel> = model<VehicleModel>(
  "Vehicle",
  VehicleSchema
);
