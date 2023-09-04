<template>
  <div class="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
    <div class="bg-white rounded p-8 shadow-lg w-1/2">
      <h2 class="text-lg font-semibold mb-4">Update Your Movie</h2>
      <div class="mb-4">
        <label class="block text-left text-gray-700 font-bold mb-2">Movie Name</label>
        <input type="text" v-model="updation.movieName"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />
      </div>
      <div>
        <label class="block text-left text-gray-700 font-bold mb-2">Movie Date</label>
        <input type="date" v-model="updation.releaseDate"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />
      </div>
      <div class="flex justify-end mt-4">
        <button @click="updateMovie(movie)"
          class="mr-2 bg-blue-500 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-4 rounded">
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
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["movieDetail"],
  data() {
    return {
      updation: {
        movieName: "",
        releaseDate: "",
      },
    };
  },
  computed: {
    ...mapGetters({ fetchMovies: "movies/getMovies_Data" }),
  },
  methods: {
    ...mapActions({ update: "movies/moviesUpdation" }),
    close() {
      this.$emit("close");
    },
    async updateMovie() {
      const payload = {
        id: this.movieDetail._id,  //id from props
        ...this.updation         //data of upation movie name and date
      }
      await this.update(payload);
      this.close();
    }
  },
};
</script>
