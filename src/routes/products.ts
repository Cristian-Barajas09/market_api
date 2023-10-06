import { ProductsController } from "../controller/ProductsController";
import { Router } from "express";
import { validateToken } from "../controller/ValidateToken";
const router : Router = Router();
const productController = new ProductsController()

router.route("/products")
    .get(validateToken.authenticated,productController.getProducts)
    .post(validateToken.authenticated,productController.createProduct)

router.route("/products/:id")
    .get(validateToken.authenticated,productController.getProductById)
    .put(validateToken.authenticated,productController.updateProduct)
    .delete(validateToken.authenticated,productController.deleteProduct)

export default router;