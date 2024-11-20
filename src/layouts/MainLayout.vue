<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Sistema Biblioteca
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />

        <q-btn
          flat
          label="Sair"
          icon="logout"
          @click="logout"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { auth } from '../services/auth';

const linksList = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    link: '/dashboard'
  },
  {
    title: 'Livros',
    icon: 'book',
    link: '/books'
  },
  {
    title: 'Compras',
    icon: 'feed',
    link: '/shopping'
  },
  {
    title: 'Genders',
    icon: 'groups',
    link: '/gender'
  },
  {
    title: 'Serviços',
    icon: 'design_services',
    link: '/services'
  },
  {
    title: 'listagem',
    icon: 'inventory',
    link: '/listing'
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data() {
    return {
      linksList,
      leftDrawerOpen: false
    }
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    async logout() {
      await auth.logout();
    }
  }
})
</script>
