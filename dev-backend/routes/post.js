const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../model/Post");
const Profile = require("../model/Profile");

// @route GET /api/post
// @desc get all posts
// @access PRIVATE
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.find()
      .sort({ date: "descending" })
      .exec((err, docs) => {
        if (err) {
          console.log("1");
          console.log(err);
        } else {
          console.log(docs);
          res.json(docs);
          console.log("2");
        }
      });
    // Post.find({}).then((posts) => {
    //   res.json(posts);
    // });
  }
);

//     then((posts) => {
//       console.log(posts);
//       res.json(posts);
//     });
//   }
// );

// @route POST /api/post
// @desc Create a new post
// @access PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);
    console.log(req.user);
    const newPost = Post({
      user: req.user.id,
      text: req.body.text,
      name: req.body.name,
    });
    newPost.save().then((post) => {
      res.json(post);
    });
  }
);

// @route DELETE /api/post
// @desc delete a post
// @access PRIVATE
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const post_id = req.params.post_id;
    Post.findByIdAndRemove(post_id).then((post) => {
      if (!post) {
        return res.status(404).json({ nopost: "no post found" });
      }
      console.log(post);
      res.json(post);
    });
  }
);

// @route GET /api/post/likes
// @desc Like or Dislike a post
// @access PRIVATE
router.get(
  "/likes/:user_id/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const user_id = req.params.user_id;
    console.log(user_id);
    console.log("121423");
    const post_id = req.params.post_id;
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (!profile) {
        return res
          .status(404)
          .json({ noprofile: "no profile found for the user" });
      }
      Post.findOne({ _id: post_id }).then((post) => {
        console.log(post.likes);
        const removeIndex = post.likes.findIndex(
          (element) => element._id.toString() === user_id
        );
        console.log(removeIndex);
        if (removeIndex >= 0) {
          post.likes.splice(removeIndex, 1);
          post.save().then(() => {
            return res.json({ message: "post is unliked" });
          });
        } else {
          post.likes.unshift(user_id);
          post.save().then(() => {
            res.json("Liked post");
          });
        }
      });
    });
  }
);

module.exports = router;
