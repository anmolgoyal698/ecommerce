import express from "express";
import { getProductById, getProducts } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(protect, getProducts);
router.route('/:id').get(protect, getProductById);

export default router;
