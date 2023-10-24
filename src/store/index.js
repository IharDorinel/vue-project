import { createStore } from 'vuex';

import coachesModules from './modules/coaches'
import requestsModules from './modules/requests'

const store = createStore({
  modules: {
    coaches: coachesModules,
    requests: requestsModules
  },
  state() {
    return {
      userId: 'c3'
    }
  },
  getters: {
    userId(state) {
      return state.userId
    }
  }
});

export default store;
