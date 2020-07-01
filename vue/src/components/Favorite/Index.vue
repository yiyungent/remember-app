<template>
  <v-app id="inspire">
    <!-- start 应用栏 -->
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <v-btn icon @click="back">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>
        <span></span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- end 应用栏 -->
    <!-- start 主体内容区 -->
    <v-content>
      <v-container fluid>
        <v-row v-show="loading">
          <v-col class="mx-auto pa-0" md="8">
            <div class="text-center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
          </v-col>
        </v-row>
        <!-- start 收藏夹介绍 -->
        <v-row>
          <v-col class="mx-auto pl-4" md="8">
            <v-row>
              <v-col xs="4">
                <v-img
                  :src="fav.picUrl"
                  :lazy-src="fav.picUrl"
                  width="190"
                  height="120"
                ></v-img>
              </v-col>
              <v-col xs="4">
                <v-list-item-content>
                  <v-list-item-title
                    style="height:68px;"
                    v-text="fav.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="'创建者：' + fav.creator.userName"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!-- end 收藏夹介绍 -->
        <v-row>
          <v-col class="mx-auto pl-4 py-0" md="8">
            <v-icon color="primary">mdi-star</v-icon>
            全部({{ fav.courseBoxs.length }})
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <!-- start 收藏的课程 -->
        <v-row>
          <v-col class="mx-auto pa-0" md="8">
            <one-col-video-list :list="fav.courseBoxs"></one-col-video-list>
          </v-col>
        </v-row>
        <!-- end 收藏的课程 -->
      </v-container>
    </v-content>
    <!-- end 主体内容区 -->
    <!-- start 提示消息 -->
    <v-snackbar v-model="snackbar">{{ tipMsg }}</v-snackbar>
    <!-- end 提示消息 -->
  </v-app>
</template>
<script>
export default {
  components: {},

  data() {
    return {
      fav: {
        courseBoxs: [],
        creator: {
          id: 0,
          userName: "loading"
        },
        createTime: 0,
        name: "loading",
        picUrl: "https://picsum.photos/id/11/500/300",
        id: 0
      },
      snackbar: false,
      tipMsg: "",
      loading: true
    };
  },

  created() {
    if (localStorage.token) {
      this.$store.commit("getUser", this);
    }
  },

  mounted() {
    this.loadFav();
  },

  methods: {
    back() {
      this.$router.push({ name: "MyFav" });
    },

    loadFav() {
      this.$http({
        method: "get",
        url: "/api/Favorite/",
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        if (res.data.code > 0) {
          this.fav = res.data.data;
        } else {
          this.tipMsg = res.data.message;
          this.snackbar = true;
        }
        this.loading = false;
      });
    }
  }
};
</script>
