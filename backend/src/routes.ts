import { Router } from "express";
import user from "./user/user.routes"
import tasks from "./tasks/tasks.routes"

const router = Router();

router.use("/auth", user);
router.use("/tasks", tasks);

export default router;
