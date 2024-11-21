<script setup>
import { ref } from 'vue';
import {auth} from "src/services/auth";
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import {Books} from "src/services/books";
import {User} from "src/services/User";

const router = useRouter();

const $q = useQuasar();
const step = ref('1');
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const firstName = ref('');
const nome = ref('');
const senha = ref('');
const lastName = ref('');
const acceptTerms = ref(false);

const onSubmit = async () => {
  try {
    const data = {
      email: email.value,
      password: password.value,
    }
    console.log(data)
    const resp = await auth.makeLogin(data);

    $q.notify({
      type: 'positive',
      message: 'Login efetuado com sucesso!'
    });
    await router.push('/dashboard');
  } catch (err) {
    console.log(err);
    console.log('to no catch ' + err.message);
    $q.notify({
      type: 'negative',
      message: 'Login ou senha incorretos. Por favor verifique!'
    });
  }
};

const createUser = async () => {
  await User.create(nome,senha,email).then((response) => {
    if (response.rows) {
      this.$q.notify({
        type: "positive",
        message: "Usuario criado com sucesso!",
      });
    }
  });
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="q-pa-lg q-mt-xl shadow-2">
          <q-tabs v-model="step" class="text-primary" align="center" indicator-color="green" dense>
            <q-tab name="1" label="Login" icon="login" />
            <q-tab name="2" label="Cadastro" icon="person_add" />
          </q-tabs>

          <q-separator spaced />

          <q-tab-panels v-model="step" animated>
            <q-tab-panel name="1">
              <q-card-section>
                <div class="text-h5 text-center q-mb-md">Faça login na sua conta</div>
                <div class="text-subtitle2 text-center text-grey q-mb-lg">
                  Faça login para continuar editando seus fluxos de integração
                </div>
                <q-input filled v-model="email" label="Email" type="email" dense color="green" />
                <q-input filled v-model="password" label="Senha" type="password" dense color="green" class="q-mt-md" />
                <q-checkbox v-model="rememberMe" label="Lembre de mim" color="green" class="q-mt-md" />
                <q-btn color="green" label="Logar" @click="onSubmit" unelevated class="q-mt-md full-width" />
              </q-card-section>

              <div class="text-center q-mt-md">
                <q-btn flat label="Esqueci a senha" color="green" class="q-pt-none q-pb-none" />
              </div>
            </q-tab-panel>

            <q-tab-panel name="2">
              <q-card-section>
                <div class="text-h5 text-center q-mb-md">Cadastre-se</div>
                <div class="text-subtitle2 text-center text-grey q-mb-lg">
                  Crie sua conta para começar a configurar suas integrações
                </div>
                <q-input filled v-model="email" label="Email" type="email" dense color="green" class="q-mt-md" />
                <q-input filled v-model="password" label="Senha" type="password" dense color="green" class="q-mt-md" />
                <q-checkbox v-model="acceptTerms" label="Aceito os termos e condições" color="green" class="q-mt-md" />
                <q-btn color="green" label="Cadastre-se" unelevated class="q-mt-md full-width" @click="createUser"/>
              </q-card-section>

              <div class="text-center q-mt-md text-grey">Ou siga usando</div>
              <div class="row justify-center q-mt-sm">
                <q-btn round icon="fab fa-google" outline color="red" />
                <q-btn round icon="fab fa-facebook-f" outline color="blue" class="q-ml-md" />
                <q-btn round icon="fab fa-twitter" outline color="light-blue" class="q-ml-md" />
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.shadow-2 {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
