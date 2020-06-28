<template>
  <div :style="{height:'100%'}">
    <!-- start 左侧导航抽屉 -->
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <!-- start 顶部头像区 -->
      <template v-slot:prepend>
        <v-img :aspect-ratio="16/9" src="/static/images/default-avatar-background.png">
          <v-list>
            <v-list-item class="d-flex justify-space-between">
              <v-list-item-avatar>
                <v-img :src="!!user?user.avatar:'/static/images/guest-avatar.jpg'"></v-img>
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
        <v-list-item :to="{ name: 'Home_Dynamic'}">
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
      <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>
      <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img :src="!!user?user.avatar:'/static/images/guest-avatar.jpg'"></v-img>
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
        <v-tabs background-color="transparent" center-active v-model="currentTab">
          <v-tab v-for="(item, i) in tabs" :key="i">{{ item.text }}</v-tab>
        </v-tabs>
      </template>
      <!-- end 选项卡 -->
    </v-app-bar>
    <!-- end 应用栏 -->
    <!-- start 主体内容区 -->
    <v-content id="content" :style="{height:'100%'}">
      <v-tabs-items v-model="currentTab" :style="{height:'100%'}">
        <!-- 设置最左边的height:100% 解决内容不足时无法触发v-touch -->
        <v-tab-item
          v-touch="{right: () => drawer=true}"
          :style="{height:'100%'}"
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
    </v-content>
    <!-- end 主体内容区 -->
  </div>
</template>

<script>
import { isLoginMethod } from "@/utils/index";
import hot from "@/components/Home/Hot";
import recom from "@/components/Home/Recom";
import last from "@/components/Home/Last";

export default {
  components: {
    hot,
    recom,
    last
  },
  data() {
    return {
      drawer: false,
      drawerCurrentIndex: -1,
      drawerItems: [
        { text: "历史记录", icon: "mdi-history" },
        { text: "我的收藏", icon: "mdi-star", route: { name: "MyFav" } },
        { text: "我的文章", icon: "mdi-star" },
        { text: "新建文章", icon: "mdi-upload" }
      ],
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
    isLogin() {
      return isLoginMethod();
    },
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    if (isLoginMethod()) {
      this.$store.commit("getUser", this);
    }
  },
  methods: {
    // 原有组件本支持滑动切换标签页，但如果内容不够多，就无法触发滑动（可滑动区域太小）,v-tabs-items height 100%即可解决，但这样又会导致到左边缘时无法触发左抽屉
    // 注意：不可同时监听 v-touch, 与(默认)滑动，不然从第一标签滑动一次就会到第三标签
    // v-touch 触发在 默认滑动触发v-model:currentTab变化 之后
    // swipeDrawer() {
    //   this.drawer = true;
    // },
    logout() {
      this.$store.commit("logout");
      this.$router.go(0);
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
// start 文章卡片
#content .card-title {
  font-size: 1rem;
  padding-top: 82px;
  height: 10px;
}
#content .card-text {
  height: 50px;
  padding: 4px;
}
// end 文章卡片
</style>