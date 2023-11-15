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
import PostService from '@/services/PostService'; // Import PostService

export default {
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    const response = await PostService.getPosts(); // Use PostService to get posts
    this.posts = response.data;
  },
};
</script>