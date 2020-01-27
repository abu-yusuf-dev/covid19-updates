<template>
 
  <v-layout row wrap>
    <v-flex sm4 v-for="item in items" :key="item.id">
      <v-card class="ma-2">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="item.image"
        >
          <v-card-title class="pa-1"><p class="imageText">{{ item.name }}</p></v-card-title>
        </v-img>


        <v-card-text class="text--primary">
          <div>Room cost(per-night): {{ item.price }}</div>
          <div>Room Size: {{ item.size }}</div>

          <div>{{ item.details }}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="orange"
            text
            @click="roomDetailspage(item.id)"
          >
            Details
          </v-btn>

          <v-btn
            color="orange"
            text
          >
            Share
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      items: []
    }
  },
  async mounted() {
    await this.getRooms()
  },
  methods: {
    async getRooms () {
      try {
        const response = await this.$axios.get('/rooms/')
        if (response) {
          this.items = response.data.results
        }
      } catch (error) {
        console.log('error: ', error.response)
      }
    },
    roomDetailspage (id) {
      this.$router.push('room/' + id)
    }
  }
}
</script>

<style scoped>
.imageText {
  /* background: rgba(0, 0, 0, 0.507); */
  background: rgba(0, 0, 0, 0.562);
  color: rgb(133, 204, 86);
  font-size: 20px;
}
</style>
