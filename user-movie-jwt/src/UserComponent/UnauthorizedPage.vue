<template>
    <div class="flex items-center justify-center h-screen">
      <div class="bg-white rounded-lg p-8 shadow-md">
        <h1 class="text-2xl font-semibold mb-4">Unauthorized Access</h1>
        <p class="text-gray-600 mb-4">You do not have permission to access this page.</p>
        <router-link to="/login" class="text-blue-500 hover:underline">Go to Login</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "UnauthorizedPage"
  };
  </script>