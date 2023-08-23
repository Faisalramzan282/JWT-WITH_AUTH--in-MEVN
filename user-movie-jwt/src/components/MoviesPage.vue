<template>
  <div class="min-h-screen bg-gray-100">
  <!-- Navigation Bar -->
  <nav class="bg-blue-500 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <button @click="loginpge" class="text-white">Login</button>
      <input
        type="text"
        class="w-64 px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
        placeholder="Search movies"
      />
    </div>
  </nav>

  <!-- Movie Form -->
  <div class="container mx-auto p-8">
    <form @submit.prevent="submitForm" class="max-w-md mx-auto bg-white rounded shadow p-6">
      <label for="movieName" class="block font-semibold mb-2">Movie Name:</label>
      <input
        type="text"
        id="movieName"
        v-model="moviesData.movieName"
        required
        class="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
      />
      <br />

      <label for="releaseDate" class="block font-semibold mb-2 mt-4">Release Date:</label>
      <input
        type="date"
        id="releaseDate"
        v-model="moviesData.releaseDate"
        required
        class="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
      />
      <br />

      <button type="submit" class="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
    </form>
  </div>
   <p>{{ fetchMovies }}</p>
  <!-- Movie List -->
  <div class="container mx-auto p-8">
    <div class="max-w-md mx-auto bg-white rounded shadow p-6">
      <ul>
        <li v-for="movie in receivedMovies" :key="movie._id">
          <h2 class="text-xl font-semibold">Movie{{ movie.movieName }}</h2>
          <p class="text-gray-600">Release Date: {{ movie.releaseDate }}</p>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MoviesPage",
  data() {
    return {
      moviesData: {
        movieName: "",
        releaseDate: "",
      },
    };
  },
  methods: {
    ...mapActions({ moviesCreation: "moviesCreation", getMovies: "getMovies" }),
    //for getting the movies of all lists
    submitForm() {
      this.moviesCreation(this.moviesData);
    },
    loginpge(){
        this.$router.push('/login');
    }
  },
  computed: {
    ...mapGetters({fetchMovies: "getMovies_Data"}),
  },
  created() {
    this.getMovies();
    console.log("movies comming", this.getMovies);
  },
};
</script>
