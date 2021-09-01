import Video from "../models/Video";

// export const home = (req, res) =>{
//   Video.find({}, (error, videos)=>{
//     console.log("errors", error);
//     console.log("videos", videos);
//     return res.render("home", { pageTitle: "Home", videos: [] })
//     //res.render를 find 콜백함수로 넣어주면 DB를 불러온 뒤에 (DB 로드가 좀 느림)
//     // render를 하기 떄문에 응답(res)에 대한 오류발생 없음.
//   })
// };


export const home = async (req, res) =>{
  const videos = await Video.find({}).sort({createdAt : -1 });
  //model.find() 코드는 애초에 mongoose 코드기 때문에 mongoDB가 로드 될때까지 기다려야(await) 한다.
  //sort에서 1은 오름차순, -1은 내림차순
    return res.render("home", { pageTitle: "Home", videos})   
};
export const seeVideo = async (req, res) => {
  const id = req.params.id;
  const video = await Video.findById(id);
  console.log(video);
  if(video === null){
    return res.render("404",{ pageTitle:"Video not found." });
  } 
  return res.render("watch", { pageTitle: `Watching : ${video.title}`, video });
};
export const getEdit = async (req, res) => {
  const id = req.params.id;
  const video = await Video.findById(id);
  if(video === null){
    return res.status(404).render("404",{ pageTitle:"Video not found." });
  } 
  return res.render("edit", { pageTitle: `Editing : ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  try{
  const id = req.params.id;
  const video =await Video.exists({_id: id});
  // const video = await Video.findById(id);
  // exist 함수를 이용한 코드 표현식. 굳이 써야되나 싶지만..
  if(video === null){
    return res.render("404",{ pageTitle:"Video not found." });
  } 
  const {title, description, hashtags }= req.body;
  // video.title = title;
  // video.description = description;
  // video.hashtags = hashtags.split(",").map((word)=> word.startsWith("#") ? word : `#${word}`);
  // await video.save();
  //이렇게 해도 되지만 mongoose함수 findByIdAndUpdate를 이용하여 더 간단히 작성할 수 있다.
  await Video.findByIdAndUpdate(id,{
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/video/${id}`);
  }catch(error){
    return res.status(400).render(`/video/${id}`,{pageTitle:"Error! Plz Retry"});
  }
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Video Upload" });
};

export const postUpload = async (req, res) => {
  try{
  const { title, description, hashtags } = req.body;
  const video = new Video({
    title,
    description,
    hashtags : Video.formatHashtags(hashtags),
    meta:{
      views: 0,
      rating: 0,
    },
  });
  await video.save();
  // console.log(video);
  return res.redirect("/");
} catch(error){
  console.log(error);
  return res.status(400).render("upload", { pageTitle: "Video Upload",errorMessage:"ERROR are occured on upload process." })
}
};
export const deleteVideo = async (req, res) => {
  const {id} = req.params;
  await Video.findByIdAndDelete(id);
  return res.render("delete", {pageTitle: "Delete Video"})
};
export const search = async (req, res) => {
  console.log(req.query);
  const {searchTitle} = req.query;
  let videos=[];
  //아래에 변수 재할당 때문에 let 변수를 사용
  if(searchTitle){
    videos = await Video.find({
      title : {
        $regex: new RegExp(searchTitle, "i"),
      }
    
    });
    }
    //굳이 if가 아니어도 잘 작동함. if를 쓴 이유는 뭘까
  return res.render("search", {pageTitle:"Search", videos});
}
