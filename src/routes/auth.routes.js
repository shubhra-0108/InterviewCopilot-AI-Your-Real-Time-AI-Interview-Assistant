const express = require("express");
const authController = require("../controllers/auth.controllers");

const authRouter = express.Router();


authRouter.post("/register",authController.registerUserController);

authRouter.post("/login", authController.loginUserController);


module.exports = authRouter;

