import { defineStore } from 'pinia';

export const login = defineStore({
  state: () => ({
    user:{
      user: "Luiz",
      email: "luiz@example.com",
      password: "123456"

    }
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
