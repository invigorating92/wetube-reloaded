import express from "express";
import {
  getEdit,
  postEdit,
  seeVideo,
  deleteVideo,
  getUpload,
  postUpload,
} from "../controllers/videoController";

export const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", seeVideo);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.get("/upload", getUpload);
videoRouter.post("/upload", postUpload);
