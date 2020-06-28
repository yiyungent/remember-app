<template>
  <v-card :to="{ name: 'Article', params: { id: item.article.id } }" class="mx-auto">
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
    <v-card-text class="card-text">
      <div class="card-text-title">{{item.article.title | subStrPretty(22)}}</div>
      <div class="card-text-cat">野生技术协会·项目实战</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
      default: function() {
        return {
          article: { id: 1, title: "标题", picUrl: "" },
          favNum: 123
        };
      }
    }
  }
};
</script>

<style lang="less" scoped>
// start 文章卡片
.card-title {
  font-size: 12px;
  padding-top: 76px;
  height: 10px;
}
.card-text {
  height: 78px;
  padding: 0.5em;
  letter-spacing: 0.1em;
  flex-direction: column;
  justify-content: space-between;
  display: flex;

  .card-text-title {
    color: #000;
    font-size: 13px;
    font-weight: 360;
  }
  .card-text-cat {
    font-size: 10px;
  }
}
// end 文章卡片
</style>