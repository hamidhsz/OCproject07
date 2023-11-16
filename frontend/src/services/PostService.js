import Api from './Api';

export default {
  getPosts() {
    return Api().get('posts');
  },
  submitPost(postData) {
    return Api().post('https://localhost:8081/posts', postData);
  },
  likePost(id) {
    return Api().post(`posts/${id}/like`, { like: 1 });
  },
  dislikePost(id) {
    return Api().post(`posts/${id}/like`, { like: -1 });
  },
};