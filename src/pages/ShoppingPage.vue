<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Finalizar Compra</div>
      </q-card-section>

      <q-card-section>
        <q-table
        :rows="item"
        :columns="columns"
        >
        </q-table>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <q-select
          v-model="livro.tipo_pagamento"
          emit-value
          :options="opcoesPagamento"
          label="Tipo de Pagamento"
          hint="Selecione um método de pagamento"
        />
        <q-btn
          class="q-mt-md"
          color="positive"
          label="Finalizar Compra"
          @click="submitForm"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {Shopping} from "src/services/Shopping";

export default {
  data() {
    return {
      livro: {},
      item: [],
      opcoesPagamento: [
        { label: "Cartão de Crédito", value: "Cartao de Credito" },
        { label: "Cartão de Débito", value: "Cartao de Debito" },
        { label: "Dinheiro", value: "Dinheiro" },
        { label: "Pix", value: "Pix" },
      ],
      columns: [
        { name: "titulo", label: "Título", field: "titulo", align: "left" },
        { name: "autor", label: "Autor", field: "autor", align: "left" },
        { name: "quantidade", label: "Quantidade", field: "quantidade", align: "center" }
      ],
    };
  },
  methods: {
    async submitForm() {
      console.log(this.livro)
        await Shopping.create(this.livro).then((response) => {
          if (response) {
            localStorage.clear()
            this.$q.notify({
              type: "positive",
              message: "Produto criado com sucesso!",
            });
          }
        });
    },
    getProduct() {
      const compraLivro = JSON.parse(localStorage.getItem('livro'))
      this.item.push(compraLivro)
      this.livro = compraLivro
      console.log(this.livro)
    }
  },
  mounted() {
   this.getProduct()
  },

};
</script>

<style>

</style>
