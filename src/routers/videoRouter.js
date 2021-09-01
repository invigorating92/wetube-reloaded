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

videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id([0-9a-f]{24})", seeVideo);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
//url 주소 중복되면 get과 post 위와 같이 한줄쓰기 가능.
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);
