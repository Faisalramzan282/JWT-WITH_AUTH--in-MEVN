<template>
  <div>
    <div class="bg-slate-950 text-white p-3 m-2">
      <button @click="cartItembtnPopUp = true">Cart</button>
      <cartItempopUp v-show="cartItembtnPopUp" @close="cartItembtnPopUp=false"
      />
    </div>
    <div class="container mx-cartItemauto p-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <!-- listing the movies -->
        <div v-for="movie in fetchMovies" :key="movie._id" class=" mx-auto bg-white rounded shadow p-6">
          <img src="../assets/moviesImg.jpg" alt="movie-Image">
          <h2 class="text-xl font-semibold">Movie Name: {{ movie.movieName }}</h2>
          <p class="text-gray-600">Release Date: {{ formatDate(movie.releaseDate) }}</p>
          <p>Available tickets: {{ movie.tickets }}</p>
          <p>Price : {{ movie.moviePrice }}</p>
          <!-- Buttons Wrapper -->
          <div class="flex flex-col">
            <button @click="cartBtn(movie)" class="bg-slate-950	p-3 text-white">Add To Cart</button>
            <AddToCartPopup v-show="addCartPopUp" :movieDetail="selectedMovie" @close="closePopup"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddToCartPopup from './AddToCartPopUp.vue';
import cartItempopUp from './CartItemPopUp.vue'
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "UserHomePage",
  components: {
    AddToCartPopup,
    cartItempopUp
  },
  data() {
    return {
      addCartPopUp: false,
      selectedMovie: null,
      cartItembtnPopUp: false,
    }
  },
  computed: {
    ...mapGetters({ fetchMovies: "movies/getMovies_Data" }),
},
  methods: {
    ...mapActions({ getMovies: "movies/getMovies" }),
    closePopup() {
      this.addCartPopUp = false;
    },
    cartBtn(movie) 
    { 
      movie = {
        ...movie,
      }
      this.selectedMovie = movie;
      this.addCartPopUp = true;
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
  created() {
    this.getMovies();
   
  },
}
</script>