const Router = require("express");
const router = Router();

const categoryController = require("../controllers/categories.controller");
const authntication = require("../middleware/auth");

router.post(
  "/api/categories",
  authntication,
  categoryController.createNewCategory
);

router.get(
  "/api/categories",
  authntication,
  categoryController.getAllCategories
);

router.get(
  "/api/categories/:id",
  authntication,
  categoryController.getOneCategory
);

router.put(
  "/api/categories/:id",
  authntication,
  categoryController.getCatAndUpdate
);
router.delete(
  "/api/categories/:id",
  authntication,
  categoryController.deleteCategory
);

module.exports = router;
