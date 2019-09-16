<template>
  <v-app id="inspire">
    <!-- start 左侧导航抽屉 -->
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <!-- start 顶部头像区 -->
      <template v-slot:prepend>
        <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
          <v-list>
            <v-list-item class="d-flex justify-space-between">
              <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
              </v-list-item-avatar>
              <v-list-item-icon>
                <v-btn x-small outlined fab color="white">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item link two-line>
              <v-list-item-content>
                <v-list-item-title>admin</v-list-item-title>
                <v-list-item-subtitle>硬币：267</v-list-item-subtitle>
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
      <!-- start 我的动态，关注，粉丝 -->
      <v-list class="d-flex justify-space-between text-center">
        <v-list-item :to="{ name: 'Home'}">
          <v-list-item-content>
            <v-list-item-title>1</v-list-item-title>
            <v-list-item-subtitle>动态</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'Home'}">
          <v-list-item-content>
            <v-list-item-title>25</v-list-item-title>
            <v-list-item-subtitle>关注</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'Home'}">
          <v-list-item-content>
            <v-list-item-title>25</v-list-item-title>
            <v-list-item-subtitle>粉丝</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- end 我的动态，关注，粉丝 -->
      <v-divider></v-divider>
      <!-- start 一般导航区 -->
      <v-list nav dense>
        <v-list-item-group v-model="item" color="blue">
          <v-list-item v-for="(item, i) in items" :key="i">
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
    </v-navigation-drawer>
    <!-- end 左侧导航抽屉 -->
    <!-- start 应用栏 -->
    <v-app-bar
      hide-on-scroll
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify"></v-img>
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
          <v-icon>mdi-email</v-icon>
        </v-badge>
      </v-btn>
      <!-- start 选项卡 -->
      <template v-slot:extension>
        <v-tabs background-color="transparent" center-active>
          <v-tab>Tab 1</v-tab>
          <v-tab>Tab 2</v-tab>
          <v-tab>Tab 3</v-tab>
          <v-tab>Tab 4</v-tab>
          <v-tab>Tab 5</v-tab>
          <v-tab>Tab 6</v-tab>
          <v-tab>Tab 7</v-tab>
          <v-tab>Tab 8</v-tab>
          <v-tab>Tab 9</v-tab>
          <v-tab>Tab 10</v-tab>
          <v-tab>Tab 11</v-tab>
          <v-tab>Tab 12</v-tab>
        </v-tabs>
      </template>
      <!-- end 选项卡 -->
    </v-app-bar>
    <!-- end 应用栏 -->
    <!-- start 主体内容区 -->
    <v-content id="content">
      <v-container fluid>
        <v-row>
          <v-col cols="6" sm="6" md="3">
            <v-card :to="{ name: 'Home' }" class="mx-auto">
              <v-img
                class="white--text"
                height="100px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title class="card-title">
                  <v-icon x-small color="white">mdi-heart</v-icon>
                  <span>4.4万</span>
                </v-card-title>
              </v-img>
              <v-card-text class="card-text">【互动视频】测一测你的你的计算机多少分！</v-card-text>
              <v-card-actions>
                <v-btn x-small icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="6" sm="6" md="3">
            <v-card :to="{ name: 'Home' }" class="mx-auto">
              <v-img
                class="white--text"
                height="100px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title class="card-title">
                  <v-icon x-small color="white">mdi-heart</v-icon>
                  <span>4.4万</span>
                </v-card-title>
              </v-img>
              <v-card-text class="card-text">【互动视频】测一测你的你的计算机多少分！</v-card-text>
              <v-card-actions>
                <v-btn x-small icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="6" sm="6" md="3">
            <v-card :to="{ name: 'Home' }" class="mx-auto">
              <v-img
                class="white--text"
                height="100px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title class="card-title">
                  <v-icon x-small color="white">mdi-heart</v-icon>
                  <span>4.4万</span>
                </v-card-title>
              </v-img>
              <v-card-text class="card-text">【互动视频】测一测你的你的计算机多少分！</v-card-text>
              <v-card-actions>
                <v-btn x-small icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="6" sm="6" md="3">
            <v-card :to="{ name: 'Home' }" class="mx-auto">
              <v-img
                class="white--text"
                height="100px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title class="card-title">
                  <v-icon x-small color="white">mdi-heart</v-icon>
                  <span>4.4万</span>
                </v-card-title>
              </v-img>
              <v-card-text class="card-text">【互动视频】测一测你的你的计算机多少分！</v-card-text>
              <v-card-actions>
                <v-btn x-small icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="6" sm="6" md="3">
            <v-card :to="{ name: 'Home' }" class="mx-auto">
              <v-img
                class="white--text"
                height="100px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title class="card-title">
                  <v-icon x-small color="white">mdi-heart</v-icon>
                  <span>4.4万</span>
                </v-card-title>
              </v-img>
              <v-card-text class="card-text">【互动视频】测一测你的你的计算机多少分！</v-card-text>
              <v-card-actions>
                <v-btn x-small icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="6" sm="6" md="3">
            <v-card :to="{ name: 'Home' }" class="mx-auto">
              <v-img
                class="white--text"
                height="100px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title class="card-title">
                  <v-icon x-small color="white">mdi-heart</v-icon>
                  <span>4.4万</span>
                </v-card-title>
              </v-img>
              <v-card-text class="card-text">【互动视频】测一测你的你的计算机多少分！</v-card-text>
              <v-card-actions>
                <v-btn x-small icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="6" sm="6" md="3">
            <v-card :to="{ name: 'Home' }" class="mx-auto">
              <v-img
                class="white--text"
                height="100px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title class="card-title">
                  <v-icon x-small color="white">mdi-heart</v-icon>
                  <span>4.4万</span>
                </v-card-title>
              </v-img>
              <v-card-text class="card-text">【互动视频】测一测你的你的计算机多少分！</v-card-text>
              <v-card-actions>
                <v-btn x-small icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="6" sm="6" md="3">
            <v-card :to="{ name: 'Home' }" class="mx-auto">
              <v-img
                class="white--text"
                height="100px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title class="card-title">
                  <v-icon x-small color="white">mdi-heart</v-icon>
                  <span>4.4万</span>
                </v-card-title>
              </v-img>
              <v-card-text class="card-text">【互动视频】测一测你的你的计算机多少分！</v-card-text>
              <v-card-actions>
                <v-btn x-small icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="6" sm="6" md="3">
            <v-card :to="{ name: 'Home' }" class="mx-auto">
              <v-img
                class="white--text"
                height="100px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title class="card-title">
                  <v-icon x-small color="white">mdi-heart</v-icon>
                  <span>4.4万</span>
                </v-card-title>
              </v-img>
              <v-card-text class="card-text">【互动视频】测一测你的你的计算机多少分！</v-card-text>
              <v-card-actions>
                <v-btn x-small icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="6" sm="6" md="3">
            <v-card :to="{ name: 'Home' }" class="mx-auto">
              <v-img
                class="white--text"
                height="100px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title class="card-title">
                  <v-icon x-small color="white">mdi-heart</v-icon>
                  <span>4.4万</span>
                </v-card-title>
              </v-img>
              <v-card-text class="card-text">【互动视频】测一测你的你的计算机多少分！</v-card-text>
              <v-card-actions>
                <v-btn x-small icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <!-- end 主体内容区 -->
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data() {
    return {
      drawer: null,
      item: 0,
      items: [
        { text: "首页", icon: "mdi-folder" },
        { text: "历史记录", icon: "mdi-history" },
        { text: "我的收藏", icon: "mdi-star" },
        { text: "投稿", icon: "mdi-upload" },
        { text: "Recent", icon: "mdi-history" },
        { text: "Offline", icon: "mdi-check-circle" },
        { text: "Backups", icon: "mdi-cloud-upload" }
      ],
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"]
    };
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