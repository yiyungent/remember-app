<template>
  <v-app id="inspire">
    <!-- start 应用栏 -->
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary" dark>
      <v-btn icon>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>
        <span>我的好友</span>
      </v-toolbar-title>
      <!-- start 选项卡 -->
      <template v-slot:extension>
        <v-tabs background-color="primary" color="basil" grow>
          <v-tab :to="{name:'MyFriends_MyFollow'}">我的关注</v-tab>
          <v-tab :to="{name:'MyFriends_MyFans'}">我的粉丝</v-tab>
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
export default {};
</script>