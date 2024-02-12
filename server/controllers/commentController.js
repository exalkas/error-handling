import Post from "../models/Post.js";

export const addComment = async (req, res) => {
  try {
    console.log("add comment here", req.body);
    const { postID, userID, comment } = req.body;

    // Add comment to database
    const post = await Post.findByIdAndUpdate(
      postID,
      {
        // req.body.postID
        $push: {
          comments: {
            // adds an item to the end of the array
            text: comment, // req.body.comment,
            commenter: userID,
          },
        },
      },
      { new: true } // !IMPORTANT! show the UPDATED DOCUMENT.
    ).populate("comments.commenter", "username");
    console.log("🚀 ~ post:", post);

    res.send({ success: true, post });
  } catch (error) {
    console.log("🚀 ~ error in add comment:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    console.log("delete comment here", req.body);

    const post = await Post.findByIdAndUpdate(
      req.body.postID,
      {
        $pull: {
          comments: {
            _id: req.body.commentID,
          },
        },
      },
      { new: true }
    ).populate("comments.commenter", "username");
    console.log("🚀 ~ post:", post);

    res.send({ success: true, post });
  } catch (error) {
    console.log("🚀 ~ error in delete comment:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
