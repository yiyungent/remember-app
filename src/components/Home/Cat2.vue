<template>
  <v-container fluid>
    <v-row>
      <template v-for="item in items">
        <v-col cols="6" sm="6" md="3" :key="item.courseBox.id">
          <v-card :to="{ name: 'CourseBox', params: { id: item.courseBox.id } }" class="mx-auto">
            <v-img class="white--text" height="100px" :src="item.courseBox.picUrl">
              <v-card-title class="card-title">
                <v-icon x-small color="white">mdi-heart</v-icon>
                <span>{{item.learnNum}}</span>
              </v-card-title>
            </v-img>
            <v-card-text class="card-text">{{item.courseBox.name}}</v-card-text>
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
      items: [
        {
          courseBox: {
            id: 1,
            name: "loading",
            description: "loading",
            creator: {
              id: 0,
              name: "loading",
              userName: "loading",
              desc: null,
              avatar: "https://static.runoob.com/images/mix/img_fjords_wide.jpg"
            },
            picUrl: "https://static.runoob.com/images/mix/img_fjords_wide.jpg"
          },
          learnNum: 0,
          totalSpendTime: 0,
          rankingNum: 1
        }
      ]
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
        url: "/api/Home/RankingCourseBox",
        params: {
          number: 10
        }
      }).then(res => {
        if (res.data.code > 0) {
          this.items = res.data.data;
        } else {
        }
      });
    }
  }
};
</script>
<style scoped>
</style>