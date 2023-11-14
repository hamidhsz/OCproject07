const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const PostController = require('./controllers/PostController'); 

module.exports = (app) => {
    app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register);
    app.post('/login', AuthenticationController.login);

    // Post routes
    app.post('/posts', PostController.create); // Create a new post
    app.get('/posts', PostController.list); // Get all posts
    app.get('/posts/:id', PostController.show); // Get a single post by id
    app.put('/posts/:id', PostController.update); // Update a post by id
    app.delete('/posts/:id', PostController.delete); // Delete a post by id
};