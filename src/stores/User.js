import { defineStore } from 'pinia';
import user from 'src/services/User'

export const useUserStore = defineStore('counter',{
  state: () => ({
    user: [],
    counter: 0
  }),
  actions: {
    async getUser(data){
      this.pedidos = await user.getUser(data)
    }
  }
});
