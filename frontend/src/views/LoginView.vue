<template>
  <main>
    <div class ='container'>
      <h1>Log in</h1>
      <input type="email" name="email" v-model="email" placeholder="email" />

      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="password"
      />
      <br />
      <div class="error" v-html="error" />
      <br />
      <button @click="login">Login</button>
    </div>
  </main>
</template>

<script>
import { setJwtToken } from "@/utils";
import AuthenticationService from "../services/AuthenticationService";
import store from '../store/index.js'; // Import the store
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
 

  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });

        
        const jwtToken = response.data.token;
        
        setJwtToken(jwtToken);
        store.setIsLoggedIn(true); // Update the state
        this.$router.push('/userprofile')

      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 40px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

h1 {
  color: #333;
}

.error {
  color: red;
}

input {
  margin: 10px 0;
  padding: 10px;
  width: 50%; /* Set the input width to 50% */
  display: block; /* Make the input a block element */
  margin: 0 auto; /* Center the input horizontally */
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[name="password"] {
  margin-top: 10px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block; /* Make the button a block element */
  margin: 0 auto; /* Center the button horizontally */
}

button:hover {
  background-color: #0056b3;
}
</style>