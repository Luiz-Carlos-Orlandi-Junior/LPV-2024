import { defineStore } from 'pinia';

export const login = defineStore({
  state: () => ({
    user:{}
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
