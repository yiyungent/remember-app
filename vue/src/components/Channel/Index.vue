<template>
  <div>
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
          <v-img :src="!!user?user.avatar:'/static/images/guest-avatar.jpg'" alt="头像"></v-img>
        </v-avatar>
      </v-btn>
      <v-toolbar-title>
        <span>频道</span>
      </v-toolbar-title>
    </v-app-bar>
    <!-- end 应用栏 -->
    <!-- start 主体内容区 -->
    <v-content id="content">
      <v-container fluid>
        <v-row>
          <v-col class="mx-auto pa-0" md="8">
            <v-list>
              <v-list-group v-model="allCat" no-action>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title v-text="'全部分区（31）'"></v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-row>
                  <v-col xs="3" cols="3" v-for="item in dataList" :key="item.id">
                    <v-list-item
                      link
                      class="ma-auto pa-4 text-center"
                      style="width:100px;flex:none;"
                    >
                      <div class="ma-auto">
                        <v-icon class="pb-2">mdi-android</v-icon>
                        <div>{{item.name}}</div>
                      </div>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-list-group>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <!-- end 主体内容区 -->
  </div>
</template>

<script>
import { isLoginMethod } from "./../../utils/index";
import bottomNav from "./../Home/BottomNav";

export default {
  components: {
    bottomNav,
  },
  data() {
    return {
      drawer: false,
      drawerCurrentIndex: -1,
      drawerItems: [
        { text: "历史记录", icon: "mdi-history" },
        { text: "我的收藏", icon: "mdi-star", route: { name: "MyFav" } },
        { text: "我的课程", icon: "mdi-star" },
        { text: "新建课程", icon: "mdi-upload" }
      ],
      allCat: true,
      dataList: [
        {
          id: 1,
          name: "音乐"
        },
        {
          id: 2,
          name: "音乐"
        },
        {
          id: 3,
          name: "放映厅"
        },
        {
          id: 4,
          name: "软件工程"
        },
        {
          id: 5,
          name: "选修"
        },
        {
          id: 6,
          name: "选修"
        },
        {
          id: 7,
          name: "选修"
        },
        {
          id: 8,
          name: "选修"
        },
        {
          id: 9,
          name: "选修"
        },

        {
          id: 10,
          name: "选修"
        },
        {
          id: 11,
          name: "选修"
        },
        {
          id: 12,
          name: "选修"
        }
      ],
      bNavActiveBtn: 1
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
</style>