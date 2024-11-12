<script>
import {Shopping} from "src/services/Shopping";

export default {
  name: "DashboardPage",

  data() {
    return {
      rows: [],
      columns: [{name: "titulo", label: "Titulo", field: "titulo", sortable: true},
        {name: "codigo", label: "Codigo", field: "codigo", sortable: true},
        {name: "quantidade", label: "Quantidade", field: "quantidade"},
        {name: "preco_unitario", label: "Preço", field: "preco"},
        {name: "preco_total", label: "Preço Total", field: "preco_total"},
        {name: "tipo_pagamento", label: "Forma de pagamento", field: "tipo_pagamento"},
        {name: "action", label: "Ações", align: "center"},],

    }
  },
  methods: {
    async getShop(){
        await Shopping.GetShopping().then(resp => {
          this.rows = resp.data;
        });
    },
  },
  mounted() {
    this.getShop();
  },

  computed: {},
}
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="bg-dark">
    <!-- Cabeçalho -->
    <q-header elevated class="bg-dark text-white">
      <q-toolbar>
        <q-btn flat icon="menu" color="white" />
        <q-toolbar-title class="text-h6">Painel Administrativo</q-toolbar-title>
        <q-btn flat icon="logout" color="white"/>
      </q-toolbar>
    </q-header>

    <!-- Navbar lateral -->
    <q-drawer show-if-above class="bg-dark text-white shadow-2">
      <q-toolbar class="q-pa-sm text-white">
        <q-toolbar-title class="text-h6">Biblioteca Jarvis</q-toolbar-title>
      </q-toolbar>

      <q-list bordered separator dark>
        <q-item clickable v-ripple active-class="bg-grey-8 text-white">
          <q-item-section avatar>
            <q-icon name="menu_book" size="md" color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Livros</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple active-class="bg-grey-8 text-white">
          <q-item-section avatar>
            <q-icon name="shopping_cart" size="md" color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Carrinho</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple active-class="bg-grey-8 text-white">
          <q-item-section avatar>
            <q-icon name="shopping_bag" size="md" color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Comprar</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Container da página -->
    <q-page-container>
      <q-page>
        <h2 class="text-h5">Pedidos Recentes</h2>
        <div class="q-pa-md">
          <q-btn @click="getShop">Trazer</q-btn>
          <q-table
            :columns="columns"
            :rows="rows"
            class="table-black-white"
            {{Pedidos}}
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.bg-dark {
  background-color: #121212;
}

.shadow-2 {
  box-shadow: 4px 10px rgba(255, 255, 255, 0.1);
}

.text-white {
  color: #FFFFFF;
}
</style>
