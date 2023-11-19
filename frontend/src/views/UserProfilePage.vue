<template>
  <div>
    <h1>User Profile</h1>
    <div v-if="user">
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>
    <button @click="logout">Logout</button>

    <!-- Blog Post Form -->
    <div class="blog-post-form">
      <h2>Post a Blog</h2>
      <form @submit.prevent="submitPost" enctype="multipart/form-data">
        <label for="title">Title:</label>
        <input id="title" v-model="postTitle" type="text" required />
        <input type="file" @change="uploadFile" ref="file" />
        <label for="content">Content:</label>
        <textarea id="content" v-model="postContent" required></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getJwtToken } from "@/utils";

export default {
  data() {
    return {
      user: null,
      postTitle: "",
      postContent: "",
      image: null,
    };
  },
  async created() {
    const userId = localStorage.getItem("user");
    if (userId) {
      const response = await axios.get(`/users/${userId}`);
      this.user = response.data;
    }
  },
  methods: {
    uploadFile(event) {
      this.image = event.target.files[0];
    },
    async submitPost() {
      const jwtToken = getJwtToken();
      let formData = new FormData();
      formData.append('title', this.postTitle);
      formData.append('content', this.postContent);
      if (this.image) {
        formData.append('image', this.image);
      }
      formData.append('jwtToken', jwtToken);

      await axios.post("http://localhost:8081/posts", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      this.postTitle = "";
      this.postContent = "";
      this.image = null;
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
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.blog-post-form button:hover {
  background-color: #0056b3;
}
</style>
