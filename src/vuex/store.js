import Vue from 'vue';

import Vuex from 'vuex';

import usermodule from './usermodule';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        userData: usermodule
    }
});

export default store;
