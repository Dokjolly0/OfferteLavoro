import mongoose from "mongoose";
import { offerte_lavoro_dto } from "./offerte_lavoro.dto";

const offerte_lavoro_schema = new mongoose.Schema<offerte_lavoro_dto>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: false },
    retribution: { type: Number, required: true },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  }
);

export const offerte_lavoro_model = mongoose.model<offerte_lavoro_dto>(
  "offerte_lavoro",
  offerte_lavoro_schema
);
