import { Router } from "express";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { CreateUserDTO } from "./dto/dto.response";
import { validateDTO } from "../middleware/validate";
import {asyncHandler} from "../utils/asyncHandler";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.post("/register", asyncHandler(validateDTO(CreateUserDTO)), userController.singup);

router.post("/login", asyncHandler(validateDTO(CreateUserDTO)), userController.login);
router.get("/ping", userController.ping);

export default router;
