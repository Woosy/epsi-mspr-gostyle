<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <!-- =============================================== -->
      <!-- == HEADER (search, sort by) -->
      <!-- =============================================== -->
      <template v-slot:header>
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="fas fa-search fa-sm"
            label="Rechercher"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer/>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="fas fa-search fa-sm"
              label="Trier par"
            ></v-select>
            <v-spacer/>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="blue"
                :value="false"
              >
                <v-icon small>fas fa-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="blue"
                :value="true"
              >
                <v-icon small>fas fa-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <!-- =============================================== -->
      <!-- == MAIN (table with properties) -->
      <!-- =============================================== -->
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{ item.value }}</v-card-title>

              <v-divider/>

              <v-list dense>

                <!-- Discount -->
                <v-list-item>
                  <v-list-item-content :class="{ 'blue--text': sortBy === 'discount' }">Promotion :</v-list-item-content>
                  <v-list-item-content class="align-end" :class="{ 'blue--text': sortBy === 'discount' }">{{ item['discount'] }}%</v-list-item-content>
                </v-list-item>

                <!-- Code -->
                <v-list-item>
                  <v-list-item-content :class="{ 'blue--text': sortBy === 'code' }">Code :</v-list-item-content>
                  <v-list-item-content class="align-end" :class="{ 'blue--text': sortBy === 'code' }">{{ item['code'] }}</v-list-item-content>
                </v-list-item>

                <!-- End -->
                <v-list-item>
                  <v-list-item-content :class="{ 'blue--text': sortBy === 'end' }">Fini le  :</v-list-item-content>
                  <v-list-item-content class="align-end" :class="{ 'blue--text': sortBy === 'end' }">{{ item['end'] | date }}</v-list-item-content>
                </v-list-item>

                <!-- Created at -->
                <v-list-item>
                  <v-list-item-content :class="{ 'blue--text': sortBy === 'created_at' }">Date de création :</v-list-item-content>
                  <v-list-item-content class="align-end" :class="{ 'blue--text': sortBy === 'created_at' }">{{ item['created_at'] | date }}</v-list-item-content>
                </v-list-item>

                <!-- Updated at -->
                <v-list-item>
                  <v-list-item-content :class="{ 'blue--text': sortBy === 'updated_at' }">Date de mise à jour :</v-list-item-content>
                  <v-list-item-content class="align-end" :class="{ 'blue--text': sortBy === 'updated_at' }">{{ item['updated_at'] | date }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <!-- =============================================== -->
      <!-- == FOOTER (items per page, page naviguator) -->
      <!-- =============================================== -->
      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items par page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon small>fas fa-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer/>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} sur {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon small>fas fa-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon small>fas fa-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import ApiService from '@/services/api.service'

export default {
  data () {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'created_at',
      keys: [
        'Discount',
        'Code',
        'End',
        'Created_at',
        'Updated_At'
      ],
      items: []
    }
  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== `Name`)
    }
  },
  methods: {
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },
    fetchCoupons () {
      ApiService.get('/coupons')
        .then(res => {
          this.items = res.data.coupons
        })
        .catch(err => {
          console.error(err)
        })
    }

  },
  created () {
    this.fetchCoupons()
  },
  filters: {
    date: function (value) {
      const date = new Date(value)

      const day = (`0${date.getDate()}`).slice(-2)
      const month = (`0${date.getMonth() + 1}`).slice(-2)
      const year = date.getFullYear().toString()

      const hours = (`0${date.getHours()}`).slice(-2)
      const minutes = (`0${date.getMinutes()}`).slice(-2)
      return `${day}/${month}/${year} à ${hours}h${minutes}`
    }
  }
}
</script>
