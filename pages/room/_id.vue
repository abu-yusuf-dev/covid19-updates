<template>
  <v-card
    class="d-flex flex-wrap mb-6"
    flat
    tile
  > 
    <v-card class="ma-2">
      <v-img
        class="white--text align-end"
        height="250px"
        :src="item.image"
      >
        <v-card-title class="pa-1"><p class="imageText">{{ item.name }}</p></v-card-title>
      </v-img>


      <v-card-text class="text--primary">
        <div class="pb-0">Room cost(per-night): {{ item.price }}</div>
        <div>Room Size: {{ item.size }}</div>

        <div>{{ item.details }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="orange"
          text
          @click="roomBooking(item.id)"
        >
          Book Now
        </v-btn>

        <v-btn
          color="orange"
          text
        >
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>

export default {
  middleware: 'authenticated',
  components: {
  },
  data () {
    return {
      item: [],
      roomId: ''
    }
  },
  async mounted() {
    this.roomId = this.$route.params.id
    await this.getRoomDetails()
  },
  methods: {
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
    roomBooking (id) {
      this.$router.push('/room/book/' + id)
    }
  }
}
</script>

<style scoped>
.imageText {
  background: rgba(0, 0, 0, 0.562);
  color: rgb(133, 204, 86);
  font-size: 20px;
}
</style>
