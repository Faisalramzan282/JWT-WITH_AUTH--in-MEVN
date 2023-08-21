<template>
      <div>
          <input type="text" v-model="form.username"  placeholder="Enter username">
          <input type="email" v-model="form.email" placeholder="Enter Email">
          <input type="password" v-model="form.password" placeholder="Enter Password">
          <button @click="SaveData">Login</button>
      </div>
</template>
<script>
// import { mapActions } from 'vuex';
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
        // ...mapActions({registerUser: 'registerUser'}), 
        SaveData(){
            // console.log("form is==>", this.form);
            // this.registerUser(this.form);
        }
    }
}
</script>