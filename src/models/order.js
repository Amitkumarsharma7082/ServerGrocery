import mongoose from "mongoose";
import Counter from "./counter.js";

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
  },
  customer: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
    require: true,
  },
  deliveryPartner: {
    type: mongoose.Types.ObjectId,
    ref: "DeliveryPartner",
  },
  branch: {
    type: mongoose.Types.ObjectId,
    ref: "Branch",
    require: true,
  },
  items: [
    {
      id: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        require: true,
      },
      item: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        require: true,
      },
      count: { type: Number, require: true },
    },
  ],
  deliveryLocation: {
    latitude: { type: Number, require: true },
    longitude: { type: Number, require: true },
    address: { type: String },
  },
  pickupLocation: {
    latitude: { type: Number, require: true },
    longitude: { type: Number, require: true },
    address: { type: String },
  },
  deliveryPartnerLocation: {
    latitude: { type: Number },
    longitude: { type: Number },
    address: { type: String },
  },
  status: {
    type: String,
    enum: ["available", "confirmed", "arriving", "delivered", "cancelled"],
    default: "available",
  },
  totalPrice: { type: Number, require: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneUpdate(
    { name: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
}

orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const sequenceValue = await getNextSequenceValue("orderId");
    this.orderId = `ORDR${sequenceValue.toString().padStart(5, "0")}`;
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
