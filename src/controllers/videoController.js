const videos = [
  {
    title: "First Video",
    rating: 3,
    comments: 2,
    createdAt: "2 Minutes ago",
    views: 1,
    id: 1,
  },

  {
    title: "Second Video",
    rating: 4,
    comments: 2,
    createdAt: "10 Minutes ago",
    views: 110,
    id: 2,
  },

  {
    title: "Third Video",
    rating: 2,
    comments: 2,
    createdAt: "19 Minutes ago",
    views: 20,
    id: 3,
  },
];
const fakeUser = { username: "khw", loggedIn: false };
export const home = (req, res) =>
  res.render("home", { pageTitle: "Home", videos, fakeUser });
export const seeVideo = (req, res) => {
  const id = req.params.id;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};
export const getEdit = (req, res) => {
  const id = req.params.id;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing : ${video.title}`, video });
};
export const postEdit = (req, res) => {
  const id = req.params.id;
  const title = req.body.potato;
  console.log(req.body);
  videos[id - 1].title = title;
  return res.redirect(`/video/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Video Upload" });
};

export const postUpload = (req, res) => {
  const { title } = req.body;
  const newVideo = {
    title: title,
    rating: 0,
    comments: 0,
    createdAt: "Just Now",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
export const deleteVideo = (req, res) => res.send("Video Delete");
export const search = (req, res) => res.send("Video Search");
