import CartContainer from "../model/cartContainer.js";
import ProductManager from "../model/productContainer.js";
import { errorResponse, successResponse } from "../utils/apiUtils.js";

const cartContainer = new CartContainer("./src/database/cart.json");
const productManager = new ProductManager("./src/database/product.json");

class CartController {
  async addNewCart(req, res, next) {
    try {
      const cart = await cartContainer.addNewCart();
      const response = successResponse(cart);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
  async getCartById(req, res, next) {
    try {
      const { cid } = req.params;
      const cartById = await cartContainer.getCartById(cid);
      const response = successResponse(cartById);
      console.log(cartById);

      cartById ? res.json(response) : res.json(errorResponse("ID not found"));
    } catch (error) {
      next(error);
    }
  }
  async addNewProductCart(req, res, next) {
    try {
      const { cid, pid } = req.params;
      const idProduct = await productManager.getProductsById(pid);
      if (idProduct) {
        const product = await cartContainer.addNewProductInCart(cid, pid);
        const response = successResponse(product);
        return product
          ? res.json(response)
          : res.json(errorResponse(`Cart ID: ${cid} not found`));
      }
      return res.json(errorResponse(`Product ID: ${pid} not found`));
    } catch (error) {
      next(error);
    }
  }
}

export default new CartController();
