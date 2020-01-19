<template>
  <v-content>
    <v-container
      class="fill-height"
      fluid
    >
      <v-card class="elevation-1">
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>Sign-up form</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="username"
              label="Username"
              name="username"
              prepend-icon="emoji_people"
              type="text"
            />

            <v-text-field
              v-model="name"
              label="Name"
              name="name"
              prepend-icon="person"
              type="text"
            />

            <v-text-field
              v-model="email"
              label="Email"
              name="email"
              prepend-icon="email"
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
          <v-btn color="primary" @click="signUp">Sign-up</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
export default {
  middleware: 'authenticated',
  layout: 'default',
  props: {
    // source: String
  },
  data () {
    return {
      username: null,
      name: null,
      email: null,
      password: null
    }
  },
  methods: {
    async signUp () {
      const payload = {
        username: this.username,
        first_name: this.name,
        email: this.email,
        password: this.password
      }
      const response = await this.$axios.post('/register/', payload)
      if (response && response.status === 201) {
        this.$router.push({
          path: '/login'
        })
      }
    }
  }
}
</script>
