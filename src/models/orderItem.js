// models/orderItem.model.js

import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },

    productName: {
      type: String,
      required: true,
      trim: true
    },

    sku: {
      type: String,
      trim: true,
      default: null
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    unitPrice: {
      type: Number,
      required: true,
      min: 0
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true,
    collection: "orderItems"
  }
);

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;