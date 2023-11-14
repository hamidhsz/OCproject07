import Api from './Api';

export default {
  getPosts() {
    return Api().get('posts');
  },
  submitPost(postData) {
    return Api().post('posts', postData);
  },
  // ... updatePost and deletePost methods
};