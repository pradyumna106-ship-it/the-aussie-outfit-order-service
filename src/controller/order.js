// controllers/order.controller.js

import Order from "../models/order.js";
import OrderItem from "../models/orderItem.js";
import ShippingAddress from "../models/shippingAddress.js";

export const createOrder = async (req, res) => {
  try {

    const {
      userId,
      items,
      shippingAddressId,
      subtotalAmount,
      taxAmount,
      shippingAmount,
      discountAmount,
      totalAmount,
      notes
    } = req.body;

    if (
      !userId ||
      !items ||
      !items.length ||
      !shippingAddressId
    ) {
      return res.status(400).json({
        success: false,
        message: "Required order fields are missing"
      });
    }

    const shippingAddress = await ShippingAddress.findById(
      shippingAddressId
    );

    if (!shippingAddress) {
      return res.status(404).json({
        success: false,
        message: "Shipping address not found"
      });
    }

    const orderNumber = `ORD-${Date.now()}`;

    const order = await Order.create({
      userId,
      orderNumber,
      shippingAddressId,
      subtotalAmount,
      taxAmount,
      shippingAmount,
      discountAmount,
      totalAmount,
      notes
    });

    const orderItems = items.map(item => ({
      orderId: order._id,
      productId: item.productId,
      productName: item.productName,
      sku: item.sku,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice
    }));

    await OrderItem.insertMany(orderItems);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {

    const { userId } = req.params;

    const orders = await Order.find({
      userId
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getOrderById = async (req, res) => {
  try {

    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    const orderItems = await OrderItem.find({
      orderId: order._id
    });

    return res.status(200).json({
      success: true,
      data: {
        order,
        items: orderItems
      }
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {

    const { orderId } = req.params;

    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        status
      },
      {
        new: true
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};