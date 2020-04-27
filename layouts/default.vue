<template>
  <v-app 
    id="inspire"
    dark
  >
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp"
               color="primary" gray app fixed align-center justify-end row>
      <p style="font-size:30px;margin-top:10px;margin-left: 40px;font-family:lato">COVID-19 UPDATES</p>
       
      <v-spacer/>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
      height="60px"
      style="font-family:lato"
    >
      <span style="margin-left: 50px;">&copy;cov19-2020</span>
      <span style="margin-left: 50px;">Developed by: <a style="text-decoration: underline; color: white;" href="https://github.com/Revel109">Abu Yusuf</a></span>
      <span style="margin-left: 50px;">API: https://corona.lmao.ninja/v2</span>
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
