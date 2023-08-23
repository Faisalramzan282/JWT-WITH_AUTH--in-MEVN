<template>
      <div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
    <h1 class="text-2xl font-semibold mb-4">Login Form</h1>
    <div class="mb-4">
      <input type="text" v-model="form.username" class="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400" placeholder="Enter username">
    </div>
    <div class="mb-4">
      <input type="email" v-model="form.email" class="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400" placeholder="Enter Email">
    </div>
    <div class="mb-4">
      <input type="password" v-model="form.password" class="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400" placeholder="Enter Password">
    </div>
    <button @click="SaveData" class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
    <button @click="GosignUp" class="w-full bg-blue-500 mt-4 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Register</button>

  </div>
</div>

</template>
<script>
import { mapActions } from 'vuex';
export default {
    name: "LoginPage",
    data(){
        return{
            form:{
                username: '',
                email: '',
                password: ''
            }
        }
    },
    methods:{
        ...mapActions({authenticateUser: 'authenticateUser'}), 
        async SaveData(){
            // console.log("form is==>", this.form);
          await  this.authenticateUser(this.form);
        
            this.$router.push('/movies');
        }, 
        GosignUp(){
            this.$router.push('/');
        }
    }
}
</script>