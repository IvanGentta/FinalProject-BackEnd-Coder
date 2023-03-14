import { errorResponse, successResponse } from "./apiUtils.js";

export const validationProducts = (product) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = product;

  if (
    title === undefined ||
    description === undefined ||
    code === undefined ||
    price === undefined ||
    status === undefined ||
    stock === undefined ||
    category === undefined ||
    thumbnails === undefined
  ) {
    return errorResponse("Some fields are undefined");
  } else if (
    title === null ||
    description === null ||
    code === null ||
    price === null ||
    status === null ||
    stock === null ||
    category === null ||
    thumbnails === null
  ) {
    return errorResponse("Some fields are null");
  } else if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof code !== "string" ||
    typeof price !== "number" ||
    typeof status !== "boolean" ||
    typeof stock !== "number" ||
    typeof thumbnails !== "string"
  ) {
    return errorResponse("Some fields are invalid");
  } else {
    return successResponse(product);
  }
};

export const codeValidation = (allProducts, code) => {
  allProducts.find((element) => element.code === code) &&
    errorResponse("This code is alredy in use");
};

export const validationCart = (cartProduct) => {
  const { product } = cartProduct;
};
