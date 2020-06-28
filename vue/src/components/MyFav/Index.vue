<template>
  <v-app id="inspire">
    <!-- start 应用栏 -->
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary" dark>
      <v-btn icon @click="back">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>
        <span>我的收藏</span>
      </v-toolbar-title>
      <!-- start 选项卡 -->
      <template v-slot:extension>
        <v-tabs background-color="primary" color="basil" grow>
          <v-tab :to="{name:'MyFav_Article'}">课程</v-tab>
          <!-- <v-tab :to="{name:'MyFriends_MyFans'}">卡片盒</v-tab> -->
        </v-tabs>
      </template>
      <!-- end 选项卡 -->
    </v-app-bar>
    <!-- end 应用栏 -->
    <!-- start 主体内容区 -->
    <v-content>
      <router-view></router-view>
    </v-content>
    <!-- end 主体内容区 -->
  </v-app>
</template>
<script>
export default {
  methods: {
    back() {
      // this.$router.go(-1);
      this.$router.push({ name: "Home" });
    }
  }
};
</script>