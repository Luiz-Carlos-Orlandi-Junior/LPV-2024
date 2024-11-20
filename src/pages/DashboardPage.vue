<script>
import {Shopping} from "src/services/Shopping";

export default {
  name: "DashboardPage",

  data() {
    return {
      pedidos: [],
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
    async getShop(){
        this.loading = true;
        await Shopping.GetShopping().then(resp => {
          this.pedidos = resp.data.rows;
        });
    }
  },
  mounted() {
    this.getShop();
  },
}
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="bg-dark">
    <q-header elevated class="bg-dark text-white">
      <q-toolbar>
        <q-btn flat icon="menu" color="white" />
        <q-toolbar-title class="text-h6">Painel Administrativo</q-toolbar-title>
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
            <q-item-label>Livros</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="shopping_cart" size="md" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Carrinho</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="shopping_bag" size="md" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Comprar</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

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
</style>
