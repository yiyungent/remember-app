<template>
  <v-app id="inspire">
    <!-- start 左侧导航抽屉 -->
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <!-- start 顶部头像区 -->
      <template v-slot:prepend>
        <v-img :aspect-ratio="16/9" :src="rootUrl+'/assets/images/default-avatar-background.png'">
          <v-list>
            <v-list-item class="d-flex justify-space-between">
              <v-list-item-avatar>
                <v-img :src="!!user?user.avatar:rootUrl+'/assets/images/guest-avatar.jpg'"></v-img>
              </v-list-item-avatar>
              <v-list-item-icon>
                <v-btn x-small outlined fab color="white">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item link two-line>
              <v-list-item-content>
                <v-list-item-title>{{!!user?user.userName:'未登录'}}</v-list-item-title>
                <v-list-item-subtitle>硬币：{{!!user?user.coin:'0'}}</v-list-item-subtitle>
              </v-list-item-content>
              <!-- <v-list-item-action>
                <v-icon>mdi-menu-down</v-icon>
              </v-list-item-action>-->
            </v-list-item>
          </v-list>
        </v-img>
      </template>
      <!-- start 顶部头像区 -->
      <v-divider></v-divider>
      <!-- start 按钮栏 -->
      <v-list class="d-flex justify-space-between text-center">
        <v-list-item :to="{ name: 'Home'}">
          <v-list-item-content>
            <v-list-item-title>{{user!=null?user.articleNum:0}}</v-list-item-title>
            <v-list-item-subtitle>动态</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'MyFriends_MyFollow'}">
          <v-list-item-content>
            <v-list-item-title>{{user!=null?user.followNum:0}}</v-list-item-title>
            <v-list-item-subtitle>关注</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'MyFriends_MyFans'}">
          <v-list-item-content>
            <v-list-item-title>{{user!=null?user.fansNum:0}}</v-list-item-title>
            <v-list-item-subtitle>粉丝</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- end 按钮栏 -->
      <v-divider></v-divider>
      <!-- start 一般导航区 -->
      <v-list nav dense>
        <v-list-item-group v-model="drawerCurrentIndex" color="primary">
          <v-list-item :to="item.route" v-for="(item, i) in drawerItems" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <!-- end 一般导航区 -->
      <v-divider></v-divider>
      <!-- start 一般导航区 -->
      <!-- start 设置区 -->
      <v-list nav dense>
        <v-list-item-group color="primary">
          <v-list-item v-show="isLogin" @click="logout">
            <v-list-item-icon>
              <v-icon>logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>注销</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-show="!isLogin" :to="{name:'Login'}">
            <v-list-item-icon>
              <v-icon>logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>登录</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <!-- end 设置区 -->
    </v-navigation-drawer>
    <!-- end 左侧导航抽屉 -->
    <!-- start 应用栏 -->
    <v-app-bar hide-on-scroll :clipped-left="$vuetify.breakpoint.lgAndUp" app color="white" light>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img :src="!!user?user.avatar:rootUrl+'/assets/images/guest-avatar.jpg'" alt="Vuetify"></v-img>
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
    <v-content id="content">
      <router-view></router-view>
    </v-content>
    <!-- end 主体内容区 -->
    <!-- start 底部导航区 -->
    <v-bottom-navigation grow fixed color="primary" light v-model="bNavActiveBtn">
      <v-btn>
        <span>首页</span>
        <v-icon>fa-home</v-icon>
      </v-btn>
      <v-btn :to="{name:'Channel'}">
        <span>频道</span>
        <v-icon>fa-cubes</v-icon>
      </v-btn>
      <v-btn>
        <span>动态</span>
        <v-icon>fa-comments-o</v-icon>
      </v-btn>
      <v-btn>
        <span>会员购</span>
        <v-icon>fa-shopping-bag</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <!-- end 底部导航区 -->
  </v-app>
</template>

<script>
import { isLoginMethod } from "./../../utils/index";

export default {
  data() {
    return {
      rootUrl: "http://api.tikotiko.fun",
      drawer: null,
      drawerCurrentIndex: 0,
      drawerItems: [
        { text: "首页", icon: "mdi-folder", route: { name: "Home" } },
        { text: "历史记录", icon: "mdi-history" },
        { text: "我的收藏", icon: "mdi-star", route: { name: "MyFav" } },
        { text: "我的课程", icon: "mdi-star" },
        { text: "新建课程", icon: "mdi-upload" }
      ],
      tabs: [
        { id: 1, text: "热门", route: { name: "Home_Cat1" } },
        { id: 2, text: "最新", route: { name: "Home_Cat2" } }
      ],
      bNavActiveBtn: 0
    };
  },
  created() {
    if (isLoginMethod()) {
      this.$store.commit("getUser", this);
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.go(0);
    }
  },
  computed: {
    isLogin() {
      return isLoginMethod();
    },
    user() {
      return this.$store.state.user;
    }
  }
};
</script>
<style lang="less" scoped>
.lightbox {
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 72px
  );
}
</style>
<style lang="less">
// start 视频卡片
#content .card-title {
  font-size: 1rem;
  padding-top: 82px;
  height: 10px;
}
#content .card-text {
  height: 50px;
  padding: 4px;
}
// end 视频卡片
</style>