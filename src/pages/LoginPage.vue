<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view>
        <q-page class="flex flex-center q-pa-lg">
    
          <div class="q-pa-md q-ma-md" style="max-width: 400px; width: 100%;">
            <q-card class="q-pa-md">
              <q-card-section>
                <div class="text-h4 text-bold q-mb-md text-center">Login Livraria</div>
                <div class="text-grey-7 q-mb-lg text-center">
                  Por favor faça login em sua conta
                </div>

                <q-input
                  v-model="form.email.value"
                  :error="form.email.error"
                  :error-message="form.email.msg"
                  label="E-mail"
                  placeholder="Digite seu e-mail"
                  class="q-mb-md"
                >
                  <template v-slot:append>
                    <q-icon name="email"></q-icon>
                  </template>
                </q-input>

               
                <q-input
                  v-model="form.password.value"
                  :error="form.password.error"
                  :error-message="form.password.msg"
                  label="Senha"
                  type="password"
                  placeholder="Digite sua senha"
                  class="q-mb-md"
                >
                  <template v-slot:append>
                    <q-icon name="lock"></q-icon>
                  </template>
                </q-input>

                <q-btn
                  color="indigo"
                  label="Login"
                  @click="submitLogin"
                  class="full-width q-mt-md"
                />
              </q-card-section>
            </q-card>
          </div>
        </q-page>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      form: {
        email: {
          value: '',
          error: false,
          msg: ''
        },
        password: {
          value: '',
          error: false,
          msg: ''
        }
      }
    }
  },
  methods: {
    submitLogin() {
      // Lógica de login
    }
  }
});
</script>
