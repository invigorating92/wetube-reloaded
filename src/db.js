import  mongoose from "mongoose";
//express import 방식으로 함.
//server.js에서 파일 자체를 import 함 -> 자바스크립트에서 자동 실행 될걸??!

mongoose.connect("mongodb://127.0.0.1:27017/wetube", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true, 
 }); 
/*위 ()안 코드 참고
("cmd에서 mongo쳐서 나온 주소 + /저장할 db이름 설정", { terminal에 경고 문구에서 넣으라는 코드 } )*/
const db = mongoose.connection;
//변수지정 안하고 써도 됨. mongoose.connection.on() 식으로.

const handleError =(error)=> console.log("DB error", error);
const handleOpen =()=> console.log("Connected to DB");
db.on("error", handleError);
//error 뜰 때마다 계속 실행됨
db.once("open", handleOpen);
//처음 한번만 실행됨