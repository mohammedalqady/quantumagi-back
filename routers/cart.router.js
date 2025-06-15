const Router = require("express");

const router = Router();

const authntication = require("../middleware/auth");
const cartController = require("../controllers/cart.controller");

router.get("/api/cart/:userId", cartController.getCart);
router.post("/api/cart/:id", cartController.createCart);
router.get("/api/cart", authntication, cartController.updateCart);
// router.get("/api/cart", authntication, cartController.deleteCart);

module.exports = router;
