import { defineStore } from 'pinia';
import shopping from 'src/services/Shopping'

export const useShoppingStore = defineStore('counter',{
  state: () => ({
    pedidos: [],
    counter: 0
  }),
  actions: {
       async GetShopping(data){
         this.pedidos = await shopping.GetShopping(data)
       }
  }
});
