<template>
  <div :style="{ height: '100%' }">
    <!-- start 左侧导航抽屉 -->
    <left-nav-drawer v-model="drawer"></left-nav-drawer>
    <!-- end 左侧导航抽屉 -->
    <!-- start 应用栏 -->
    <v-app-bar
      hide-on-scroll
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="white"
      light
    >
      <v-app-bar-nav-icon
        @click.stop="drawer.show = !drawer.show"
      ></v-app-bar-nav-icon>
      <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img
            :src="!!user ? user.avatar : '/images/guest-avatar.jpg'"
          ></v-img>
        </v-avatar>
      </v-btn>
      <v-toolbar-title></v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-badge overlap left>
          <template v-slot:badge>0</template>
          <v-icon>fa-envelope-o</v-icon>
        </v-badge>
      </v-btn>
      <!-- start 选项卡 -->
      <template v-slot:extension>
        <v-tabs
          background-color="transparent"
          center-active
          v-model="currentTab"
        >
          <v-tab v-for="(item, i) in tabs" :key="i">{{ item.text }}</v-tab>
        </v-tabs>
      </template>
      <!-- end 选项卡 -->
    </v-app-bar>
    <!-- end 应用栏 -->
    <!-- start 主体内容区 -->
    <v-main id="content" :style="{ height: '100%' }">
      <v-tabs-items v-model="currentTab" :style="{ height: '100%' }">
        <!-- 设置最左边的height:100% 解决内容不足时无法触发v-touch -->
        <v-tab-item
          v-touch="{ right: () => (drawer.show = true) }"
          :style="{ height: '100%' }"
        >
          <hot></hot>
        </v-tab-item>
        <v-tab-item>
          <recom></recom>
        </v-tab-item>
        <v-tab-item>
          <last></last>
        </v-tab-item>
      </v-tabs-items>
    </v-main>
    <!-- end 主体内容区 -->
  </div>
</template>

<script>
import leftNavDrawer from "@/components/Common/LeftNavDrawer";
import hot from "@/components/Home/Hot";
import recom from "@/components/Home/Recom";
import last from "@/components/Home/Last";

export default {
  components: {
    hot,
    recom,
    last,
    leftNavDrawer
  },
  data() {
    return {
      drawer: {
        show: false,
        currentIndex: -1,
        items: [
          { text: "历史记录", icon: "mdi-history" },
          { text: "我的收藏", icon: "mdi-star", route: { name: "MyFav" } },
          { text: "我的文章", icon: "mdi-star" },
          { text: "新建文章", icon: "mdi-upload" }
        ]
      },
      tabs: [
        { id: 1, text: "热门" },
        { id: 2, text: "推荐" },
        { id: 3, text: "最新" }
      ],
      currentTab: 1,
      bNavActiveBtn: 0
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped></style>
