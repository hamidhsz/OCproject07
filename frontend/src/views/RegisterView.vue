<template>
<main>
<div class="container"> 
<h1> Register </h1>

<form autocomplete="off">
<input
 type = 'text'
 name = 'firstName'
 v-model="firstName"
 placeholder="First Name" />

 <input
 type = 'text'
 name = 'lastName'
 v-model="lastName"
 placeholder="Last Name" />

<input
 type = 'email'
 name = 'email'
 v-model="email"
 placeholder="email" />

 <input
 type = 'password'
 name = 'password'
 autocomplete="off"
 v-model="password"
 placeholder="password" />
 
</form>
<br>
<div class = "error" v-html="error"/>
<br>
 <button 
    @click ="register">
    Register
</button>

</div>

</main>

  
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            error: null
        }
    },


methods: {
    async register(){
        try{
        await AuthenticationService.register({
          firstName: this.firstName,
          lastName: this.lastName,  
          email: this.email,
          password: this.password
        })
        } catch (error) {
            this.error = error.response.data.error
        }
    }
    }
 }
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h1 {
  color: #333;
}

.error {
  color: red;
}

input {
  margin: 10px 0;
  padding:25px;
  width: 80%; 
  display: block; 
  margin: 0 auto; 
  border: 1px solid #ccc;
  border-radius: 5px;
}



input[name="password"],
input[name="firstName"],
input[name="lastName"],
input[name ="email"] {
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
  display: block; 
  margin: 0 auto; 
}

button:hover {
  background-color: #0056b3;
}
</style>

