<template>
  <div style="height:240px;">
   
  </div>
</template>

<script>

export default {
  data() {
    return {
      
    };
  },
  components: {
  },
  created() {},
  mounted() {
  },
  methods: {
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