<template>
    <div> 
          <p>Movies Order</p>
        <form >
            <div class="mb-4">
                <label for="movieSelection" class="block text-gray-700 font-bold mb-2">
                    Which movies you want to book your tickets?
                </label>
                <input v-model="moviesForm.movNameOrder" type="text" id="movieSelection" name="movieSelection" class="w-full px-3 py-2 border rounded-md text-gray-700 
                focus:outline-none focus:border-blue-500" >
            </div>
            <div class="mb-4">
                <label for="movieTickets" class="block text-gray-700 font-bold mb-2">
                  How many tickets you want to book?
                </label>
                <input v-model="moviesForm.movTicketOrder" type="number" id="movieTickets" name="movieTickets" class="w-full px-3 py-2 border rounded-md text-gray-700 
                focus:outline-none focus:border-blue-500">
            </div>
            <button @click="conOrder"  class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Confirm
            </button>
        </form>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: "OrderMovies",
    data(){
        return{
            moviesForm:{
                movNameOrder: '',
                movTicketOrder: null
            }
        }
    },
    computed: {
        ...mapState('userCartMod', ['userCart']),
    },
    methods:{
        ...mapActions({moviesOrder : 'userMovOrder/moviesOrder'}),
        conOrder(e)
        {
            e.preventDefault();
            //input-field to lowercase
            // const moviesData = {
            //     movNameOrder : this.moviesForm.movNameOrder.toLocaleLowerCase(),
            //     movTicketOrder : this.moviesForm.movTicketOrder
            // }
            // console.log("ssun", moviesData);
            console.log("user cart is ===>", this.userCart);
        }
    }
}
</script>