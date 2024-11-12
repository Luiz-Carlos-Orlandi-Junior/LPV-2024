<template>
  <div>
    <q-card class="q-ma-md">
      <q-table
        :rows="books"
        :columns="columns"
        row-key="cod"
        flat
        bordered
        :loading="loading"
      >
        <template v-slot:body-cell-ano_publicao="props">
          <q-td :props="props">
            {{ props.row.ano_publicacao.substring(0,3) }}
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              dense
              icon="edit"
              @click="editBook(props.row)"
              color="blue"
            />
            <q-btn
              flat
              dense
              icon="delete"
              @click="confirmDelete(props.row)"
              color="red"
            />
          </q-td>
        </template>
      </q-table>

      <q-btn @click="openModal" class="q-ma-md" label="ADICIONAR" color="primary" />
    </q-card>

    <q-dialog v-model="isOpen">
      <q-card>
        <q-card-section class="row items-center q-pb-none text-h6">
          {{ isEdit ? "Editar" : "Cadastrar" }} Livro
        </q-card-section>
        <q-card-section>
          <q-form @submit="submitForm" class="q-my-md">
            <q-input class="q-mt-md" outlined label="Titulo" v-model="form.titulo" type="text" required />
            <q-input
              class="q-mt-md"
              outlined
              v-model="form.autor"
              label="Autor"
              type="text"
            />
<!--            <q-select-->
<!--              class="q-mt-md"-->
<!--              outlined-->
<!--              :options="voltageOptions"-->
<!--              option-value="value"-->
<!--              option-label="label"-->
<!--              label="Voltagem"-->
<!--              v-model="form.voltage"-->
<!--              type="text"-->
<!--              required-->
<!--            />-->
            <q-input class="q-mt-md" outlined label="Editora" v-model="form.editora" type="text" required />
            <q-input class="q-mt-md" outlined label="Ano Publicação" v-model="form.ano_publicacao" type="text" required />
            <q-input class="q-mt-md" outlined label="Quantidade" v-model="form.quantidade" type="number" required />
            <q-input class="q-mt-md" outlined label="Idioma" v-model="form.idioma" type="text" required />

            <q-btn type="submit" label="Salvar" color="primary" class="q-mt-md" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmDeleteDialog">
      <q-card>
        <q-card-section>
          Tem certeza que deseja excluir o produto?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Excluir" color="red" @click="deleteBook" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Books } from "src/services/books";
import { useQuasar } from "quasar";
import moment from "moment";

export default {
  name: "BooksPage",
  data() {
    return {
      $q: useQuasar(),
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
      voltageOptions: [
        { label: '110V', value: '110' },
        { label: '220V', value: '220' }
      ],
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
        console.log(resp)
        this.books = resp.data.rows
      });
      this.loading = false;
    },
    openModal() {
      this.isEdit = false;
      this.isOpen = true;
      this.resetForm();
    },
    editBook(books) {
      this.isEdit = true;
      this.isOpen = true;
      Object.assign(this.form, books);
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
              message: "Produto criado com sucesso!",
            });
          }
        });
      }
      await this.getBooks();
      this.isOpen = false;
    },
    confirmDelete(books) {
      this.booksToDelete = books;
      this.confirmDeleteDialog = true;
    },
    async deleteBook() {
      await Books.delete(this.booksToDelete.id_livro);
      await this.getBooks();
      this.confirmDeleteDialog = false;
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
