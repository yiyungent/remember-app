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
        <v-col cols="6" sm="6" md="3" style="padding: 6px;" :key="item.courseBox.id">
          <v-card :to="{ name: 'CourseBox', params: { id: item.courseBox.id } }" class="mx-auto">
            <v-img
              class="white--text"
              height="100px"
              :src="item.courseBox.picUrl"
              :lazy-src="item.courseBox.picUrl"
            >
              <v-card-title class="card-title">
                <v-icon x-small color="white">mdi-heart</v-icon>
                <span>{{item.learnNum}}</span>
              </v-card-title>
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-card-text style="height:32px;" class="card-text">{{item.courseBox.name | subStrPretty(5)}}</v-card-text>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Home_Cat2",
  data() {
    return {
      items: [],
      showLoading: true
    };
  },
  created() {
    this.loadList();
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
  },
  metaInfo: {
    title: "最新课程 - remember"
  }
};
</script>
<style scoped>
</style>