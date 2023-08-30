import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router';
// let cartItems = localStorage.getItem('cartItems');
export default createStore({
  state: {
    user:{
      //for resitering the user when logged In
      users: [],
      tokens: '',  //tokens generating jwt came here 
      errors: [],   
      userPassword: null,
      roles_Store : 'user',
      // userCarts : []
    },
    moviesArray: [],
    admin : {
      all_User : []
    }
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
     }, 
     SET_ROLES(state, payload)
     {
      state.user.roles_Store = payload;
      console.log("roles in store mutation ", state.user.roles_Store )
     }, 
     SET_ADMIN_PANNEL_USER(state, payload)
     {
       state.admin.all_User.push(payload);
      //  console.log("all user fetched succesffuly ==>", state.admin.all_User);
     },
    
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
      try{
        const {data} =await axios.post('/users/authenticate', payload);
        //for generating tokens here
        // console.log("user role is ==>", this.state.user.roles_Store);
        // console.log("users data is ===>", data.data.user.role);
        commit("SET_WEB_TOKENS", data.data.token); //for web tokens
        // console.log("response in authentication is ===>", data.data.user._id); //for upation of password , push whole data object
         commit("UPDATE_PASS", data);
         //for adjusting role-based authentication
         if (data.data.user.role === 'user') {
          // console.log("inside user role");
          router.push({ name: 'user' }); 
        } else if (data.data.user.role === 'admin') {
          // console.log("inside admin role");
          router.push({ name: 'movies' }); 
        }
      }
      catch(error){
        console.log("error is ===>", error);
      }
      
    },
    async moviesCreation(_, payload) {
      const token = this.state.user.tokens;
      const config = {
        headers: {
          'x-access-token': token,
          'Content-type': 'application/json',
        },
      };
      //post request (URL, data, config);
       await axios.post('/movies', payload, config); 
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
    const data = await axios.delete(`/movies/${payload._id}`, config);
    console.log("response in action is ===>", data);
    commit("DELETE_MOVIES", payload);
    },
    async moviesUpdation({commit},payload){
    const token = this.state.user.tokens;
      const config = {
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json'
        }
      };
     try{
      await axios.patch(`/movies/${payload.id}`,payload, config);
      commit("UPDATE_MOVIE", payload);
    }catch(error){
      console.log("error in patch actions is ==>", error);
    }
     
    },
    //Now updation of password of user
    async updatepassword(_, payload)
    {
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
      const curr_U_ID = this.state.user.userPassword.data.user._id;
      await axios.delete(`/users/register/${curr_U_ID}`);
    },
    async role_selection(_,payload){
    const response  = await axios.patch(`/users/role/${payload.id}`,payload);
    console.log("Response in action role-selection is", response);
  },
  // for admin pannel data--->
  async fetchAllUsers({commit})
    {
      const {data} = await axios.get('/users/register');
      console.log("response is action ===>", data.data);
      commit("SET_ADMIN_PANNEL_USER", data.data);
    }, 
  create_user_cart_info(_, payload)
  {
    if(payload.tickets>=payload.userTickets)  //means admin tickets are available
    {
      let cartItems = JSON.parse(localStorage.getItem('cartItems'));
      let indexExist= cartItems.findIndex(obj=>obj._id === payload._id);
      if(indexExist !== -1){
        cartItems[indexExist].userTickets += payload.userTickets;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      // console.log("cartitem from local Storage is ==>", cartItems)
      //push into global state
      // this.state.user.userCarts.push(cartItems)
      // console.log("array of global state in action is ==>", this.state.user.userCarts);
    }
      else{
        cartItems.push(payload);
       localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }
    }
    else{
      alert("Tickets you entered is not available")
    }
  }
  },
  getters: {
    getMovies_Data(state){
      return state.moviesArray;
    }, 
    get_user_admin_pannel(state)
    {
      return state.admin.all_User;
    }, 
  },
 
})
