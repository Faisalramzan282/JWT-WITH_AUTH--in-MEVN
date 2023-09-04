import Vuex from 'vuex';
import userModule from './modules/user.js';
import moviesModule from './modules/movies.js';
import userCartMod from './modules/userCartMod.js';
import userMovOrder from './modules/userMovOrder.js';
export default new Vuex.Store({
    modules: {
      user: userModule,
      movies:  moviesModule,
      userCartMod: userCartMod,
      userMovOrder
    }
})
