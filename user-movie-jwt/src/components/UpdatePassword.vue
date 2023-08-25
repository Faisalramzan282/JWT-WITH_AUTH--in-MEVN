<template>
    <div class="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div class="bg-white rounded p-8 shadow-lg w-1/2 ">
        
        <h2 class="text-lg font-semibold mb-4">Update Profile</h2>
        <div class="mb-4">
          <label class="block text-left text-gray-700 font-bold mb-2">Previous Email</label>
          <input type="text" v-model="updation.email" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
        </div>
        <div>
          <label class="block text-left text-gray-700 font-bold mb-2">Update Username</label>
          <input type="text" v-model="updation.username" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
        </div>
        <div>
          <label class="block text-left text-gray-700 font-bold mb-2">New Password</label>
          <input type="password" v-model="updation.newPassword" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
        </div>
        <div>
          <label class="block text-left text-gray-700 font-bold mb-2">Choose Image</label>
          <input type="file" accept="image/*" @change="handleImageChange" />
        </div>
        <div class="flex justify-end mt-4">
      <button @click="updatePass" class="mr-2 bg-blue-500 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-4 rounded">
        Update
      </button>
      <button @click="close" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
        Close
      </button>
      </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  export default {
    props: ['show'],
    data() {
      return {
        updation:{
        email: '',
        username: '',
        newPassword: ''
        }
      };
    },
    methods: {
      ...mapActions({updatepassword: "updatepassword", registerUser:"registerUser"}),
      async updatePass(){
       await this.updatepassword(this.updation);
      
       this.$emit('close');
      },
      close() {
        this.$emit('close');
      },
    }
  };
  </script>
  