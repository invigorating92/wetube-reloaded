import express from "express";
import {edit, deleteProfile, logout, seeUser} from "../controllers/userController";

export const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", deleteProfile);
userRouter.get("/:id", seeUser);
