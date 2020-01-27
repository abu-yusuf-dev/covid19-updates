<template>
  <v-card class="ma-2">
    <v-img
      class="white--text align-end"
      height="300px"
      :src="item.image"
    >
      <v-card-title class="pa-1"><p class="imageText">{{ item.name }}</p></v-card-title>
    </v-img>


    <v-card-text class="text--primary">
      <div class="pb-0">Room cost(per-night): {{ item.price }}</div>
      <div>Room Size: {{ item.size }}</div>

      <div>{{ item.details }}</div>
    </v-card-text>
    <v-spacer/>
    <div>User Info:</div>

    <v-spacer/>

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
      />

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      />

      <v-text-field
        v-model="phone_number"
        :rules="commonRules"
        label="Phone no."
        required
      />

      <v-text-field
        v-model="address"
        :rules="commonRules"
        label="Address"
        placeholder="H#24, R#12, Mirpur-12, Dhaka"
        required
      />

      <v-btn
        color="info"
        class="mr-4"
        @click="validate"
      >
        Book
      </v-btn>

    </v-form>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Congrats!</v-card-title>

        <v-card-text>
          Your booking is confirmed!
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="red"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>
</template>

<script>
  export default {
    middleware: 'authenticated',
    data: () => ({
      dialog: false,
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      commonRules: [
        v => !!v || 'Name is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      phone_number: '',
      address: '',
      select: null,
      item: '',
      checkbox: false,
      auth: ''
    }),
    async mounted() {
      this.auth = JSON.parse(localStorage.getItem('auth'))
      if (!this.auth) {
      this.$router.push({
          path: '/login'
        })
      }
      if (this.auth) {
        this.name = this.auth.user.first_name
        this.email = this.auth.user.email
      } else {
        this.name && this.email === ''
      }
      this.roomId = this.$route.params.id
      await this.getRoomDetails()
    },
    methods: {
      async validate () {
        if (this.$refs.form.validate()) {
          try {
            let payload = {
              'user_name': this.auth.user.username,
              'user_email': this.email,
              'room_name': this.item.name,
              'room_id': this.item.id,
              'phone_number': this.phone_number,
              'address': this.address
            }
            const response = await this.$axios.post('/room/book/', payload)
            if (response && response.status === 201) {
              this.name = ''
              this.email = ''
              this.phone_number = ''
              this.address = ''
              this.dialog = true
            }
            } catch (error) {
              console.log('error: ', error.response)
            }
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      async getRoomDetails () {
      try {
        const response = await this.$axios.get('/room/' + this.roomId)
        if (response) {
          this.item = response.data
        }
      } catch (error) {
        console.log('error: ', error.response)
      }
    },
    },
  }
</script>

<style scoped>
.imageText {
  background: rgba(0, 0, 0, 0.562);
  color: rgb(133, 204, 86);
  font-size: 20px;
}
</style>
