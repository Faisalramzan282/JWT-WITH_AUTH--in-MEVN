import axios from "axios";
import user from "./user";
const state = {
  moviesArray: [],
  admin :{
    all_User : []
}
};

const mutations = {
  SET_MOVIE_LIST(state, payload) {
    state.moviesArray = payload;
  },
  DELETE_MOVIES(state, payload) {
    const index = state.moviesArray.findIndex((m) => m._id === payload._id);
    if (index !== -1) {
      state.moviesArray.splice(index, 1);
    }
  },
  UPDATE_MOVIE(state, payload) {
    const { id, movieName, releaseDate } = payload;
    const movieIndex = state.moviesArray.findIndex((item) => item._id == id);
    if (movieIndex !== -1) {
      state.moviesArray[movieIndex].movieName = movieName;
      state.moviesArray[movieIndex].releaseDate = releaseDate;
    }
  },
  SET_ADMIN_PANNEL_USER(state, payload) {
    state.admin.all_User.push(payload);
  },
};
const actions = {
   //Now updation of password of user
  async updatepassword(_, payload) {
    try {
      const response = await axios.patch(
        `/users/register/${user.state.user.userPassword.data.user._id}`,   // id from user module
        payload
      );
      console.log("response of passsword in action is ==>", response);
    } catch (error) {
      console.log("error in patch actions is ==>", error);
    }
  },
  //Now delete the current user
  async delete_User() {
    const curr_U_ID = user.state.user.userPassword.data.user._id;  //id from user module
    await axios.delete(`/users/register/${curr_U_ID}`);
  },
  async role_selection(_, payload) {
    await axios.patch(`/users/role/${payload.id}`, payload);
  },
  // for admin pannel data--->
  async fetchAllUsers({ commit }) {
    const { data } = await axios.get("/users/register");
    commit("SET_ADMIN_PANNEL_USER", data.data);
  },
  async moviesCreation(_,payload) {
    const token =  user.state.user.tokens;  //token in user module
    const config = {
      headers: {
        "x-access-token": token,
        "Content-type": "application/json",
      },
    };
    await axios.post("/movies", payload, config);
  },
  //getting movies from the API
  async getMovies({ commit }) {
    try {
      const token = user.state.user.tokens;
      const config = {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get("/movies", config);
      commit("SET_MOVIE_LIST", data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  },
  //delete the movies by id
  async deleteMov({ commit }, payload) {
    const token = user.state.user.tokens;
    const config = {
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    };
    const data = await axios.delete(`/movies/${payload._id}`, config);
    console.log("response in action is ===>", data);
    commit("DELETE_MOVIES", payload);
  },
  async moviesUpdation({ commit }, payload) {
    const token = user.state.user.tokens;
    const config = {
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    };
    console.log("payload in update movies modules action ==>", payload)
    try {
      await axios.patch(`/movies/${payload.id}`, payload, config);
      commit("UPDATE_MOVIE", payload);
    } catch (error) {
      console.log("error in patch actions is ==>", error);
    }
  },
};
const getters = {
  getMovies_Data(state) {
    return state.moviesArray;
  },
  get_user_admin_pannel(state) {
    return state.admin.all_User;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
