import { defineStore } from 'pinia';
import shopping from 'src/services/gender'

export const useGenderStore = defineStore('counter',{
  state: () => ({
    Genders: [],
    counter: 0
  }),
  actions: {
    async GetGender(data){
      this.Genders = await shopping.GetGender(data)
    }
  }
});
