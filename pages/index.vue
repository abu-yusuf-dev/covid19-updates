<template>
  <v-layout justify-center>
    <v-flex xs12>
      <v-card class="mb-3 pa-4">
        <v-layout>
          <v-flex xs12>
            <v-card-title class="pa-0 subheading">
              Search
            </v-card-title>
            <v-layout xs6 row class="mb-2">
              <v-flex xs6 class="pr-2">
                <v-combobox
                  v-model="countryName"
                  label="By Specific Country"
                  hint="country name or country code"
                  @input.native="e => countryName = e.target.value"
                  @click:clear="countryName = 'All'"
                  clearable
                  hide-no-data
                />
              </v-flex>
              <v-flex xs6 class="pr-2">
                <v-combobox
                  :items="['true', 'false']"
                  v-model="showAllCountryReport"
                  label="All Country details"
                  hint="all the details report of a country"
                  @input.native="e => showAllCountryReport = e.target.value"
                  clearable
                  hide-no-data
                />
              </v-flex>
              <v-flex xs6 class="pr-2">
                <v-combobox
                  :items="['true', 'false']"
                  v-model="showYesterday"
                  label="Include yesterday data"
                  hint="you can show yesterday data"
                  @input.native="e => showYesterday = e.target.value"
                  clearable
                  hide-no-data
                />
              </v-flex>
            </v-layout>

          </v-flex>

        </v-layout>
        <v-layout xs6 row class="autocomplete-filter" >
          <v-flex class="text-xs-right">
            <v-btn color="primary" class="ml-1" @click="getCountryCases">
              Search
            </v-btn>
            <v-btn color="primary" class="ml-1" @click="getAllCases">
              Clear
            </v-btn>
          </v-flex>
        </v-layout>

      </v-card>

      <v-data-table
        :headers="headers"
        :items="items"
        :loading="isLoadingData"
        hide-actions
        class="elevation-1"
      >
        <v-progress-linear height="5" slot="progress" color="primary" indeterminate />

        <template slot="items" slot-scope="props">
          <td class="click-able">
            {{ props.item.country ? props.item.country: 'All' }} <br>
            <img v-if="props.item.countryInfo" height="20" width="40" :src="props.item.countryInfo.flag">
          </td>
          <td class="click-able">{{ props.item.cases }}</td>
          <td class="click-able">{{ props.item.todayCases }}</td>
          <td class="click-able">{{ props.item.deaths }}</td>
          <td class="click-able">{{ props.item.todayDeaths }}</td>     
          <td class="click-able">{{ props.item.recovered }}</td>
          <td class="click-able">{{ props.item.active }}</td>
          <td class="click-able">{{ props.item.critical }}</td>
          <td class="click-able">{{ props.item.casesPerOneMillion }}</td>
          <td class="click-able">{{ props.item.deathsPerOneMillion }}</td>
          <td class="click-able">{{ props.item.tests }}</td>
          <td class="click-able">{{ props.item.testsPerOneMillion }}</td>
          <!-- <td class="click-able">{{ props.item.updated }}</td> -->
        </template>
      </v-data-table>
      <!-- <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" :total-visible="11" :length="pages" next-icon="arrow_forward" prev-icon="arrow_back"></v-pagination>
      </div> -->
    </v-flex>
  </v-layout>
</template>


<script>

export default {
  components: {

  },
  data () {
    return {
      items: [],
      isLoadingData: false,
      countryName: '',
      showAllCountryReport: '',
      showYesterday: false,
      headers: [
        { text: 'Country', value: 'country', align: 'left', sortable: false, },
        { text: 'Cases', value: 'cases', align: 'left', sortable: false, },
        { text: 'Today Cases', value: 'todayCases', sortable: false, },
        { text: 'Deaths', value: 'deaths', sortable: false, },
        { text: 'Today Deaths', value: 'todayDeaths', sortable: false, },
        { text: 'Recovered', value: 'recovered', sortable: false, },
        { text: 'Active', value: 'active', sortable: false, },
        { text: 'Critical', value: 'critical', sortable: false, },
        { text: 'Cases Per 1 Million', value: 'casesPerOneMillion', sortable: false, },
        { text: 'Deaths Per 1 Million', value: 'deathsPerOneMillion', sortable: false, align: 'left' },
        { text: 'Tests', value: 'tests', sortable: false, align: 'left' },
        { text: 'Tests Per 1 Million', value: 'testsPerOneMillion', sortable: false, align: 'left' }
      ],
    }
  },
  async mounted () {
    await this.getAllCases()
  },
  methods: {
    async getAllCases () {
      this.isLoadingData = true
      this.items = []
      this.countryName = ''
      this.showAllCountryReport = ''
      let response = await this.$axios.get('/all?yesterday=' + this.showYesterday)
      this.isLoadingData = false
      this.items.push(response.data)
    },
    async getCountryCases () {
      this.items = []
      let response
      if (this.showAllCountryReport != 'true') {
        if (this.countryName != '' || this.countryName != null) {
          this.isLoadingData = true
          response = await this.$axios.get('/countries/' + this.countryName + '?yesterday=', this.showYesterday)
          this.items.push(response.data)
          this.isLoadingData = false
        }
      } else {
        this.isLoadingData = true
        response = await this.$axios.get('/countries?yesterday=' + this.showYesterday)
        this.items = response.data
        this.isLoadingData = false
      }
    }
  }
}
</script>
