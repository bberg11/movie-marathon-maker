import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    marathonLength: null,
    startDate: null,
    startTime: null,
    endTime: null,
    savedMarathons: [
      {
        name: 'NYE Marathon',
        data: {},
      },
      {
        name: 'Star Wars',
        data: {},
      },
    ],
  },

  mutations: {
    SET_MARATHON_LENGTH (state, length) {
      state.marathonLength = length;
    },

    SET_START_DATE (state, value) {
      state.startDate = value;
    },

    SET_START_TIME (state, value) {
      state.startTime = value;
    },

    SET_END_TIME (state, value) {
      state.endTime = value;
    },
  },

  actions: {

  },
});
