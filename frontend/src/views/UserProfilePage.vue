<template>
    <div>
      <h1>User Profile</h1>
      <div v-if="user">
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>
      <button @click="logout">Logout</button>

      <!-- Blog Post Form -->
    <div class = 'blog-post-form'>
      <h2>Post a Blog</h2>
      <form @submit.prevent="submitPost">
        <label for="title">Title:</label>
      <input id="title" v-model="postTitle" type="text" required>

       <label for="content">Content:</label>
        <textarea id="content" v-model="postContent" required></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>

    </div>
  </template>
  
  <script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null,
      postTitle: '',
      postContent: '',
    };
  },
  async created() {
    const userId = localStorage.getItem('user');
    if (userId) {
      const response = await axios.get(`/users/${userId}`);
      this.user = response.data;
    }
  },
  methods: {
    async submitPost() {
      await axios.post('/posts', { title: this.postTitle, content: this.postContent });
      this.postTitle = '';
      this.postContent = '';
    },
  },
};
</script>
  
  
<style scoped>
.blog-post-form {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.blog-post-form h2 {
  text-align: center;
}

.blog-post-form form {
  display: flex;
  flex-direction: column;
}

.blog-post-form label {
  margin-top: 10px;
}

.blog-post-form input,
.blog-post-form textarea {
  margin-top: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.blog-post-form button {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
}

.blog-post-form button:hover {
  background-color: #0056b3;
}
</style>