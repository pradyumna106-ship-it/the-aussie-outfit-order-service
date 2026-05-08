// models/shippingAddress.model.js

import mongoose from "mongoose";

const shippingAddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },

    fullName: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    addressLine1: {
      type: String,
      required: true,
      trim: true
    },

    addressLine2: {
      type: String,
      trim: true,
      default: null
    },

    landmark: {
      type: String,
      trim: true,
      default: null
    },

    city: {
      type: String,
      required: true,
      trim: true
    },

    state: {
      type: String,
      required: true,
      trim: true
    },

    country: {
      type: String,
      required: true,
      trim: true,
      default: "India"
    },

    postalCode: {
      type: String,
      required: true,
      trim: true
    },

    isDefault: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    collection: "shippingAddresses"
  }
);

const ShippingAddress = mongoose.model(
  "ShippingAddress",
  shippingAddressSchema
);

export default ShippingAddress;