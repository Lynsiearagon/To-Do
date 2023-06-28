import * as ToDoController from "../controllers/todos";
import { Router } from "express";

const router = Router();

// get todos from db
router.get("/", ToDoController.getToDos);

// get one toDo by id
router.get("/:toDoId", ToDoController.getToDo)

// create todo
router.post("/", ToDoController.createToDo);

// update todo
router.patch("/:toDoId", ToDoController.updateToDo);

// delete todo
router.delete("/:toDoId", ToDoController.deleteToDo);



export default router;