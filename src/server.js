import express from "express";
import { globalRouter } from "./routers/globalRouter";
import { userRouter } from "./routers/userRouter";
import { videoRouter } from "./routers/videoRouter";
import session from "express-session";
import {localsMiddleware} from "./middlewares";
import MongoStore from "connect-mongo";

export const app = express();


app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));
//urlencoded 코드는 form의 value를 자바스크립트 형식으로 변형시켜줘서 express가 이해할 수 있도록 만들어 줌.
//밑에 라우터들 보다 위에 코드를 작성해준다. 그래야 밑에 라우터들 url주소로 갔을 때 form인식 가능.
app.use(session({
    secret:"Hello",
    resave:false,
    saveUninitialized: false,
    store:MongoStore.create({mongoUrl:"mongodb://127.0.0.1:27017/wetube"}) //세션을 DB에 저장하는 코드. 이 코드가 없으면 세션이 메모리에 저장됨-> 서버 재시작 하면 메모리 날아감
}),
);
//위가 session middleware. 작성하면 express가 브라우저에게 session을 부여한다.

// app.use((req, res,next)=> {
//     req.sessionStore.all((error, sessions)=>{
//         console.log(sessions);
//         next();
//     })
//     });
//세션 정보 확인차 사용하는 middleware↑

app.use(localsMiddleware);
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);