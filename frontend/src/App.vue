<script setup>
import {RouterView} from "vue-router";
import {getJwtToken} from "@/utils"; 
import { computed } from 'vue';
import { useRouter } from 'vue-router';


const isLoggedIn = computed(() => !!getJwtToken());
const router = useRouter();



const logout = () => {
  sessionStorage.removeItem('jwt');
  isLoggedIn.value = false;
  router.push('/login');
};
</script>

<template>
  <main>
    <div class="links">
      <a href="/">Home</a>
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