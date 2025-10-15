import express from "express";
import { protect, admin} from "../middleware/authMiddleware.js";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatusToPaid,
  updateOrderStatusToDelivered,
  getAllOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protect, createOrder);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, admin, getOrderById);
router.route("/:id/pay").put(protect, updateOrderStatusToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderStatusToDelivered);
router.route("/").get(protect, admin, getAllOrders);

export default router;
