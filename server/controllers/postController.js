import Post from "../models/Post.js";

export const addPost = async (req, res) => {
  try {
    console.log("add post here", req.body);
    console.log("file is", req.file);

    if (req.file) req.body.image = req.file.path;

    const newPost = await Post.create(req.body);
    console.log("🚀 ~ newPost:", newPost);

    res.send({ success: true, post: newPost });
  } catch (error) {
    console.log("🚀 ~ error in add post:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    console.log("getAll here");

    // Populate(the_field_that_is_connected_to_the_other_collection, field_selection)
    const posts = await Post.find()
      .populate("author", "username")
      .populate("comments.commenter", "username");
    res.send({ success: true, posts });
  } catch (error) {
    console.log("🚀 ~ error in getAll:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const handleLike = async (req, res) => {
  try {
    console.log("handleLike here", req.body);

    // const post = await Post.findOne({_id: req.body.postID})

    const post = await Post.findOne({
      _id: req.body.postID,
      likes: req.body.userID,
    });
    console.log("🚀 ~ post:", post);

    let likedPost = {};

    if (!post) {
      console.log("Post has NOT been liked");

      likedPost = await Post.findByIdAndUpdate(
        req.body.postID,
        {
          $addToSet: { likes: req.body.userID }, // adds item to array in mongoose IF IT DOESN'T EXIST IN THE ARRAY ALREADY
        },
        { new: true }
      );
      console.log("🚀 ~ likedPost:", likedPost);
    } else {
      console.log("Post has been liked");
      likedPost = await Post.findByIdAndUpdate(
        req.body.postID,
        {
          $pull: { likes: req.body.userID }, // remove item from array in mongoose
        },
        { new: true }
      );
      console.log("🚀 ~ likedPost:", likedPost);
    }

    res.send({ success: true, post: likedPost });
  } catch (error) {
    console.log("🚀 ~ error in handleLike:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
