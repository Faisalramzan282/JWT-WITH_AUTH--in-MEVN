import axios from "axios";
import router from "@/router";
const state = {
  user: {
    users: [],
    tokens: "", //tokens generating jwt came here
    errors: [],
    userPassword: null,
    roles_Store: "user", //default role
    
  },
};

const mutations = {
  SET_WEB_TOKENS(state, payload) {
    console.log("user tokens is ===>", state.user.tokens);
    state.user.tokens = payload;
  },
  UPDATE_PASS(state, payload) {
    state.user.userPassword = payload;
  },
  SET_USER(state, payload) {
    state.user.users = payload;
  },
  SET_ROLES(state, payload) {
    state.user.roles_Store = payload;
    console.log("roles in store mutation ", state.user.roles_Store);
  },
  SET_ADMIN_PANNEL_USER(state, payload) {
    state.admin.all_User.push(payload);
  },
};

const actions = {
  async registerUser({ commit }, payload) {
    try {
      const response = await axios.post("/users/register", payload);
      if (response.status === 201) {
        console.log("User registered successfully");
        commit("SET_USER", payload);
      } else if (response.status === 400) {
        const validationErrors = response.data.errors;
        validationErrors.forEach((error) => {
          console.log("erros in authentication ==>, ", error);
        });
      }
    } catch (error) {
      console.error("An error occurred:", this.state.user.errors);
    }
  },
  async authenticateUser({ commit }, payload) {
    try {
      const { data } = await axios.post("/users/authenticate", payload);
      commit("SET_WEB_TOKENS", data.data.token); //for web tokens
      commit("UPDATE_PASS", data);
      if (data.data.user.role === "user") {
        router.push({ name: "user" });
      } else if (data.data.user.role === "admin") {
        router.push({ name: "movies" });
      }
    } catch (error) {
      console.log("error is ===>", error);
    }
  },
};
const getters = {};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
