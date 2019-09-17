<template>
  <v-app id="inspire">
    <v-content id="content">
      <v-container fluid>
        <v-row align="start" justify="center">
          <v-col style="padding:0;" md="8">
            <d-player :options="playerOptions" ref="player"></d-player>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-tabs fixed-tabs>
              <v-tab>简介</v-tab>
              <v-tab>评论</v-tab>
              <v-tab>测试</v-tab>
            </v-tabs>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12">
            <div>Top western road trips</div>
            <span class="grey--text subtitle-1">1,000 miles of wonder</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-divider class="mx-4"></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <!-- start 选集 -->
            <div>选集</div>
            <!-- end 选集 -->
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import VueDPlayer from "vue-dplayer";
import "vue-dplayer/dist/vue-dplayer.css";

export default {
  name: "CourseBox",
  data() {
    return {
      show: false,
      playerOptions: {
        video: {
          url: "http://static.smartisanos.cn/common/video/t1-ui.mp4",
          pic:
            "http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg"
        },
        autoplay: false,
        contextmenu: [
          {
            text: "GitHub",
            link: "https://github.com/MoePlayer/vue-dplayer"
          }
        ]
      },
      player: null
    };
  },
  components: {
    "d-player": VueDPlayer
  },
  mounted() {
    this.player = this.$refs.player.dp;
  }
};
</script>
<style lang="less" scoped>
.container {
    padding: 0;
}
</style>