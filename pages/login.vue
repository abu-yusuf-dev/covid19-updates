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
  methods: {
    login () {
      const payload = {
        username: this.username,
        password: this.password
      }
      const response = this.$axios.post('/login/', payload)
      console.log('response: ', response)
      const auth = response.data
      this.$store.commit('setAuth', auth) // mutating to store for client rendering
      localStorage.setItem('auth', JSON.stringify(auth)) // set auth in localstorage
    }
  }
}
</script>
