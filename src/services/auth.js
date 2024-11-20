import {api} from 'boot/axios';

export const auth = {
  async makeLogin(data) {
    try {

      const token = btoa(`${data.email}:${data.password}`);

      return await api.post('/login','', {
        headers: {
          'Authorization': `Basic ${token}`
        }
      });
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      throw   new Error(err.response?.data?.message || "Erro ao tentar fazer login");
    }
  }
};
