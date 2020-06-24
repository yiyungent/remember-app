<template>
  <v-container fluid>
    <v-row v-show="showLoading">
      <v-col class="mx-auto py-0" md="8">
        <div class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <template v-for="item in items">
        <v-col cols="6" sm="6" md="3" style="padding: 6px;" :key="item.article.id">
          <v-card :to="{ name: 'ArticleBox', params: { id: item.article.id } }" class="mx-auto">
            <v-img
              class="white--text"
              height="100px"
              :src="item.article.picUrl"
              :lazy-src="item.article.picUrl"
            >
              <v-card-title class="card-title">
                <v-icon x-small color="white">mdi-heart</v-icon>
                <span>{{item.favNum}}</span>
              </v-card-title>
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-card-text
              style="height:32px;"
              class="card-text"
            >{{item.article.title | subStrPretty(5)}}</v-card-text>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          article: { id: 1, title: "热门1", picUrl: "" },
          favNum: 123
        },
        {
          article: { id: 2, title: "热门2", picUrl: "" },
          favNum: 123
        },
        {
          article: { id: 3, title: "热门2", picUrl: "" },
          favNum: 123
        },
        {
          article: { id: 4, title: "热门2", picUrl: "" },
          favNum: 123
        },
        {
          article: { id: 5, title: "热门2", picUrl: "" },
          favNum: 123
        },
        {
          article: { id: 6, title: "热门2", picUrl: "" },
          favNum: 123
        },
        {
          article: { id: 7, title: "热门2", picUrl: "" },
          favNum: 123
        },
        {
          article: { id: 8, title: "热门2", picUrl: "" },
          favNum: 123
        },
        {
          article: { id: 9, title: "热门2", picUrl: "" },
          favNum: 123
        },
        {
          article: { id: 10, title: "热门2", picUrl: "" },
          favNum: 123
        },
        {
          article: { id: 11, title: "热门2", picUrl: "" },
          favNum: 123
        },
        {
          article: { id: 12, title: "热门2", picUrl: "" },
          favNum: 123
        },
        {
          article: { id: 13, title: "热门2", picUrl: "" },
          favNum: 123
        },
        {
          article: { id: 14, title: "热门2", picUrl: "" },
          favNum: 123
        },
        {
          article: { id: 15, title: "热门2", picUrl: "" },
          favNum: 123
        },
        {
          article: { id: 16, title: "热门2", picUrl: "" },
          favNum: 123
        }
      ],
      showLoading: false //true
    };
  },
  created() {
    // this.loadList();
  },
  mounted() {},
  methods: {
    loadList() {
      this.$http({
        method: "get",
        url: "/api/Home/LastCourseBox",
        params: {
          number: 10
        }
      }).then(res => {
        if (res.data.code > 0) {
          this.items = res.data.data;
        } else {
        }
        this.showLoading = false;
      });
    }
  }
};
</script>
<style scoped>
</style>