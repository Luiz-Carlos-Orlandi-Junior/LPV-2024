import { defineStore } from 'pinia';
import shopping from 'src/services/Shopping'

export const useShoppingStore = defineStore('counter',{
  state: () => ({
    Pedidos: [],
    counter: 0
  }),
  actions: {
       async GetShopping(data){
         this.Pedidos = await shopping.GetShopping(data)
       }
  }
});
