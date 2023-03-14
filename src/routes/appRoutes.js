import { Router } from "express";
import productsRoutes from "./productsRoutes.js";
import cartsRoutes from "./cartRoutes.js";

const router = Router();

router.use("/products", productsRoutes);
router.use("/cart", cartsRoutes);

export default router;
