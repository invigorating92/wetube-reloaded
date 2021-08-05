import express from "express";
import {login, join} from "../controllers/userController";
import {home, search} from "../controllers/videoController";

export const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/login", login);
globalRouter.get("/join", join);
globalRouter.get("/search", search);


