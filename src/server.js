import express from "express";
import { globalRouter } from "./routers/globalRouter";
import { userRouter } from "./routers/userRouter";
import { videoRouter } from "./routers/videoRouter";

console.log("how are you Thank you");

const PORT = 4000;

const app = express();

const handleListening = () =>
  console.log(`안녕디지몬 http://localhost:${PORT}`);

// const handleHome=()=> console.log("somebody is trying to go home.")

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);
// app.get("/", handleHome);

app.listen(PORT, handleListening);
