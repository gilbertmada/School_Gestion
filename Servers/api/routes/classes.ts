import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { admins, allUsers } from "../utils";
import classesController from "../controllers/ClassesController";

const router = Router();

//Create new classe
router.post("/", [checkJwt, checkRole(allUsers)], classesController.createClasses);
// get list
router.get("/get", classesController.listClasses);

export default router;
