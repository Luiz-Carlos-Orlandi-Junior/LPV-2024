
import {api} from "boot/axios";

export const User = {
  async getUser() {
    return await api.get('/user');
  },
  async create(user) {
    return await api.post('/user', user);
  }
}
