<template>
  <main>
    <h1>Posts</h1>
    <div v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    const response = await axios.get('/posts');
    this.posts = response.data;
  },
};
</script>