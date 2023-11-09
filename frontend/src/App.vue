<script setup>
import {RouterView} from "vue-router";
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import store from './store/index.js'; // Import the store

const isLoggedIn = computed(() => store.isLoggedIn); // Use the state from the store
const router = useRouter();



const logout = () => {
  sessionStorage.removeItem('jwt');
  store.setIsLoggedIn(false); // Update the state
  router.push('/login');
};
</script>

<template>
  <main>
    <div class="links">
      <a href="/" v-if="isLoggedIn">Home</a>
      <a href="/login" v-if="!isLoggedIn">Log In</a>
      <a href="/register" v-if="!isLoggedIn">Register</a>
      <a href="#" @click="logout" v-if="isLoggedIn">Log Out</a>
    </div>
    <RouterView />
  </main>
</template>

<style scoped>
.links {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  color: #fff;
  padding: 10px;
}

.links a {
  text-decoration: none;
  color: #fff;
  margin: 0 10px;
}

.links a:hover {
  text-decoration: underline;
}
</style>