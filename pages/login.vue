<template>
  <v-content>
    <v-container
      class="fill-height"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
        >
          <v-card class="elevation-1">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="username"
                  label="Username"
                  name="username"
                  prepend-icon="person"
                  type="text"
                />

                <v-text-field
                  id="password"
                  v-model="password"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  // middleware: 'authenticated',
  layout: 'default',
  props: {
    // source: String
  },
  data () {
    return {
      username: null,
      password: null
    }
  },
  mounted() {
    let auth = localStorage.getItem('auth')
    if (auth && auth != 'undefined') {
      this.$router.push({
        path: '/'
      })
    }
  },
  methods: {
    async login () {
      const payload = {
        username: this.username,
        password: this.password
      }
      let res = await this.$axios.post('/login/', payload)
      if (res && res.status === 200) {
        console.log('response: ', res)
        const auth = res.data
        this.$store.commit('setAuth', auth) // mutating to store for client rendering
        localStorage.setItem('auth', JSON.stringify(auth)) // set auth in localstorage
        window.location.reload(true)
      }
    }
  }
}
</script>
