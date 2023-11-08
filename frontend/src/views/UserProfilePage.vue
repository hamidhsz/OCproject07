<template>
    <div>
      <h1>User Profile</h1>
      <div v-if="user">
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  
  export default {
    data() {
      return {
        user: null,
      };
    },
    async created() {
      const userId = localStorage.getItem('user');
      if (userId) {
        const response = await axios.get(`/users/${userId}`);
        this.user = response.data;
      }
    },
    
  };
  </script>
  
  <style scoped>
  

  </style>