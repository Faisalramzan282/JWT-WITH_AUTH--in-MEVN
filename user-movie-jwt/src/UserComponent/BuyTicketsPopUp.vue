<template>
   <div class="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div class="bg-white rounded p-8 shadow-lg w-1/2 ">
        
        <h2 class="text-lg font-semibold mb-4">Buy Tickets</h2>
        <div class="mb-4">
          <!-- <span>{{this.movieDetail}}</span> -->
          <label class="block text-left text-gray-700 font-bold mb-2">How many tickets You want to buy?</label>
          <!-- <span class="text-red-400 text-start">{{  userTicketsMsg }}</span> -->
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
export default{
  props: {
    movieDetail: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
        no_of_tickets: 1
    }
  },
  computed: mapState({
    
    userTicketsMsg: state => state.user.userTicketsMsg,
  }),
    methods:{
       ...mapActions({createCart: 'create_user_cart_info'}),
      //  ...mapGetters({user_tickets_msg:" getUserTicketsMsg"}),
       async confirmBtn(){
          const payload = {
            ...this.movieDetail,
            tickets : this.no_of_tickets
          }
          // console.log("props is of movie Detail==>", this.movieDetail);
          // console.log("no of tickets in particular movie===>", this.no_of_tickets);
          // console.log("complete payload in my comp===>", payload);
          await this.createCart(payload);
          // console.log("user tickets messge is ===>", this. userTicketsMsg);
         
          alert(this. userTicketsMsg);
          this.$emit('close');
          this.no_of_tickets = 1;
        },
        closePopUp(){
            this.$emit('close')
        },
    }, 
//   created() {
//       // console.log("movieDetail prop in TicketsPopUp:", this.movieDetail);
//      this.user_tickets_msg();
// }
}

</script>