<template>
  <div style="height:240px;">
    <d-player
      ref="player"
      :options="options"
      style="height:240px;"
      @play="playHistoryPush"
      @pause="playHistoryPush"
      @seeked="playHistoryPush"
    ></d-player>
  </div>
</template>

<script>
import VueDPlayer from "vue-dplayer";
import "vue-dplayer/dist/vue-dplayer.css";

export default {
  data() {
    return {
      player: null,
      options: {
        video: {
          url: ""
        },
        autoplay: true
      },
      currentPage: {
        id: 0,
        title: "",
        playUrl: "",
        subTitleUrl: "",
        lastPlayAt: 0
      }
    };
  },
  props: ["pages"],
  components: {
    "d-player": VueDPlayer
  },
  created() {},
  mounted() {
    this.player = this.$refs.player.dp;
  },
  methods: {

    // 切换到第几集（一般来说说外部只用调这个方法即可）
    switchPage(pageNum) {
      var page = this.pages[pageNum - 1];
      this.currentPage = {
        id: page.id,
        page: page.page,
        title: page.title,
        playUrl: page.playUrl,
        subTitleUrl: page.subTitleUrl,
        lastPlayAt: page.lastPlayAt
      };
      this.switchVideo(page.playUrl);
    },

    // 切换视频
    switchVideo(playUrl) {
      this.player.switchVideo({
        url: playUrl
      });
    },
    // 切换字幕
    switchSubTitle(subTitleUrl) {},
    // 跳转到特定时间
    seek(sec) {
      this.player.seek(sec);
    },
    // 播放视频
    play() {
      this.player.play();
    },
    // 暂停视频
    pause() {
      this.player.pause();
    },
    // 切换播放和暂停
    toggle() {
      this.player.toggle();
    },
    // 返回视频当前播放时间位置
    currentPlayPos() {
      return this.player.video.currentTime;
    },
    // 返回视频总时间
    duration() {
      return this.player.video.duration;
    },
    // 推送当前正在播放的视频历史
    playHistoryPush() {
      var currentPageId = this.currentPage.id;
      var currentPagePlayPos = this.currentPlayPos();
      if (currentPageId == 0) {
        return;
      }
      // 除了推送给服务端，也应当更新本地存储的数据
      this.$emit("playHistoryPush", {
        page: this.currentPage.page,
        videoId: currentPageId,
        lastPlayAt: currentPagePlayPos
      });

      // 历史播放记录 推送到服务器
      this.$http({
        method: "post",
        url: "/api/CourseBox/playHistoryPush",
        data: {
          id: currentPageId,
          lastPlayAt: currentPagePlayPos
        }
      }).then(res => {
        console.log(
          "推送播放历史",
          new Date().toString(),
          "当前播放" + currentPageId + "  位置:" + currentPagePlayPos
        );
        if (res.data.code > 0) {
          console.log("推送播放历史 成功 :", res.data.data);
        } else {
          console.log("推送播放历史 失败  :" + res.data.message);
        }
      });
    }
  }
};
</script>

<style>
</style>