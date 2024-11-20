<template>
    <q-card class="link-card text-white q-my-sm" flat bordered clickable @click="openLink">
      <q-card-section class="row items-center q-pa-sm">
        <q-icon :name="icon" size="md" color="white" class="q-mr-md" />
        <div>
          <div class="text-h6">{{ title }}</div>
          <div class="text-caption text-grey-5">{{ caption }}</div>
        </div>
      </q-card-section>
    </q-card>
  </template>
  
  <script>
  export default {
    name: 'LinkCard',
    props: {
      title: { type: String, required: true },
      caption: { type: String, required: true },
      icon: { type: String, required: true },
      link: { type: String, required: true },
    },
    methods: {
      openLink() {
        window.open(this.link, '_blank');
      },
    },
  };
  </script>
  
  <style scoped>
  .link-card {
    background-color: #1E1E1E;
    border-radius: 8px;
    transition: background-color 0.3s ease;
  }
  .link-card:hover {
    background-color: #333;
  }
  </style>
  