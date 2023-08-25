import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    user:{
      //for resitering the user when logged In
      users: [],
      tokens: '',  //tokens generating jwt came here 
      errors: [],   
      userPassword: null
    },
    moviesArray: [],
  },
  mutations: {
    SET_WEB_TOKENS(state, payload)
    {
      // console.log("payload in mutatiosn is ==>", payload);
      //for saving the tokens in tokens state comming from back-end
      state.user.tokens = payload
    }, 
    SET_MOVIE_LIST(state, payload){
      state.moviesArray = payload;
      // console.log("payload in mutations is ==>", payload);
      // console.log("movies are cooming in mutations ==>", state.moviesArray);
      // payload.forEach((movie, index) => {
      //   console.log(`Movie at index ${index}:`, movie.movieName, movie.releaseDate);
      // });
    }, 
    DELETE_MOVIES(state, payload){
      const index = state.moviesArray.findIndex(m => m._id === payload._id);
      // console.log("index is ===> mutation", index)
      // console.log("paylod id==>", payload._id);
      // console.log("id in movies==>", index);
     if (index !== -1) {
      state.moviesArray.splice(index, 1);
     }
      // state.moviesArray.filter((item)=>item._id !== payload._id);
     },
     UPDATE_MOVIE(state, payload){
      // console.log("payload in mutation is",  payload)
      const {id, movieName, releaseDate} = payload;
      // console.log(id, movieName);
      //index for changing movie Data
      const movieIndex = state.moviesArray.findIndex((item)=>item._id == id);
      if(movieIndex !== -1)
      {
        state.moviesArray[movieIndex].movieName = movieName;
        state.moviesArray[movieIndex].releaseDate = releaseDate;
      }
     },
     UPDATE_PASS(state, payload)
     {
      state.user.userPassword = payload;
      // console.log("password upation in mutation is==>", state.user.usersPassword);
     },
     SET_USER(state, payload)
     {
      state.user.users = payload;
      // console.log("payload in coomit mutation is ==>", payload);
      // console.log("users array is in store====>",state.user.users);
     }
  },
  actions: {
    async registerUser({commit}, payload){
      // console.log("payload in registered user is  ==>", payload);
      
      try {
        const response = await axios.post('/users/register', payload);

        if (response.status === 201) {
            console.log("User registered successfully");
            // console.log("user Array is ==>", this.state.user.users);
            commit("SET_USER", payload);
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
      const {data} =await axios.post('/users/authenticate', payload);
      //for generating tokens here
      // console.log("payload authentication token in actions tokens==>", data.data.token);
      commit("SET_WEB_TOKENS", data.data.token); //for web tokens
      // console.log("response in authentication is ===>", data.data.user._id); //for upation of password , push whole data object
       commit("UPDATE_PASS", data);
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
       await axios.post('/movies', payload, config); 
       
      // console.log("payload moviesCreation in actions==>", response.data);
      // if (this.state.user.tokens !== '') {
      //   router.push('/movies');
      // }
    },
    //getting movies from the API 
    async getMovies({ commit }) {
      try {
        const token = this.state.user.tokens;
        // console.log('token in the fetch----> ', token)
        const config = {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
          }
        };
        const { data } = await axios.get('/movies',config);
        // console.log("data in Movies related", data)
        commit('SET_MOVIE_LIST', data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    //delete the movies by id
    async deleteMov({commit},payload){
      const token = this.state.user.tokens;
      const config = {
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json'
        }
      };
      // console.log("config folder is ==>", config);
    // console.log("payload id in action is ==>", payload._id);
    const data = await axios.delete(`/movies/${payload._id}`, config);
    console.log("response in action is ===>", data);
    commit("DELETE_MOVIES", payload);
    },
    async moviesUpdation({commit},payload){
    //  console.log("payload in updateion store action==>", payload);
    const token = this.state.user.tokens;
      const config = {
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json'
        }
      };
     try{
      await axios.patch(`/movies/${payload.id}`,payload, config);
      // console.log('data in payload is ==>', res);
      commit("UPDATE_MOVIE", payload);
    }catch(error){
      console.log("error in patch actions is ==>", error);
    }
     
    },
    //Now updation of password of user
    async updatepassword(_, payload)
    {
      console.log("payload in actions", payload)
      // console.log("id of updated password is ==>", this.state.user.usersPassword.data.user._id) // accessing id of logged In user 
      try{
        const response = await axios.patch(`/users/register/${this.state.user.userPassword.data.user._id}`, payload);
        console.log('response of passsword in action is ==>', response);
      }catch(error){
        console.log("error in patch actions is ==>", error);
      }
    },
    //Now delete the current user 
    async delete_User()
    {
      // console.log("payload ===> delete user==>", payload);
      // console.log("user array in store delete_user action ", this.state.user.users);
      // console.log("Password in delete_user action is ==>", this.state.user.userPassword.data.user._id);
      const curr_U_ID = this.state.user.userPassword.data.user._id;
      await axios.delete(`/users/register/${curr_U_ID}`);
      // console.log("response in the delete-User", response);
    }
  },
  getters: {
    getMovies_Data(state){
      // console.log("Moviess in geeter==>",state.moviesArray);
      return state.moviesArray;
    }, 
  },
})
