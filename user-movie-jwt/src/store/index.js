import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router';
export default createStore({
  state: {
    user:{
      //for resitering the user when logged In
      users: [],
      tokens: '',
      errors: [],
    },
    MoviesData: {}
  },
  mutations: {
    SET_WEB_TOKENS(state, payload)
    {
      // console.log("payload in mutatiosn is ==>", payload);
      //for saving the tokens in tokens state comming from back-end
      state.user.tokens = payload
    }, 
    SET_MOVIE_LIST(state, payload){
      state.MoviesData = payload;
      console.log("movies are cooming in mutations ==>", state.MoviesData);
    }
  },
  actions: {
    async registerUser(_, payload){
      try {
        const response = await axios.post('/users/register', payload);

        if (response.status === 201) {
            console.log("User registered successfully");
        } else if (response.status === 400) {
            const validationErrors = response.data.errors;
            validationErrors.forEach(error => {
                console.log("erros in authentication ==>, ", error); 
            });
        }
    } catch (error) {
      console.error("An error occurred:", this.state.user.errors);
    }
    },
    async authenticateUser({commit}, payload){
      const response =await axios.post('/users/authenticate', payload);
      //for generating tokens here
      // console.log("payload authentication token in actions==>", response.data.data.token);
      commit("SET_WEB_TOKENS", response.data.data.token)
    },
    async moviesCreation(_, payload) {
      const token = this.state.user.tokens;
      console.log("tokens in action is ==>", token);
      const config = {
        headers: {
          'x-access-token': token,
          'Content-type': 'application/json',
        },
      };
      //post request (URL, data, config);
      const response = await axios.post('/movies', payload, config); 
      console.log("payload moviesCreation in actions==>", response.data);
      if (this.state.user.tokens !== '') {
        router.push('/movies');
      }
    },
    //getting movies from the API 
    async getMovies({ commit }) {
      try {
        const token = this.state.user.tokens;
        console.log('token in the fetch----> ', token)
        const config = {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
          }
        };
        const { data } = await axios.get('/movies',config);
        console.log("data in Movies related", data)
        commit('SET_MOVIE_LIST', data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
   
  },
  getters: {
    getMovies_Data(state){
      return state.MoviesData;
    }
  },
})
