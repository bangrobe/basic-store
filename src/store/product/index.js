import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      products: [],
      product: {},
      cart: []
  },
  mutations: {
    SET_PRODUCTS: (state, payload) => {
      state.products = payload;
    },
    SET_PRODUCT: (state, payload) => {
      state.product = payload;
    },
    //Khai bao kieu function ECS5
    SET_LOAD(state, val) {
      state.uploadingData = val;
    },
    SET_CART: (state,val) => {
      state.cart = val;
    }
  },
  actions: {
    getProducts: ({ commit }) => {
      let url = "https://my-json-server.typicode.com/Nelzio/ecommerce-fake-json/products";
      axios.get(url).then((response)=> {
        commit('SET_PRODUCTS', response.data);
      }).catch(err => {
        console.log(err);
      })
    },
    productDetails: ({commit}, id) => {
      let url = "https://my-json-server.typicode.com/Nelzio/ecommerce-fake-json/products";
      axios.get(url, { params: { id:id }}).then( (response) => {
        commit('SET_PRODUCT',response.data);
      }).catch(err=> {
        console.log(err);
      })
    },
    addCart( {commit, getters} , payload) {
      let cart = getters.cart;
      cart.push(payload);
      commit('SET_CART', cart);
    },
    removeCart( {commit, getters}, id ) {
      //To remove a particular object from the cart, 
      //we will iterate what is on the cart array and 
      //add items that not have the same product id 
      //that we want to remove to a temporary variable and then add the cart by committing its mutation.
      let cart = [];
      if (id) {
        for (let index = 0; index < getters.cart.length; index++) {
          const element = getters.cart[index];
          if(element.id !== id) {
            cart.push(element);
          }
        }
      }
      commit('SET_CART',cart);
    }
  },
  modules: {
  },
  getters: {
    products(state) {
      return state.products;
    },
    product(state) {
      return state.product;
    },
    //Hoac khai bao theo Arrow Function
    cart: state => {
      return state.cart;
    }
  }
})
