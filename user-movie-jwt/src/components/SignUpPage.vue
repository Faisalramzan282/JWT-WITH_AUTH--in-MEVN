<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h1 class="text-2xl font-semibold mb-4">Sign Up</h1>
      <div class="mb-4">
        <input type="text" v-model="form.username"
          class="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400" placeholder="Enter username" />
      </div>
      <div class="mb-4">
        <input type="email" v-model="form.email"
          class="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400" placeholder="Enter Email" />
      </div>
      <div class="mb-4">
        <input type="password" v-model="form.password"
          class="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400" placeholder="Enter Password" />
      </div>
      <div class="mb-4">
        <label class="block text-left text-gray-700 font-bold mb-2">Profile</label>
        <input type="file" accept="image/*" class="p-2 rounded-md" @change="handleProfileImage" />
      </div>
      <button @click="SaveData"
        class="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
        Sign Up
      </button>
      <div class="mt-6">
        <p>
          Already Existed Account?
          <span class="hover:bg-gray-300 py-2 px-4 rounded cursor-pointer" @click="GoLogin">Login</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        selectedImage: "",
      },
    };
  },
  methods: {
    // ...mapActions({ registerUser: "registerUser" }),
    ...mapActions('user', ['registerUser']),
    async SaveData() {
      await this.registerUser(this.form);
      //for again empty input-fields
      this.form.username = "";
      this.form.email = "";
      this.form.password = "";
      this.form.selectedImage = "";
      this.$router.push({ name: "login" });
    },
    GoLogin() {
      this.$router.push("/login");
    },
    handleProfileImage(event) {
      this.form.selectedImage = event.target.files[0];
    },
  },
};
</script>
