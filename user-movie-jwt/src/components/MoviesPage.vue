<template>
  <div>
    <form @submit.prevent="submitForm">
      <label for="movieName">Movie Name:</label>
      <input
        type="text"
        id="movieName"
        v-model="moviesData.movieName"
        required
      />
      <br />

      <label for="releaseDate">Release Date:</label>
      <input
        type="date"
        id="releaseDate"
        v-model="moviesData.releaseDate"
        required
      />
      <br />

      <button type="submit">Submit</button>
    </form>
    <!-- for showing of movies here -->
    <div>
      <ul>
        <li v-for="movie in receivedMovies" :key="movie._id">
          <h2>{{ movie.movieName }}</h2>
          <p>Release Date: {{ movie.releaseDate }}</p>
        </li>
      </ul>
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
    ...mapGetters({ receivedMovies: "getMovies_Data" }),
    submitForm() {
      this.moviesCreation(this.moviesData);
    },
  },
  // created(){
  //     console.log("movies comming", this.receivedMovies());

  // },
  updated() {
    this.getMovies();
    console.log("movies comming", this.receivedMovies());
  },
};
</script>
