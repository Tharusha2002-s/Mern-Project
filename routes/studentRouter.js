import express from "express";
import { createUser, deleteUser, getAllUsers, updateUser } from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.get('/',getAllUsers);

studentRouter.post('/',createUser)

studentRouter.put('/:id',updateUser)

studentRouter.delete('/',deleteUser)
  
export default studentRouter;