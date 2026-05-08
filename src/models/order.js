// models/order.model.js

import mongoose from "mongoose";

const ORDER_STATUS = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "returned"
];

const PAYMENT_STATUS = [
  "pending",
  "paid",
  "failed",
  "refunded"
];

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },

    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },

    status: {
      type: String,
      enum: ORDER_STATUS,
      default: "pending",
      index: true
    },

    paymentStatus: {
      type: String,
      enum: PAYMENT_STATUS,
      default: "pending"
    },

    subtotalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    taxAmount: {
      type: Number,
      default: 0,
      min: 0
    },

    shippingAmount: {
      type: Number,
      default: 0,
      min: 0
    },

    discountAmount: {
      type: Number,
      default: 0,
      min: 0
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true
    },

    shippingAddressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingAddress",
      required: true
    },

    notes: {
      type: String,
      trim: true,
      default: null
    },

    placedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    collection: "orders"
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;