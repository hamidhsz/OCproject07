const { Post } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const multer = require('../middleware/multer')
module.exports = {
  // Create a new post
  async create(req, res) {
    // console.log(req);
    try {
      const { jwtToken } = req.body;
      console.log("jwtToken: ", jwtToken);
      const { id } = jwt.verify(jwtToken, config.jwt.secret);
      console.log("user: ", id);

      // Extract the image URL from the file uploaded via multer
      let imageUrl = null;
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      }

      const post = await Post.create({
        title: req.body.title,
        content: req.body.content,
        userId: id,
        imageUrl: imageUrl
      });
      res.status(201).send(post);
    } catch (error) {
      console.warn(error);
      res.status(400).send({
        error: "An error has occurred trying to create the post.",
      });
    }
  },

  // Like or dislike a post
  async likePost(req, res) {
    try {
      const { jwtToken } = req.body;
      console.log("jwtToken: ", jwtToken);
      const { id } = jwt.verify(jwtToken, config.jwt.secret);
      console.log("user: ", id);
      const post = await Post.findByPk(req.params.id);

      if (Number(req.body.like) === 1) {
        // Add a like
        // Post.updateOne(
        //   { _id: req.params.id },
        //   { $inc: { likes: req.body.like++ }, $push: { usersLiked: id } }
        // ).then(() => res.status(200).json({ message: "Like added!" }));
        post.likes++;
        const likedArray = JSON.parse(post.getDataValue("usersLiked"));
        if (Array.isArray(likedArray) && !likedArray.includes(id)) {
          post.setDataValue("usersLiked", JSON.stringify([...likedArray, id]));
        }
        if (!Array.isArray(likedArray)) {
          post.setDataValue("usersLiked", JSON.stringify([id]));
        }
        await post.save();
        res.status(200).json({ message: "Like added!", post });
      } else {
        // Add a dislike
        post.likes--;
        const likedArray = JSON.parse(post.getDataValue("usersLiked"));
        if (Array.isArray(likedArray) && likedArray.includes(id)) {
          post.setDataValue(
            "usersLiked",
            JSON.stringify(likedArray.filter((idLiked) => idLiked !== id))
          );
        }
        if (!Array.isArray(likedArray)) {
          post.setDataValue("usersLiked", JSON.stringify([]));
        }
        await post.save();
        res.status(200).json({ message: "Dislike added!", post });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Retrieve all posts

  async list(req, res) {
    try {
      const posts = await Post.findAll();
      res.send(posts);
    } catch (error) {
      res.status(500).send({
        error: "An error has occurred trying to fetch the posts.",
      });
    }
  },

  // Retrieve a single post by id
  async show(req, res) {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        return res.status(404).send({
          error: "The post you are trying to show does not exist.",
        });
      }
      res.send(post);
    } catch (error) {
      res.status(500).send({
        error: "An error has occurred trying to show the post.",
      });
    }
  },

  // Update a post
  async update(req, res) {
    try {
      const post = await Post.findByPk(req.params.postId);
      if (!post) {
        return res.status(404).send({
          error: "The post you are trying to update does not exist.",
        });
      }

      await post.update(req.body);
      res.send(post);
    } catch (error) {
      res.status(400).send({
        error: "An error has occurred trying to update the post.",
      });
    }
  },

  // Delete a post
  async delete(req, res) {
    try {
      const post = await Post.findByPk(req.params.postId);
      if (!post) {
        return res.status(404).send({
          error: "The post you are trying to delete does not exist.",
        });
      }

      await post.destroy();
      res.send(post);
    } catch (error) {
      res.status(500).send({
        error: "An error has occurred trying to delete the post.",
      });
    }
  },
};
