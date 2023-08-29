<template>
  <div>
    <nav class="bg-slate-950 text-white">
      Favourite cart
    </nav>
    <div class="container mx-auto p-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        <!-- listing the movies -->
        <div v-for="movie in fetchMovies" :key="movie._id" class="max-w-sm mx-auto bg-white rounded shadow p-6">
          <img src="../assets/moviesImg.jpg" alt="movie-Image">
          <h2 class="text-xl font-semibold">Movie Name: {{ movie.movieName }}</h2>
          <p class="text-gray-600">Release Date: {{ movie.releaseDate }}</p>
          <p>Available tickets: {{ movie.tickets }}</p>
          <!-- Buttons Wrapper -->
          <div class="flex flex-col">
            <!-- <button class="bg-slate-950	p-3 text-white mb-3 ">Add to cart</button> -->
           <button @click="tickets(movie)"  class="bg-slate-950	p-3 text-white">Buy Tickets</button>
           <TicketsPopUp  v-show="buyTicketsPopUp" :movieDetail="selectedMovie" @close="closePopup"/>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import TicketsPopUp from './BuyTicketsPopUp.vue'
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "UserHomePage",
  components:{
    TicketsPopUp

  },
  data(){
    return {
      buyTicketsPopUp: false,
      selectedMovie : null,
      // checkobj:{
      //   name: "fisal",
      //   age: 12
      // }
    }
  },
  computed: {
    ...mapGetters({ fetchMovies: "getMovies_Data" }),
  },
  methods: {
    ...mapActions({ getMovies: "getMovies" }),
    closePopup() {
      this.buyTicketsPopUp = false;
       },
    tickets(movie)
    {
      this.selectedMovie = movie
      // console.log("Movie Detail is ===>",this.selectedMovie);
      this.buyTicketsPopUp = true ;
    
    }
  },
  created() {
    this.getMovies();
  }
}
</script>