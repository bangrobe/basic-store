import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router';
import axios from 'axios';


Vue.use(Vuex)

export default new Vuex.Store({
  state() {
    return {
      userData: {}
    }
  },
  mutations: {
    SET_USER_DATA(state, payload) {
      state.userData = payload
    }
  },
  actions: {
    login( {commit}) {
      const url='https://randomuser.me/api';
      axios.get(url).then( function (response) {
        let userData = {
          displayName: response.data.results[0].name.first,
          email: response.data.results[0].email,
          photoUrl: response.data.results[0].picture.thumbnail,
          uid: response.data.results[0].login.uuid
        }
        commit("SET_USER_DATA", userData)
        router.push('/')
      })
        .catch(function(error) {
          console.log(error)
        });
    }
  },
  modules: {
  },
  getters: {
    user(state) {
      return state.userData
    }
  }
})
