let cartItems = localStorage.getItem("cartItems");
const state = {
  userCart: null || cartItems,
};
const mutations = {
  SET_USER_CART(state, payload) {
    state.userCart = payload;
  },
};
const actions = {
  //usercart with local Storage
  create_user_cart_info({ commit }, payload) {
    if (payload.tickets >= payload.userTickets) {
      //means admin tickets are available
      let cartItems = JSON.parse(localStorage.getItem("cartItems"));
      let indexExist = cartItems.findIndex((obj) => obj._id === payload._id);
      if (indexExist !== -1) {
        cartItems[indexExist].userTickets += payload.userTickets;
        cartItems[indexExist].totalCartPrice =
          cartItems[indexExist].userTickets * payload.moviePrice; //for changed price , movie exist
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        let carts = localStorage.getItem("cartItems");
        commit("SET_USER_CART", carts);
      } 
      else 
      {
        payload = {
          ...payload,
          totalCartPrice: payload.userTickets * payload.moviePrice, //for dealing cart price based on tickets
        };
        cartItems.push(payload);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        let carts = localStorage.getItem("cartItems");
        commit("SET_USER_CART", carts);
      }
    } 
    else {
      alert("Tickets you entered is not available");
    }
  },
  removeUserCart({ commit }, payload) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    let indexExist = cartItems.findIndex((obj) => obj._id == payload._id);
    if (indexExist !== -1) {
      cartItems[indexExist].userTickets -= 1;
      cartItems[indexExist].totalCartPrice =
        cartItems[indexExist].userTickets * payload.moviePrice;
      localStorage.setItem("cartItems", JSON.stringify(cartItems)); // for settle localStorage
      let carts = localStorage.getItem("cartItems");
      commit("SET_USER_CART", carts); // for reactive change
      //for less than 0 case
      if (cartItems[indexExist].userTickets === 0) {
        cartItems.splice(indexExist, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems)); // for settle localStorage
        let carts = localStorage.getItem("cartItems");
        commit("SET_USER_CART", carts);
      }
    }
  },
};
const getters = {
  getUserCart() {
    return state.userCart;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
