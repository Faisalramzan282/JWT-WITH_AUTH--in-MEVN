<template>
   <div class="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div class="bg-white rounded p-8 shadow-lg w-1/2 ">
        <h2 class="text-lg font-semibold mb-4">Buy Tickets</h2>
        <div class="mb-4">
          <label class="block text-left text-gray-700 font-bold mb-2">How many tickets You want to buy?</label>
          <input type="number" v-model="no_of_tickets" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
        </div>
        <div>
             <button @click="confirmBtn" class="bg-slate-950 p-3 text-white mr-2">Confirm</button>
             <button class="bg-slate-950 p-3 text-white" @click="closePopUp">Close</button>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { provide } from 'vue';
export default{
  props: {
    movieDetail: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
        no_of_tickets: 1,
        cartsPayload : null
    }
  },
  computed: mapState({
    userTicketsMsg: state => state.user.userTicketsMsg,
  }),
    methods:{
       ...mapActions({createCart: 'userCartMod/create_user_cart_info'}),
        async confirmBtn(){
          const payload = {
            ...this.movieDetail,
            userTickets : this.no_of_tickets,
          }
          this.cartsPayload = payload; //payload send to cartItemPopUp
          provide('cartsPayload', this.cartsPayload);
          await this.createCart(payload);
          this.$emit('close');
          this.no_of_tickets = 1;
        },
        closePopUp(){
            this.$emit('close')
        },
    }, 
  
}

</script>