<script>
import {Shopping} from "src/services/Shopping";
import {User} from "src/services/User"
import {useRouter as router} from "vue-router";

export default {
  name: "DashboardPage",

  data() {
    return {
      pedidos: [],
      quantidadeCompras: [],
      quantidadeLivros: [],
      user: {name: "Luiz", label: "nome", field: "Luiz"},
      loading: true,
      columns: [
        {name: "titulo", label: "titulo", field: "titulo"},
        {name: "codigo_compra", label: "Codigo", field: "codigo_compra", sortable: true},
        {name: "quantidade", label: "Quantidade", field: "quantidade"},
        {name: "preco_unitario", label: "Preço", field: "preco_unitario"},
        {name: "tipo_pagamento", label: "Forma de pagamento", field: "tipo_pagamento"}
    ]}
  },
  methods: {
    router,
    async getShop(){
        this.loading = true;
        await Shopping.GetShopping().then(resp => {
          this.pedidos = resp.data.rows;
        });
    },
    async getCount(){
      this.loading = true;
      await Shopping.GetShoppingCount ().then(resp => {
        this.quantidadeCompras = resp.data.quantidade_compras || 0;
        this.quantidadeLivros = resp.data.quantidade_livros || 0;
      });
    },
    async getUser(){
      this.loading = true;
      await User.getUser().then(resp => {
        this.user = resp.data.rows;
      })
    }
  },
  mounted() {
    this.getShop();
    this.getCount()
    this.getUser()
  },
}
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="bg-dark">
    <q-header elevated class="bg-dark text-white">
      <q-toolbar>
        <q-btn flat icon="menu" color="white" />
        <q-toolbar-title class="text-h6">Painel Administrativo</q-toolbar-title>
        <q-avatar>
          <img src="src/components/miranha.jpg">
        </q-avatar>
        <br>

        {{user.name}}
        <q-btn flat icon="logout" color="white" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above class="bg-dark text-white shadow-2">
      <q-toolbar class="q-pa-sm">
        <q-toolbar-title class="text-h6">Biblioteca Jarvis</q-toolbar-title>
      </q-toolbar>

      <q-list bordered separator>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="menu_book" size="md" />
          </q-item-section>
          <q-item-section>
            <q-btn @click="$router.push('/listing')">Livros</q-btn>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="shopping_cart" size="md" />
          </q-item-section>
          <q-item-section>
            <q-btn @click="$router.push('/gender')">Livros</q-btn>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="shopping_bag" size="md" />
          </q-item-section>
          <q-item-section>
            <q-btn @click="$router.push('/shopping')">Shopping</q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <div class="q-pa-md row justify-around">
      <q-card class="q-mb-md bg-dark text-white" style="max-width: 300px;">
        <q-card-section>
          <div class="text-h6">Quantidade de Compras</div>
          <div class="text-subtitle1 text-bold">{{ quantidadeCompras }}</div>
        </q-card-section>
      </q-card>

      <q-card class="q-mb-md bg-dark text-white" style="max-width: 300px;">
        <q-card-section>
          <div class="text-h6">Quantidade de Livros Cadastrados</div>
          <div class="text-subtitle1 text-bold">{{ quantidadeLivros }}</div>
        </q-card-section>
      </q-card>
    </div>

    <q-page-container>
      <q-page>
        <div class="content-wrapper">
          <h2 class="text-h5">Pedidos Recentes</h2>
          <q-table
            :columns="columns"
            :rows="pedidos"
          />

        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>



<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  margin-bottom: 16px;
}

.table-dark {
  width: 90%;
  max-width: 800px;
  background-color: #1E1E1E;
  border-radius: 8px;
}

.btn-align-left {
  margin-top: 16px;
  align-self: flex-start;
}

.q-card {
  text-align: center;
  transition: transform 0.2s ease-in-out;
}
.q-card:hover {
  transform: scale(1.05);
}

.text-h6 {
  font-weight: bold;
}
</style>
