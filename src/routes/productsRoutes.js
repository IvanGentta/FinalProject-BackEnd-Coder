import { Router } from "express";
import ProductsController from "../controller/productController.js";

const productsRouter = Router();

productsRouter.get("/", ProductsController.getProducts);
productsRouter.get("/:pid", ProductsController.getProductsById);
productsRouter.post("/", ProductsController.addProducts);
productsRouter.put("/:pid", ProductsController.updateProducts);
productsRouter.delete("/:pid", ProductsController.deleteProduct);

export default productsRouter;
