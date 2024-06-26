import { Document, Schema, model, models } from "mongoose";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
export interface IEvent extends Document {
  // map(arg0: (event: any) => import("react").JSX.Element): import("react").ReactNode;
  _id: string;
  imageUrl: string | StaticImport;
  title: string;
  description?: string;
  location?: string;
  createdAt: Date;
  // imageUrl: string;
  startDateTime: Date | undefined;
  endDateTime: Date | undefined;
  price: string;
  // isFree: boolean;
  // url?: string;
  category: { _id: string; name: string };
  organizer: { _id: string; firstname: string; lastname: string };
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  imageUrl: { type: String },
  // createdAt: { type: Date, default: Date.now },
  // imageUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  price: { type: String },
  // isFree: { type: Boolean, default: false },
  // url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
