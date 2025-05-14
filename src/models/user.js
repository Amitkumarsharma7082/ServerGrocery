import mongoose from "mongoose";

// Base user schema

const userSchema = new mongoose.Schema({
  name: { type: String },
  role: {
    type: String,
    enum: ["Customer", "Admin", "DeliveryPartner"],
    require: true,
  },
  isActivated: { type: Boolean, default: false },
});

// Customer schema

const customerSchema = new mongoose.Schema({
  ...userSchema.obj,
  phone: { type: Number, require: true, unique: true },
  role: { type: String, enum: ["Customer"], default: "Customer" },
  liveLocation: {
    latitude: { type: Number },
    longitube: { type: Number },
  },
  address: { type: String },
});

// Delivery Partner Schema

const deliveryPartnerSchema = new mongoose.Schema({
  ...userSchema.obj,
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  phone: { type: Number, require: true },
  role: { type: String, enum: ["DeliveryPartner"], default: "DeliveryPartner" },
  liveLocation: {
    latitude: { type: Number },
    longitube: { type: Number },
  },
  address: { type: String },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
});

// Admin Schema

const adminSchema = new mongoose.Schema({
  ...userSchema.obj,
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: { type: String, enum: ["Admin"], default: "Admin" },
});

export const Customer = mongoose.model("Customer", customerSchema);
export const DeliveryPartner = mongoose.model(
  "DeliveryPartner",
  deliveryPartnerSchema
);
export const Admin = mongoose.model("Admin", adminSchema);
