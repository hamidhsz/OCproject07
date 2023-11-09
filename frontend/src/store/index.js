import { reactive } from "vue";

const store = reactive({
  isLoggedIn: false,
  setIsLoggedIn(loggedState) {
    this.isLoggedIn = loggedState;
  },
});

export default store;
