import { Router } from "express";
import { TasksController } from "./tasks.controller";
import { authenticateToken } from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";
import { CreateTaskDTO } from "./dto/dto.requestCreate";
import { validateDTO } from "../middleware/validate";
import { UpdateRequestTaskDTO } from "./dto/dto.requestUpdate";

const router = Router();
const tasksController = new TasksController();

router.post("/", asyncHandler(authenticateToken),asyncHandler(validateDTO(CreateTaskDTO)), tasksController.create);
router.get("/", asyncHandler(authenticateToken), tasksController.list);
router.get("/:id", asyncHandler(authenticateToken), tasksController.getById);
router.put("/:id", asyncHandler(authenticateToken),asyncHandler(validateDTO(UpdateRequestTaskDTO)), tasksController.update);
router.delete("/:id", asyncHandler(authenticateToken), tasksController.delete);

export default router;