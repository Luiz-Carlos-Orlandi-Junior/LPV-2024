import { defineStore } from 'pinia';
import books from 'src/services/books'

export const useBooksStore = defineStore('counter',{
  state: () => ({
    livros: [],
    counter: 0
  }),
  actions: {
    async getBooks(data){
      this.livros = await livros.getBooks(data)
    }
  }
});
