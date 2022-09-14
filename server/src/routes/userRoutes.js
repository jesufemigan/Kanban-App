"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRoutes = (0, express_1.Router)();
userRoutes.route('/register').post(userController_1.userSignup);
userRoutes.route('/signin').post(userController_1.userSignin);
exports.default = userRoutes;
