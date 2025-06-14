const Router = require("express");
const router = Router();

const userController = require("../controllers/users.controller");
const authntication = require("../middleware/auth");

router.post("/api/users/register", userController.register);
router.post("/api/users/login", userController.login);
router.get("/api/users", authntication, userController.getUsers);
router.get("/api/users/:id", authntication, userController.getUserById);
router.put("/api/users/:id", authntication, userController.getUserById);
router.delete("/api/users/:id", authntication, userController.deleteUser);

module.exports = router;
