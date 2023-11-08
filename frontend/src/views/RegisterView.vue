<template>
<main>
<div>
<h1> Register </h1>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex illum quia quasi quibusdam consectetur doloremque ab fuga iste consequatur excepturi aliquid corporis provident, culpa cumque, animi deserunt optio aperiam autem!</p>

<form autocomplete="off">


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
            email: '',
            password: '',
            error: null
        }
    },


methods: {
    async register(){
        try{
        await AuthenticationService.register({
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

