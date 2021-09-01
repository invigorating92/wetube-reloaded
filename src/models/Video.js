import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
   {
        title: {type:String, required:true, trim:true, maxlength:20},
        description:{type: String, required:true, trim:true, maxlength:80},
        createdAt: {type: Date, required:true, default: Date.now},
        hashtags: [{type: String, trim:true}],
        meta: {
            views: {type: Number, dafault:0, required: true},
            rating: {type:Number, default:0, required: true}
        },
        //메타데이터 만들기
    });
//비디오 스키마 작성

//middleware 만들기
// videoSchema.pre('save', async function(){
//     this.hashtags = this.hashtags[0].split(",")
//     .map(word => word.startsWith("#") ? word : `#${word}`);
// });

//static 만들기
videoSchema.static('formatHashtags', function(hashtags){
  return hashtags.split(",").map((word)=> (word.startsWith("#") ? word : `#${word}`));
});

const movieModel = mongoose.model("Video", videoSchema);
export default movieModel;