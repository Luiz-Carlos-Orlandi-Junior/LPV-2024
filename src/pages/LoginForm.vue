<template>
    <q-layout view="hHh lpR fFf">
      <q-page-container>
        <q-page class="flex flex-center">
          <q-card class="q-pa-lg q-mt-xl shadow-2">
            <!-- Tabs for login and signup -->
            <q-tabs v-model="step" class="text-primary" align="center" indicator-color="green" dense>
              <q-tab name="1" label="Login" icon="login" />
              <q-tab name="2" label="Cadastro" icon="person_add" />
            </q-tabs>
  
            <q-separator spaced />
  
            <!-- Panels for each tab -->
            <q-tab-panels v-model="step" animated>
              <!-- Login Panel -->
              <q-tab-panel name="1">
                <q-card-section>
                  <div class="text-h5 text-center q-mb-md">Faça login na sua conta</div>
                  <div class="text-subtitle2 text-center text-grey q-mb-lg">
                    Faça login para continuar editando seus fluxos de integração
                  </div>
                  <q-input filled v-model="email" label="Email" type="email" dense color="green" />
                  <q-input filled v-model="password" label="Senha" type="password" dense color="green" class="q-mt-md" />
                  <q-checkbox v-model="rememberMe" label="Lembre de mim" color="green" class="q-mt-md" />
                  <q-btn color="green" label="Logar" unelevated class="q-mt-md full-width" />
                </q-card-section>
  
                <div class="text-center q-mt-md">
                  <q-btn flat label="Esqueci a senha" color="green" class="q-pt-none q-pb-none" />
                </div>
  
                <div class="text-center q-mt-md text-grey">Conectar-se usando</div>
                <div class="row justify-center q-mt-sm">
                  <q-btn round icon="fab fa-google" outline color="red" />
                  <q-btn round icon="fab fa-facebook-f" outline color="blue" class="q-ml-md" />
                  <q-btn round icon="fab fa-twitter" outline color="light-blue" class="q-ml-md" />
                </div>
              </q-tab-panel>
  
              <!-- Signup Panel -->
              <q-tab-panel name="2">
                <q-card-section>
                  <div class="text-h5 text-center q-mb-md">Cadastre-se</div>
                  <div class="text-subtitle2 text-center text-grey q-mb-lg">
                    Crie sua conta para começar a configurar suas integrações
                  </div>
                  <q-input filled v-model="firstName" label="Primeiro nome" dense color="green" />
                  <q-input filled v-model="lastName" label="Sobrenome" dense color="green" class="q-mt-md" />
                  <q-input filled v-model="email" label="Email" type="email" dense color="green" class="q-mt-md" />
                  <q-input filled v-model="password" label="Senha" type="password" dense color="green" class="q-mt-md" />
                  <q-checkbox v-model="acceptTerms" label="Aceito os termos e condições" color="green" class="q-mt-md" />
                  <q-btn color="green" label="Cadastre-se" unelevated class="q-mt-md full-width" />
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
  
  <script>
  export default {
    data() {
      return {
        step: '1',
        email: '',
        password: '',
        rememberMe: false,
        firstName: '',
        lastName: '',
        acceptTerms: false,
      };
    }
  };
  </script>
  
  <style scoped>
  .q-page {
    background: linear-gradient(135deg, #e0f7fa, #a5d6a7);
    min-height: 100vh;
  }
  
  .q-card {
    max-width: 500px;
    width: 100%;
  }
  
  .shadow-2 {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  </style>
  