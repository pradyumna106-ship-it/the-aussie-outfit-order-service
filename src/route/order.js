// routes/order.routes.js

import express from "express";

import {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
  getOrders
} from "../controller/order.js";

const router = express.Router();



router.get("/user/:userId", getOrdersByUser);

router.get("/:orderId", getOrderById);

router.put("/:orderId/status", updateOrderStatus);

router.route("/")
  .get(getOrders)
  .post(createOrder);


export default router;