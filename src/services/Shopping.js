
import {api} from "boot/axios";

export const Shopping = {
  async GetShopping() {
    return await api.get('/compra');
  },

  async GetShoppingCount() {
    return await api.get('/compra/get-count');
  },

  async create(shopping) {
    return await api.post('/compra', shopping);
  },

  async update(shopping) {
    return await api.patch(`/compra/${+shopping.id_compra}`, shopping);
  },

  async delete(shopping) {
    return await api.delete('/compra/' + shopping);
  }
}
