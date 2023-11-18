<template>
  <main>
    <h1>Posts</h1>
    <div v-for="post in posts" :key="post.id" class="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
      <div class="actions">
        <button @click="likePost(post.id)">Like</button>
        <button @click="dislikePost(post.id)">Dislike</button>
      </div>
    </div>
  </main>
</template>

<script>
import PostService from "@/services/PostService";
import { getJwtToken } from "@/utils";

export default {
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    const response = await PostService.getPosts();
    this.posts = response.data;
  },
  methods: {
    async likePost(id) {
      const jwtToken = getJwtToken();
      await PostService.likePost({ id, jwtToken });
      // Refresh posts or update the specific post
    },
    async dislikePost(id) {
      const jwtToken = getJwtToken();
      await PostService.dislikePost({ id, jwtToken });
      // Refresh posts or update the specific post
    },
  },
};
</script>

<style scoped>
.post {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.actions {
  margin-top: 10px;
}
</style>
