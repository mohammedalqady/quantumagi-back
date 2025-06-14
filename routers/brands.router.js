const Router = require("express");

const router = Router();

const authntication = require("../middleware/auth");
const brandController = require("../controllers/brands.controller");

router.post("/api/brands", authntication, brandController.createNewBrand);
router.get("/api/brands", authntication, brandController.getAllBrands);
router.get("/api/brands/:id", authntication, brandController.getOneBrand);
router.put("/api/brands/:id", authntication, brandController.updateOneBrand);
router.delete("/api/brands/:id", authntication, brandController.deleteOneBrand);

module.exports = router;
