<template>
  <v-card class="mx-auto" max-width="400">
    <div v-for="item in items" :key="item.id">
      <v-img
        class="white--text align-end"
        height="200px"
        :src="item.image"
      >
        <v-card-title>{{ item.name }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">Room cost(per-night): {{ item.price }}</v-card-subtitle>

      <v-card-text class="text--primary">
        <div>Room Size: {{ item.size }}</div>

        <div>{{ item.details }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="orange"
          text
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
    </div>
  </v-card>
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
      
    }
  }
}
</script>

<style scoped>

</style>
