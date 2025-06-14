const Router = require("express");
const router = Router();

const productController = require("../controllers/products.controller");
const authntication = require("../middleware/auth");

router.post("/api/products", authntication, productController.createNewProduct);
router.get("/api/products", productController.getAllProducts);
router.get("/api/products/:id", productController.getProdectById);
router.put(
  "/api/products/:id",
  authntication,
  productController.updateProductById
);
router.delete(
  "/api/products/:id",
  authntication,
  productController.deleteProductById
);

module.exports = router;
