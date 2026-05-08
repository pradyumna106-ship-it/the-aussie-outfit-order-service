// routes/order.routes.js

import express from "express";

import {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus
} from "../controller/order.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/user/:userId", getOrdersByUser);

router.get("/:orderId", getOrderById);

router.put("/:orderId/status", updateOrderStatus);

export default router;