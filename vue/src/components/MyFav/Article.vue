<template>
  <div>
    <div class="text-center" v-show="loading">
      <v-progress-circular indeterminate color="secondary"></v-progress-circular>
    </div>
    <v-list>
      <v-list-group
        v-for="group in groups"
        :key="group.id"
        v-model="group.isFolder"
        prepend-icon="star"
        no-action
        color="secondary"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="group.groupName"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          @click="goFav(fav.id)"
          link
          class="pl-4 rem-list-item"
          v-for="fav in group.favList"
          :key="fav.id"
        >
          <div>
            <v-img :src="fav.picUrl" :lazy-src="fav.picUrl" class="rem-img"></v-img>
          </div>
          <v-list-item-content class="rem-list-item-content">
            <v-list-item-title class="rem-list-item-title" v-text="fav.name"></v-list-item-title>
            <v-list-item-subtitle
              class="rem-list-item-subtitle"
              v-html="
                        fav.count + '个内容 · ' + (fav.isOpen ? '公开' : '私密')
                      "
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <!-- start 提示消息 -->
    <v-snackbar v-model="snackbar">{{ tipMsg }}</v-snackbar>
    <!-- end 提示消息 -->
  </div>
</template>
<script>
import apiFavorites from "@/api/UserInfo/favorites";

export default {
  data() {
    return {
      groups: [
        {
          id: 0,
          isFolder: true,
          groupName: "我的创建",
          favList: [
            {
              id: 0,
              name: "默认收藏夹",
              count: 0,
              isOpen: true,
              picUrl: "https://picsum.photos/id/11/500/300"
            }
          ]
        }
      ],
      snackbar: false,
      tipMsg: "",
      loading: true
    };
  },

  created() {},

  mounted() {
    this.loadFavList();
  },

  methods: {
    loadFavList() {
      apiFavorites().then(res => {
        console.log(res);
        if (res.code > 0) {
          this.groups = res.data.groups;
        } else {
          this.tipMsg = res.message;
          this.snackbar = true;
        }
        this.loading = false;
      });
    },
    goFav(id) {
      this.$router.push({ name: "Favorite", params: { id: id } });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/colors.less";

.rem-list-item {
  padding-top: 6px;
  padding-bottom: 6px;
}
.rem-img {
  width: 118px;
  height: 74px;
  border-radius: 2px;
}
.rem-list-item-content {
  position: relative;
  height: 74px;
  margin-left: 12px;
  padding: 0;

  .rem-list-item-title {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 18px;
    max-height: 18 * 2px;
    // 文字超出两行，省略号处理
    overflow: hidden;
    text-overflow: ellipsis; // 可省, 加上兼容性
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
  .rem-list-item-subtitle {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 12px;
  }
}
</style>