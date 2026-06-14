const express = require("express");
const authController = require("../controllers/auth.controllers");

const authRouter = express.Router();


authRouter.post("/register",authController.registerUserController);

module.exports = authRouter;

