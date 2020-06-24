<template>
  <div :style="{height:'100%'}">
    <!-- start 应用栏 -->
    <v-app-bar hide-on-scroll :clipped-left="$vuetify.breakpoint.lgAndUp" app color="white" light>
      <v-app-bar-nav-icon @click.stop="drawerClick"></v-app-bar-nav-icon>
      <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img :src="!!user?user.avatar:'/static/images/guest-avatar.jpg'"></v-img>
        </v-avatar>
      </v-btn>
      <v-toolbar-title>
        <span class="hidden-sm-and-down">remember</span>
      </v-toolbar-title>
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
        <v-tabs background-color="transparent" center-active>
          <v-tab v-for="(item, i) in tabs" :key="i" :to="item.route">{{ item.text }}</v-tab>
        </v-tabs>
      </template>
      <!-- end 选项卡 -->
    </v-app-bar>
    <!-- end 应用栏 -->
    <!-- start 主体内容区 -->
    <v-content
      id="content"
      v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right'),
      up: () => swipe('Up'),
      down: () => swipe('Down')
    }"
      :style="{height:'100%'}"
    >
      <router-view></router-view>
    </v-content>
    <!-- end 主体内容区 -->
  </div>
</template>

<script>
export default {
  props: {
    tabs: Array,
    user: Object,
    drawerClick: Function
  },
  data() {
    return {};
  },
  methods: {
    swipe(direction) {
      var currentTabIndex = this.tabs.findIndex(
        tab => tab.route.name === this.$route.name
      );
      switch (direction) {
        case "Left":
          // 向左滑动->(到当前标签的下一个标签tab)右边的一个标签tab
          if (currentTabIndex >= this.tabs.length - 1) {
            return;
          }
          var nextTab = this.tabs[currentTabIndex + 1];
          this.$router.push({ name: nextTab.route.name });
          break;
        case "Right":
          // 向右滑动->(到当前标签的上一个标签tab)左边的一个标签tab
          if (currentTabIndex <= 0) {
            return;
          }
          var preTab = this.tabs[currentTabIndex - 1];
          this.$router.push({ name: preTab.route.name });
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style>
</style>