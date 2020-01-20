<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
      <div class="text-xs-left">
        <Rooms/>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Rooms from '~/components/Rooms.vue'

export default {
  components: {
    Rooms
  }
}
</script>
