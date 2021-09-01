import express from "express";
import {getLogin, postLogin, getJoin, postJoin} from "../controllers/userController";
import {home, search} from "../controllers/videoController";

export const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.get("/search", search);


