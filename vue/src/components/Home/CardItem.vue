<template>
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
    <v-card-text style="height:32px;" class="card-text">{{item.article.title | subStrPretty(18)}}</v-card-text>
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
  height: 50px;
  padding: 4px;
}
// end 文章卡片
</style>