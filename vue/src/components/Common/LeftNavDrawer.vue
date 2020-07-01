<template>
  <!-- start 左侧导航抽屉 -->
  <v-navigation-drawer
    v-model="show"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
  >
    <!-- start 顶部头像区 -->
    <template v-slot:prepend>
      <v-img :aspect-ratio="16 / 9" src="/images/default-avatar-background.png">
        <v-list>
          <v-list-item class="d-flex justify-space-between">
            <v-list-item-avatar>
              <v-img
                :src="!!user ? user.avatar : '/images/guest-avatar.jpg'"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-icon>
              <v-btn x-small outlined fab color="white">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item link two-line>
            <v-list-item-content>
              <v-list-item-title
                >{{ !!user ? user.userName : "未登录" }}
              </v-list-item-title>
              <v-list-item-subtitle
                >硬币：{{ !!user ? user.coin : "0" }}
              </v-list-item-subtitle>
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
      <v-list-item :to="{ name: 'Home_Dynamic' }">
        <v-list-item-content>
          <v-list-item-title
            >{{ user != null ? user.articleNum : 0 }}
          </v-list-item-title>
          <v-list-item-subtitle>动态</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item :to="{ name: 'MyFriends_MyFollow' }">
        <v-list-item-content>
          <v-list-item-title
            >{{ user != null ? user.followNum : 0 }}
          </v-list-item-title>
          <v-list-item-subtitle>关注</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item :to="{ name: 'MyFriends_MyFans' }">
        <v-list-item-content>
          <v-list-item-title
            >{{ user != null ? user.fansNum : 0 }}
          </v-list-item-title>
          <v-list-item-subtitle>粉丝</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- end 按钮栏 -->
    <v-divider></v-divider>
    <!-- start 一般导航区 -->
    <v-list nav dense>
      <v-list-item-group v-model="currentIndex" color="primary">
        <v-list-item :to="item.route" v-for="(item, i) in items" :key="i">
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
        <v-list-item v-show="!isLogin" :to="{ name: 'Login' }">
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
</template>

<script>
import { isLoginMethod } from "@/utils/index";

export default {
  props: {
    value: {
      Type: Object,
      default: function() {
        return {
          show: false,
          currentIndex: -1,
          items: [
            { text: "历史记录", icon: "mdi-history" },
            { text: "我的收藏", icon: "mdi-star", route: { name: "MyFav" } },
            { text: "我的文章", icon: "mdi-star" },
            { text: "新建文章", icon: "mdi-upload" }
          ]
        };
      }
    }
  },
  data() {
    return {
      dataVal: this.value
    };
  },
  computed: {
    show: {
      get: function() {
        return this.dataVal.show;
      },
      set: function(val) {
        this.dataVal.show = val;
      }
    },
    currentIndex: {
      get: function() {
        return this.dataVal.currentIndex;
      },
      set: function(val) {
        this.dataVal.currentIndex = val;
      }
    },
    items: {
      get: function() {
        return this.dataVal.items;
      },
      set: function(val) {
        this.dataVal.items = val;
      }
    },
    user() {
      return this.$store.state.user;
    },
    isLogin() {
      return isLoginMethod();
    }
  },
  watch: {
    value(newVal) {
      this.dataVal = newVal;
    },
    dataVal(newVal) {
      this.$emit("input", newVal);
    }
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
  }
};
</script>

<style lang="less" scoped></style>
