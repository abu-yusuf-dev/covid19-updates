<template>
  <v-app 
    id="inspire"
    dark
  >
  <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="primary" gray app fixed align-center justify-end row>
      <div style="width: 150px" class="ml-0">
      </div>
      <p class="title hidden-sm-and-down mb-0 theme-text-light" @click="backToHome">HMS Project</p>
       
      <v-spacer></v-spacer>
      <v-btn v-if="user" color="primary">
        Welcome {{ user.user.username }}
      </v-btn>
      <v-btn v-else icon to="/login" color="primary">
        Login
      </v-btn>
      <v-btn icon @click="logout" color="primary">
        <v-icon @click="logout">power_settings_new</v-icon> 
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
      title: 'Vuetify.js',

      user: null
    }
  },
  mounted() {
    this.getUserAuth()
  },
  methods: {
    getUserAuth () {
      if (this.$store.state.auth) {
        this.user = this.$store.state.auth
      } else {
        let auth = localStorage.getItem('auth')
        if (auth && auth != 'undefined') {
          this.user = JSON.parse(auth)
        }
      }
    },
    logout () {
      this.user = null
      localStorage.removeItem('auth')
      this.$router.push({
        path: '/login'
      })
    },
    backToHome () {
      console.log(this.$route.path)
      if (this.$route.path != '/') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.login {
  color: primary;
}
</style>
