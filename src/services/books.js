import {api} from "boot/axios";

export const Books = {
  async getCount() {
    return await api.get('/livro');
  },
  async getBooks() {
    return await api.get('/livro');
  },

  async create(book) {
    return await api.post('/livro', book);
  },

  async update(book) {
    return await api.patch(`/livro/${+book.id_livro}`, book);
  },

  async delete(book) {
    return await api.delete('/livro/'+book);
  }
}
