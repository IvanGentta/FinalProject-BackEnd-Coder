import ProductManager from "../model/productContainer.js";
import { errorResponse, successResponse } from "../utils/apiUtils.js";
import { codeValidation, validationProducts } from "../utils/validations.js";

const productManager = new ProductManager("./src/database/product.json");

class ProductsController {
  async getProducts(req, res, next) {
    try {
      const products = await productManager.getProducts();
      const limitValue = +req.query.limit;
      if (!limitValue) {
        res.json(products);
      } else {
        const productLimit = [];
        for (let i = 0; i < limitValue && i <= 10; i++) {
          productLimit.push(products[i]);
        }
        res.json(productLimit);
      }
    } catch (error) {
      next(error);
    }
  }
  async getProductsById(req, res, next) {
    try {
      const { pid } = req.params;
      const productById = await productManager.getProductsById(pid);
      const response = successResponse(productById);
      productById
        ? res.json(response)
        : res.json(errorResponse("ID not found"));
    } catch (error) {
      next(error);
    }
  }
  async addProducts(req, res, next) {
    try {
      const result = validationProducts(req.body);
      const allProduct = await productManager.getProducts();
      const validCode = codeValidation(allProduct, req.body.code);
      if (allProduct.length) {
        if (validCode) {
          return res.json(validCode);
        } else if (result.success) {
          await productManager.addProducts(req.body);
        }
      } else {
        await productManager.addProducts(req.body);
      }
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async updateProducts(req, res, next) {
    try {
      const { pid } = req.params;
      const allProducts = await productManager.getProducts();
      const validCode = codeValidation(allProducts, req.body.code);
      if (validCode) {
        return res.json(validCode);
      } else {
        const updateProduct = await productManager.updateProduct(pid, req.body);
        const result = validationProducts(updateProduct);
        return res.json(result);
      }
    } catch (error) {
      next(error);
    }
  }
  async deleteProduct(req, res, next) {
    try {
      const { pid } = req.params;
      const deleteProduct = await productManager.deleteProduct(pid);
      const response = successResponse(deleteProduct);
      deleteProduct !== -1
        ? res.json(response)
        : res.json(errorResponse("ID not Found"));
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductsController();
