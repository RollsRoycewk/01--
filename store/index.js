import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		loginState: false
	},
	mutations: {
		changeLoginStatus(state, { num }) {
			state.loginState = num;
		}
	}
})
