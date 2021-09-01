//server.js엔 서버 관련된 것만 남도록 init.js를 따로 만듦
//model/blahblah 관련된 것들은 init.js에 import할 것
import "./db";
/*db를 처음에 import 해도 terminal 창을 보면 제일 늦게 console.log가 뜸.
느리기 떄문에 제일 마지막에 로드된다.*/
import {app} from "./server";
import "./models/Video";
import "./models/User";

const PORT = 4000;

console.log("how are you Thank you");

const handleListening = () =>
  console.log(`안녕디지몬 http://localhost:${PORT}`);

app.listen(PORT, handleListening);