<template>
  <div class="min-h-screen bg-gray-100">
  <!-- Navigation Bar -->
  <nav class="bg-blue-500 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <button @click="loginpge" class="text-white">Login</button>
      <button @click="showPopup" class="text-white p-2 rounded-md hover:bg-stone-500 ">Update Password</button>
      <UpdatePassword  v-if="isPopupVisible" @close="closePopup" />
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

      <button  type="submit" class="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
    </form>
  </div>
   <!-- <p>{{ fetchMovies }}</p> -->
  <!-- Movie List -->
  <div class="container mx-auto p-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
     
        <!-- listing the movies -->
        <div
        v-for="movie in fetchMovies"
        :key="movie._id"
        class="max-w-sm mx-auto bg-white rounded shadow p-6"
      >
        <img src="../assets/moviesImg.jpg" alt="movie-Image">
        <h2 class="text-xl font-semibold">Movie Name: {{ movie.movieName }}</h2>
        <p class="text-gray-600">Release Date: {{ movie.releaseDate }}</p>
        
        
        <!-- Buttons Wrapper -->
        <div class="mt-4">
          <button @click="showPopup(movie)" class="p-2 bg-slate-300 text-white rounded-md hover:bg-blue-600 focus:outline-none">Edit</button>
           <!-- Edit Button PopUp -->
        <EditMoviesPopUp  v-if="isPopupVisible" :movieDetail = 'selectedMovie' @close="closePopup" />
        <button @click="deleteMovie(movie)" class="p-2 bg-slate-300 text-white rounded-md bg-red-400 focus:outline-none">Delete</button>
        </div>
    </div>
      
    </div>
  </div>
 

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EditMoviesPopUp from './EditMoviesPopUp.vue';
import UpdatePassword from './UpdatePassword.vue';


export default {
  name: "MoviesPage",
  components:{
    UpdatePassword,
    EditMoviesPopUp
  },
  data() {
    return {
     isPopupVisible : false,
     selectedMovie: null,  //sending movie detail in pop-up
      moviesData: {
        movieName: "",
        releaseDate: "",
      },
    };
  },
  computed: {
    ...mapGetters({fetchMovies: "getMovies_Data"}),
  },
  methods: {
    ...mapActions({ moviesCreation: "moviesCreation", getMovies: "getMovies", deleteMov: "deleteMov" }),
    //for getting the movies of all lists
    async submitForm() {
      await this.moviesCreation(this.moviesData);
      // Fetch the movies after creation
      this.getMovies(); 
    },
    loginpge(){
        this.$router.push('/login');
    }, 
    deleteMovie(movie){
        // console.log("Movie key is ==>", movie);
        //key for deleting
        this.deleteMov(movie)
    },
    //for updation of password
    showPopup(movie) {
        // console.log("Movies in the page==?", movie)
        this.selectedMovie = movie;
        this.isPopupVisible = true;
      },
      closePopup() {
      this.isPopupVisible = false;
       }
      
  },
  
  created() {
    this.getMovies();
  },
};
</script>
