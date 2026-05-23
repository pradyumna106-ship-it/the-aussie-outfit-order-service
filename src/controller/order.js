// controllers/order.controller.js

import Order from "../models/order.js";
import OrderItem from "../models/orderItem.js";
import ShippingAddress from "../models/shippingAddress.js";

export const createOrder = async (req, res) => {

    try {

      const {
        userId,
        customerName,
        items,
        shippingAddressId,
        paymentMethod,
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

      let shippingAddress = await ShippingAddress.findOne(
        {
          addressId: shippingAddressId
        }
      );

      if (!shippingAddress) {
        shippingAddress = await ShippingAddress.create({
          userId,
          addressId: shippingAddressId,
          orderId: null,
        })
      }
      const orderNumber = `ORD-${Date.now()}`;

      const order = await Order.create({
        userId,
        orderNumber,
        shippingAddressId: shippingAddress._id,
        subtotalAmount,
        taxAmount,
        shippingAmount,
        discountAmount,
        totalAmount,
        notes,
        customerName
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
      await ShippingAddress.findByIdAndUpdate(
        shippingAddress._id,
        {
          orderId: order._id
        }
      );
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

    const { status , packedBy } = req.body;
    const existingOrder = await Order.findById(orderId);
    
    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    const updateData = {
      status,
      packedBy
    }
    const order = await Order.findByIdAndUpdate(
      orderId,
      updateData,
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

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

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
}