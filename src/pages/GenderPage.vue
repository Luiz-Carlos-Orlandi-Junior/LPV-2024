<template class="bg-dark">
  <div>
    <q-card class="q-ma-md">
      <q-table
        :rows="gender"
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
              @click="editGender(props.row)"
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
          {{ isEdit ? "Editar" : "Cadastrar" }} Genero
        </q-card-section>
        <q-card-section>
          <q-form @submit="submitForm" class="q-my-md">
            <q-input
              class="q-mt-md"
              outlined
              v-model="form.Nome"
              label="Genero"
              type="text"
            />
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
          <q-btn flat label="Excluir" color="red" @click="deleteGender" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Gender } from "src/services/gender";
import { useQuasar } from "quasar";

export default {
  name: "GenderPage",
  data() {
    return {
      $q: useQuasar(),
      gender: [],
      isOpen: false,
      isEdit: false,
      loading: true,
      confirmDeleteDialog: false,
      genderToDelete: null,
      file: null,
      form: {
        Nome: "",
      },
      //voltageOptions: [
        //{ label: '110V', value: '110' },
        //{ label: '220V', value: '220' }
      //],
      columns: [
        { name: "id_genero", label: "Código", field: "id_genero", sortable: true },
        { name: "nome", label: "Genero", field: "nome", sortable: true },//
        { name: "actions", label: "Ações", field: "actions", sortable: false },
      ],
    };
  },
  methods: {
    async GetGender() {
      this.loading = true;
      await Gender.GetGender().then(resp =>{
        console.log(resp)
        this.gender = resp.data.rows
      });
      this.loading = false;
    },
    openModal() {
      this.isEdit = false;
      this.isOpen = true;
      this.resetForm();
    },
    editGender(gender) {
      this.isEdit = true;
      this.isOpen = true;
      Object.assign(this.form, gender);
    },
    async submitForm() {
      if (this.isEdit) {
        await Gender.update(this.form).then((resp) => {
          if (resp.data[0] === 1) {
            this.$q.notify({
              type: "positive",
              message: "Genero atualizado com sucesso!",
            });
          }
        });
      } else {
        await Gender.create(this.form).then((response) => {
          if (response.rows) {
            this.$q.notify({
              type: "positive",
              message: "Genero criado com sucesso!",
            });
          }
        });
      }
      await this.GetGender();
      this.isOpen = false;
    },
    confirmDelete(gender) {
      this.genderToDelete = gender;
      this.confirmDeleteDialog = true;
    },
    async deleteGender() {
      await Gender.delete(this.genderToDelete.id_genero);
      await this.GetGender();
      this.confirmDeleteDialog = false;
    },
    resetForm() {
      Object.assign(this.form, {
        Nome: ""
      });
      this.file = null;
    },
  },
  mounted() {
    this.GetGender();
  },
};
</script>
