const { Post } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
module.exports = {
  // Create a new post
  async create(req, res) {
    // console.log(req);
    try {
      const { jwtToken } = req.body;
      console.log("jwtToken: ", jwtToken);
      const { id } = jwt.verify(jwtToken, config.jwt.secret);
      console.log("user: ", id);

      const post = await Post.create({
        title: req.body.title,
        content: req.body.content,
        userId: id,
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
      const post = await Post.findByPk(req.params.id);
      if (req.body.like === 1) {
        // Add a like
        post.likes++;
        if (!post.usersLiked.includes(req.body.userId)) {
          post.usersLiked.push(req.body.userId);
        }
        await post.save();
        res.status(200).json({ message: 'Like added!' });
      } else if (req.body.like === -1) {
        // Add a dislike
        post.dislikes++;
        if (!post.usersDisliked.includes(req.body.userId)) {
          post.usersDisliked.push(req.body.userId);
        }
        await post.save();
        res.status(200).json({ message: 'Dislike added!' });
      } else {
        // Remove like or dislike
        if (post.usersLiked.includes(req.body.userId)) {
          post.likes--;
          post.usersLiked = post.usersLiked.filter(user => user !== req.body.userId);
        } else if (post.usersDisliked.includes(req.body.userId)) {
          post.dislikes--;
          post.usersDisliked = post.usersDisliked.filter(user => user !== req.body.userId);
        }
        await post.save();
        res.status(200).json({ message: 'Like/Dislike removed!' });
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