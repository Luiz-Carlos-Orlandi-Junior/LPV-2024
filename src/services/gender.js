import {api} from "boot/axios";

export const Gender = {
  async GetGender() {
    return await api.get('/genero');
  },

  async create(gender) {
    return await api.post('/genero', gender);
  },

  async update(gender) {
    return await api.patch(`/genero/${+gender.id_genero}`, gender);
  },

  async delete(gender) {
    return await api.delete('/genero/' + gender);
  }
}
