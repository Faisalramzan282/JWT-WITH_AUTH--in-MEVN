<template>
  <div class="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-40 ">
    <div class="bg-gray-500 rounded p-8 shadow-lg w-full ">
      <!-- For No carts case -->
      <p v-show="userCart.length == 2">No carts available</p>
      <div v-show="userCart.length != 2">
        <div class="flex justify-around">
          <p>MovieName</p>
          <p>Moviedate</p>
          <p>Tickets</p>
          <p>Price</p>
        </div>
        <div class="flex justify-around" v-for="items in JSON.parse(userCart)" :key="items._id">
          <p>{{ items.movieName }}</p>
          <p>{{ formatDate(items.releaseDate) }}</p>
          <p>{{ items.userTickets }}</p>
          <span @click="cartMinusEve(items)"> <font-awesome-icon icon="minus" :class="['fa-solid', 'fa-lg',]" /></span>
          <p>{{ items.totalCartPrice }}</p>
        </div>
        <div>
          <button @click="orderBtn">Order Now</button>
        </div>
      </div>

      <div>
        <button class="bg-white-500 p-4 rounded" @click="closePopUp">Close</button>
      </div>
    </div>

  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
//for minus icon 
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
library.add(faMinus);
export default {
  name: "cartItemPopUp",
  components: {
    FontAwesomeIcon,
  },
  computed: {
    ...mapState('userCartMod', ['userCart']),
  },
  methods: {
    //for date formate 
    ...mapActions({ removeUserCart: "userCartMod/removeUserCart" }),
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    orderBtn() {
      this.$router.push('/user/order');
    },
    closePopUp() {
      this.$emit('close')
    },
    async cartMinusEve(payload) {
      await this.removeUserCart(payload);
    },
  },
  created() {
    if (!localStorage.getItem('cartItems')) {
      localStorage.setItem('cartItems', JSON.stringify([]))
    }
  },
}
</script> 