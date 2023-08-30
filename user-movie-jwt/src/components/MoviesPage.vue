<template>
  <div class="bg-gray-100">
  <!-- Navigation Bar -->
  <nav class="bg-blue-500 p-4">
    <div class="container mx-auto flex justify-evenly items-center">
      <button @click="loginpge" class="text-white">Login</button>
      <button @click="isPasswordPopUp = true" class="text-white p-2 rounded-md hover:bg-stone-500 ">Update Profile</button>
      <UpdatePassword  v-show="isPasswordPopUp" @close="isPasswordPopUp = false" />
      <button @click="del_user" class="text-white">Delete User</button>
      <input
        type="text"
        class="w-64 px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
        placeholder="Search movies"
      />
    </div>
  </nav>https://github.com/Faisalramzan282/JWT-Basic-SetUp.git
   <!-- Roles whaether of admin  -->
   <div class="m-5">
      <router-link to="/adminPannel" class="p-4 bg-gray-500	rounded">Update Roles</router-link>
   </div>
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
      <label for="movieTickets" class="block font-semibold mb-2">Total Tickets</label>
      <input
        type="number"
        id="movieTickets"
        v-model="moviesData.tickets"
        required
        class="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
      />
      <label for="moviePrice" class="block font-semibold mb-2">Price</label>
      <input
        type="number"
        id="moviePrice"
        v-model="moviesData.moviePrice"
        required
        class="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
      />
      <button  type="submit" class="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
    </form>
  </div>
  <!-- Movie List -->
  <div class="container mx-auto p-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="movie in fetchMovies"
        :key="movie._id"
        class="max-w-sm mx-auto bg-white rounded shadow p-6"
      >
        <img src="../assets/moviesImg.jpg" alt="movie-Image">
        <h2 class="text-xl font-semibold">Movie Name: {{ movie.movieName }}</h2>
        <p class="text-gray-600">Release Date: {{ formatDate(movie.releaseDate)}}</p>
        <p>Available tickets: {{ movie.tickets }}</p>
        <p>Movie Price: {{ movie.moviePrice }}</p>
        <!-- Buttons Wrapper -->
        <div class="mt-4">
          <button @click="showEditMoviesPopup(movie)" class="p-2 bg-slate-300 text-white rounded-md hover:bg-blue-600 focus:outline-none">Edit</button>
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
     isPasswordPopUp : false,
     isPopupVisible : false,
     selectedMovie: null,  //sending movie detail in pop-up
      moviesData: {
        movieName: "",
        releaseDate: "",
        tickets: null,
        moviePrice: null
      },
    };
  },
  computed: {
    ...mapGetters({fetchMovies: "getMovies_Data"}),
  },
  methods: {
    ...mapActions({ moviesCreation: "moviesCreation", getMovies: "getMovies", deleteMov: "deleteMov", delete_User: "delete_User", role_selection : "role_selection"}),
    async submitForm() {
     const dateFormat = new Date(this.moviesData.releaseDate)
     this.moviesData.releaseDate = dateFormat.toLocaleDateString();
     await this.moviesCreation(this.moviesData);
    this.moviesData.movieName = '';
    this.moviesData.releaseDate = '';
    this.moviesData.tickets = null;
    this.moviesData.moviePrice = null; 
    this.getMovies(); 
    },
    loginpge(){
        this.$router.push('/login');
    }, 
    deleteMovie(movie){
        this.deleteMov(movie)
    },
    //for updation of  profile e.g username and password
    showEditMoviesPopup(movie) {
        this.selectedMovie = movie;
        this.isPopupVisible = true;
      },
      closePopup() {
      this.isPopupVisible = false;
       },
      async del_user(){
        await this.delete_User();
        this.$router.push({name: 'login'});
      }, 
      formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }  
  },
  created() {
    this.getMovies();
  },
};
</script>