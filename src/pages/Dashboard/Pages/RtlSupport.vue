<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
    >
      <md-card>
        <md-card-header class="md-card-header-text md-card-header-warning">
          <div class="card-text">
            <h4 class="title"></h4>
            <p class="category"></p>
          </div>
        </md-card-header>
        <md-card-content>
          <md-table v-model="users" table-header-color="orange">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="">{{ item.id }}</md-table-cell>
              <md-table-cell md-label="">{{
                item.name
              }}</md-table-cell>
              <md-table-cell md-label="">{{
                item.salary
              }}</md-table-cell>
              <md-table-cell md-label="">{{
                item.country
              }}</md-table-cell>
            </md-table-row>
          </md-table>
        </md-card-content>
      </md-card>
    </div>
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
    >
      <nav-tabs-card>
        <template slot="content">
          <span class="md-nav-tabs-title">:</span>
          <md-tabs md-sync-route class="md-rose" md-alignment="left">
            <md-tab id="tab-home" md-label="" md-icon="bug_report">
              <md-table v-model="firstTabs" @md-selected="onSelect">
                <md-table-row
                  slot="md-table-row"
                  slot-scope="{ item }"
                  md-selectable="multiple"
                  md-auto-select
                >
                  <md-table-cell>{{ item.tab }}</md-table-cell>
                  <md-table-cell>
                    <md-button class="md-just-icon md-simple md-primary">
                      <md-icon>edit</md-icon>
                      <md-tooltip md-direction="top">Edit</md-tooltip>
                    </md-button>
                    <md-button class="md-just-icon md-simple md-danger">
                      <md-icon>close</md-icon>
                      <md-tooltip md-direction="top">Close</md-tooltip>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </md-tab>

            <md-tab id="tab-pages" md-label="" md-icon="code">
              <md-table v-model="secondTabs" @md-selected="onSelect">
                <md-table-row
                  slot="md-table-row"
                  slot-scope="{ item }"
                  md-selectable="multiple"
                  md-auto-select
                >
                  <md-table-cell>{{ item.tab }}</md-table-cell>
                  <md-table-cell>
                    <md-button class="md-just-icon md-simple md-primary">
                      <md-icon>edit</md-icon>
                      <md-tooltip md-direction="top">Edit</md-tooltip>
                    </md-button>
                    <md-button class="md-just-icon md-simple md-danger">
                      <md-icon>close</md-icon>
                      <md-tooltip md-direction="top">Close</md-tooltip>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </md-tab>

            <md-tab id="tab-posts" md-label="" md-icon="cloud">
              <md-table v-model="thirdTabs" @md-selected="onSelect">
                <md-table-row
                  slot="md-table-row"
                  slot-scope="{ item }"
                  md-selectable="multiple"
                  md-auto-select
                >
                  <md-table-cell>{{ item.tab }}</md-table-cell>
                  <md-table-cell>
                    <md-button class="md-just-icon md-simple md-primary">
                      <md-icon>edit</md-icon>
                      <md-tooltip md-direction="top">Edit</md-tooltip>
                    </md-button>
                    <md-button class="md-just-icon md-simple md-danger">
                      <md-icon>close</md-icon>
                      <md-tooltip md-direction="top">Close</md-tooltip>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </md-tab>
          </md-tabs>
        </template>
      </nav-tabs-card>
    </div>
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
    >
      <div class="md-layout">
        <div class="md-layout-item">
          <pricing-card icon-color="icon-success">
            <h6 slot="category" class="category"></h6>
            <md-icon slot="icon">home</md-icon>
            <h3 slot="title" class="title">29$</h3>
            <p slot="description" class="card-description">
            </p>
            <md-button slot="footer" class="md-success md-round"
              ></md-button
            >
          </pricing-card>
        </div>
        <div class="md-layout-item">
          <pricing-card card-class="md-card-plain" icon-color="icon-black">
            <h6 slot="category" class="category"> </h6>
            <md-icon slot="icon">weekend</md-icon>
            <h3 slot="title" class="title black-color"></h3>
            <p slot="description" class="card-description">
            </p>
            <md-button slot="footer" class="md-white md-round"
              > </md-button
            >
          </pricing-card>
        </div>
        <div class="md-layout-item md-size-90">
          <testimonial-card>
            <template slot="header-icon">format_quote</template>
            <template slot="content">
              <h5 class="description">
              </h5>
            </template>
            <template slot="footer">
              <h4 class="title"> </h4>
              <h6 class="category"> </h6>
              <div class="avatar">
                <a href="#pablo">
                  <img class="img" :src="profileCard" />
                </a>
              </div>
            </template>
          </testimonial-card>
        </div>
      </div>
    </div>
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
    >
      <time-line plain type="simple">
        <time-line-item inverted badge-type="danger" badge-icon="card_travel">
          <span slot="header" class="badge badge-danger">جهة أي</span>
          <p slot="content">
          </p>

          <h6 slot="footer">
            <i class="ti-time"></i>
            مدن أن هُزم سكان, مكن.
          </h6>
        </time-line-item>

        <time-line-item inverted badge-type="success" badge-icon="extension">
          <span slot="header" class="badge badge-success"></span>
          <p slot="content">
          </p>
        </time-line-item>

        <time-line-item inverted badge-type="info" badge-icon="fingerprint">
          <span slot="header" class="badge badge-info">هذا غينيا</span>
          <div slot="content">
            <p>
            </p>
            <hr />
            <drop-down>
              <md-button
                slot="title"
                class="md-button md-info md-round dropdown-toggle"
                data-toggle="dropdown"
              >
                <md-icon>build</md-icon>
              </md-button>
              <ul class="dropdown-menu dropdown-menu-right">
                <li><a href="#"></a></li>
                <li><a href="#"> </a></li>
                <li><a href="#"> </a></li>
                <li><a href="#"> </a></li>
              </ul>
            </drop-down>
          </div>
        </time-line-item>
      </time-line>
    </div>
  </div>
</template>

<script>
import {
  NavTabsCard,
  TimeLine,
  TimeLineItem,
  PricingCard,
  TestimonialCard
} from "@/components";

export default {
  components: {
    NavTabsCard,
    PricingCard,
    TimeLine,
    TimeLineItem,
    TestimonialCard
  },
  props: {
    profileCard: {
      type: String,
      default: "./img/faces/card-profile1-square.jpg"
    }
  },
  data() {
    return {
      selected: [],
      firstTabs: [
        {
          tab:
            " "
        },
        { tab: "." },
        { tab: "." }
      ],
      secondTabs: [
        {
          tab:
            "."
        },
        {
          tab:
            "."
        },
        {
          tab:
            "."
        }
      ],
      thirdTabs: [
        {
          tab:
            "."
        },
        {
          tab:
            "."
        },
        {
          tab:
            "."
        }
      ],
      users: [
        {
          id: 1,
          name: "",
          salary: "$36,738",
          country: " "
        },
        {
          id: 2,
          name: "",
          salary: "$23,738",
          country: ""
        },
        {
          id: 3,
          name: "",
          salary: "$56,142",
          country: ""
        },
        {
          id: 4,
          name: "",
          salary: "$38,735",
          country: "."
        }
      ]
    };
  },
  methods: {
    onSelect: function(items) {
      this.selected = items;
    }
  }
};
</script>

<style lang="css"></style>
