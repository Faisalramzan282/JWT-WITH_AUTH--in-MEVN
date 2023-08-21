import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    user:{
      //for resitering the user when logged In
      users: [],
      tokens: ''
     
    }
  },
  mutations: {
       
  },
  actions: {
    async registerUser(_, payload){
      const response = await axios.post('/users/register', payload);
      console.log("response i actions is ==>", response);
    }
  },
  getters: {
  },
})
