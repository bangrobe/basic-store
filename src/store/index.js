import Vue from 'vue'
import Vuex from 'vuex'
import account from './account';
import product from './product';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
		account,
		product
	}
	
})
