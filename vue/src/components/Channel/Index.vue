<template>
  <div>
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
            :src="!!user ? user.avatar : '/static/images/guest-avatar.jpg'"
            alt="头像"
          ></v-img>
        </v-avatar>
      </v-btn>
      <v-toolbar-title>
        <span>频道</span>
      </v-toolbar-title>
    </v-app-bar>
    <!-- end 应用栏 -->
    <!-- start 主体内容区 -->
    <v-main id="content">
      <v-container fluid>
        <v-row>
          <v-col class="mx-auto pa-0" md="8">
            <v-list>
              <v-list-group v-model="allCat" no-action>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="'全部分区（31）'"
                    ></v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-row>
                  <v-col
                    xs="3"
                    cols="3"
                    v-for="item in dataList"
                    :key="item.id"
                  >
                    <v-list-item
                      link
                      class="ma-auto pa-4 text-center"
                      style="width:100px;flex:none;"
                    >
                      <div class="ma-auto">
                        <v-icon class="pb-2">mdi-android</v-icon>
                        <div>{{ item.name }}</div>
                      </div>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-list-group>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- end 主体内容区 -->
  </div>
</template>

<script>
import { isLoginMethod } from "@/utils/index";
import leftNavDrawer from "@/components/Common/LeftNavDrawer";

export default {
  components: {
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
  methods: {},
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>
<style lang="less" scoped></style>
