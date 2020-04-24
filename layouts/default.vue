<template>
  <v-app 
    id="inspire"
    dark
  >
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp"
               color="primary" gray app fixed align-center justify-end row>
      <div style="width: 150px" class="ml-0"/>
      <p class="title hidden-sm-and-down mb-0 theme-text-light">COVID-19 UPDATES</p>
       
      <v-spacer/>
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
      <span>&copy;cov19-2020</span>
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
      title: 'Vuetify.js',

      user: null
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>
.login {
  color: primary;
}
</style>
