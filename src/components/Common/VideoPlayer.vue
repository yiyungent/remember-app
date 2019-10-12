<template>
  <div style="height:240px;">
    <d-player ref="player" :options="options" style="height:240px;"></d-player>
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
      // list: [
      //   {
      //     id: 1,
      //     title: "",
      //     playUrl: "",
      //     subTitleUrl: ""
      //     lastPlayPos: 1133
      //   }
      // ]
      // currentPageId: 0,
      // currentPageIndex: 0
    };
  },
  props: ["pages", "lastPlayPage"],
  components: {
    "d-player": VueDPlayer
  },
  created() {},
  mounted() {
    this.player = this.$refs.player.dp;
  },
  methods: {
    init() {
      // // 有历史记录则为历史记录课件，否则第一个课件
      //   if (this.lastPlayPage != null) {
      //     this.currentPageId = this.lastPlayPage.id;
      //     this.currentPageIndex = this.lastPlayPage.page - 1;
      //   } else {
      //     this.currentVideoInfoId = this.pages[0].id;
      //     this.currentVideoInfoIndex = 0;
      //   }
      //   // 播放器
      //   // 跳转到当前集
      //   var video = this.courseBox.videoInfos[this.currentVideoInfoIndex];
      //   // this.player.switchVideo(video.playUrl);
      //   console.log("跳转到默认集数");
      //   this.player.switchPage(this.currentVideoInfoIndex + 1);
      //   // 如果当前集有播放历史记录，则调至上次播放位置
      //   if (!!video.lastPlayAt) {
      //     // TODO: 注意：这里是关键帧，而不是秒数
      //     this.player.seek(video.lastPlayAt);
      //   }
    },

    // 切换到第几集（一般来说说外部只用调这个方法即可）
    switchPage(num) {
      var page = this.pages[num - 1];
      this.switchVideo(page.playUrl);
      if (!!page.lastPlayAt) {
        this.seek(page.lastPlayAt);
      } else {
        this.seek(0);
      }
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
    }
  }
};
</script>

<style>
</style>