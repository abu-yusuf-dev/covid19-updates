<template>
  <v-app 
    id="inspire"
    dark
  >
  <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="primary" gray app fixed align-center justify-end row>
      <div style="width: 150px" class="ml-0">
      </div>
      <p class="title hidden-sm-and-down mb-0 theme-text-light">HMS Project</p>
       
      <v-spacer></v-spacer>
      <v-btn icon to="/login" color="primary">
        Login
      </v-btn>
      <v-btn icon @click="logout" color="primary">
        <v-icon>power_settings_new</v-icon> 
      </v-btn>

    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy;hms-2020</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>

<style scoped>
.login {
  color: primary;
}
</style>
