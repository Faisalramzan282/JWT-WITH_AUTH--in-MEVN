<!-- <template>
  
    <div class="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-40 ">
  <div class="bg-gray-500 rounded p-8 shadow-lg w-full ">
    <div class="flex justify-around">
      <p>MovieName</p>
      <p>Moviedate</p>
      <p>Tickets</p>
     
  </div>
  <div class="flex justify-around " v-for="item in cartItem" :key="item._id">

     <p>{{ item.movieName }}</p>
     <p>{{ formatDate(item.releaseDate) }}</p>
     <p>{{ item.userTickets }}</p>
  </div>        
    <div>
        <button class="bg-white-500 p-4 rounded" @click="closePopUp">Close</button>
    </div>      
  </div>
</div>

</template>

<script>
export default{
name: "cartItemPopUp",
data(){
    return{
    cartItem: []
    }
},
mounted(){
    if (localStorage.getItem('cartItems')) {
      try {
        this.cats = JSON.parse(localStorage.getItem('cartItems'));
      } catch(e) {
        console.log("error is ==>", e)
        // localStorage.removeItem('cartItems');
      }
    }
},
methods:{
    //for date formate 
formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
},
closePopUp(){ if (localStorage.getItem('cartItems')) {
      try {
        this.cats = JSON.parse(localStorage.getItem('cartItems'));
      } catch(e) {
        localStorage.removeItem('cartItems');
      }
    }
    this.$emit('close')
},
},
created() {
  if (!localStorage.getItem('cartItems')) {
  localStorage.setItem('cartItems', JSON.stringify([]));
}
},
}
</script> -->

<template>
  <div id="app">
  <h2>Cats</h2>
  <div v-for="(cat, n) in cats" :key="n">
    <p>
      <span class="cat">{{ cat }}</span>
      <button @click="removeCat(n)">Remove</button>
    </p>
  </div>

  <p>
    <input v-model="newCat">
    <button @click="addCat">Add Cat</button>
  </p>
  <button class="bg-white-500 p-4 rounded" @click="closePopUp">Close</button>
</div>
</template>
<script>
export default {
  name:  "cartItemPopUp",
  data(){
   return{
    cats: [],
    newCat: null
   }
  },
  mounted() {
    if (localStorage.getItem('cats')) {
      try {
        this.cats = JSON.parse(localStorage.getItem('cats'));
      } catch(e) {
        localStorage.removeItem('cats');
      }
    }
  },
  methods: {
    addCat() {
      // ensure they actually typed something
      if (!this.newCat) {
        return;
      }

      this.cats.push(this.newCat);
      this.newCat = '';
      this.saveCats();
    },
    removeCat(x) {
      this.cats.splice(x, 1);
      this.saveCats();
    },
    saveCats() {
      const parsed = JSON.stringify(this.cats);
      localStorage.setItem('cats', parsed);
    },
    closePopUp(){ 
    this.$emit('close')
},
  }

}

</script>