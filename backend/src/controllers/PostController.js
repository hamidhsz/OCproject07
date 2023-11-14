const { Post } = require('../models'); 

module.exports = {
  // Create a new post
  async create(req, res) {
    try {
      const post = await Post.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.user.id 
      });
      res.status(201).send(post);
    } catch (error) {
      res.status(400).send({
        error: 'An error has occurred trying to create the post.'
      });
    }
  },

  // Retrieve all posts
  async list(req, res) {
    try {
      const posts = await Post.findAll();
      res.send(posts);
    } catch (error) {
      res.status(500).send({
        error: 'An error has occurred trying to fetch the posts.'
      });
    }
  },

  // Update a post
  async update(req, res) {
    try {
      const post = await Post.findByPk(req.params.postId);
      if (!post) {
        return res.status(404).send({
          error: 'The post you are trying to update does not exist.'
        });
      }

      await post.update(req.body);
      res.send(post);
    } catch (error) {
      res.status(400).send({
        error: 'An error has occurred trying to update the post.'
      });
    }
  },

  // Delete a post
  async delete(req, res) {
    try {
      const post = await Post.findByPk(req.params.postId);
      if (!post) {
        return res.status(404).send({
          error: 'The post you are trying to delete does not exist.'
        });
      }

      await post.destroy();
      res.send(post);
    } catch (error) {
      res.status(500).send({
        error: 'An error has occurred trying to delete the post.'
      });
    }
  }
};