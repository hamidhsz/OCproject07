import Api from './Api';

export default {
  getPosts() {
    return Api().get('posts');
  },
  submitPost(postData) {
    return Api().post('https://localhost:8081/posts', postData);
  },
  
};