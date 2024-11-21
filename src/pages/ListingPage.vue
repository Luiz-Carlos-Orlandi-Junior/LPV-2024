<template>
  <q-page class="bg-white">
    <q-card flat bordered class="q-mb-md" v-for="livro in books" :key="livro">
      <q-card-section class="bg-white">
        <div class="text-subtitle1"
        >
          {{livro.titulo}}
        </div>
        <div class="text-caption text-grey">
          {{livro.autor}}
        </div>
        <div class="text-caption text-grey">
          {{livro.preco_unitario}}
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn @click="buyBook(livro)">COMPRAR</q-btn>
      </q-card-actions>
    </q-card>
     </q-page>

</template>

<script>
import { Books } from "src/services/books";
import { useQuasar } from "quasar";
import moment from "moment";
import {useRouter as router} from "vue-router"


export default {
  name: "BooksPage",
  data() {
    return {
      $q: useQuasar(),
      $router: router(),
      books: [],
      isOpen: false,
      isEdit: false,
      loading: true,
      confirmDeleteDialog: false,
      booksToDelete: null,
      file: null,
      form: {
        titulo: "",
        autor: "",
        ano_publicacao: "",
        quantidade: 0,
        editora: "",
        idioma: "",
      },
      columns: [
        { name: "id_livro", label: "Código", field: "id_livro", sortable: true },
        { name: "titulo", label: "Título", field: "titulo", sortable: true },
        { name: "autor", label: "Autor", field: "autor" },
        { name: "ano_publicacao", label: "Ano", field: "ano_publicacao" },
        { name: "quantidade", label: "Qtd. Estoque", field: "quantidade" },
        { name: "actions", label: "Ações", field: "actions", sortable: false },
      ],
    };
  },
  methods: {
    async getBooks() {
      this.loading = true;
      await Books.getBooks().then(resp =>{
        this.books = resp.data.rows
      });
      this.loading = false;
    },
    buyBook(book){
      localStorage.setItem('livro', JSON.stringify(book))
      this.$router.push('/shopping');
      if (book.rows) {
        this.$q.notify({
          type: "positive",
          message: "Comprado criado com sucesso!",
        });
      }
    },
    async submitForm() {
      if (this.isEdit) {
        await Books.update(this.form).then((resp) => {
          if (resp.data[0] === 1) {
            this.$q.notify({
              type: "positive",
              message: "Produto atualizado com sucesso!",
            });
          }
        });
      } else {
        this.form.ano_publicacao = moment(`${this.form.ano_publicacao}-01-01`).format('YYYY-MM-DD')
        await Books.create(this.form).then((response) => {
          if (response.rows) {
            this.$q.notify({
              type: "positive",
              message: "Comprado criado com sucesso!",
            });
          }
        });
      }
      await this.getBooks();
      this.isOpen = false;
    },

    resetForm() {
      Object.assign(this.form, {
        titulo: "",
        autor: "",
        ano_publicacao: "",
        quantidade: 0,
        editora: "",
        idioma: "",
      });
      this.file = null;
    },
  },
  mounted() {
    this.getBooks();
  },
};
</script>

<style>
/* Adicione estilos personalizados, se necessário */
</style>
