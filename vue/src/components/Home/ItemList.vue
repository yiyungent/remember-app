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
          <card-item :item="item"></card-item>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import CardItem from "./CardItem";

export default {
  components: {
    CardItem
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: function() {
        return [
          {
            article: { id: 1, title: "标题1", picUrl: "" },
            favNum: 123
          }
        ];
      }
    },
    showLoading: Boolean
  }
};
</script>
<style lang="less" scoped>
</style>
