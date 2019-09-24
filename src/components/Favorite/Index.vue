<template>
  <v-app id="inspire">
    <!-- start 应用栏 -->
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary" dark>
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
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
          </v-col>
        </v-row>
        <!-- start 收藏夹介绍 -->
        <v-row>
          <v-col class="mx-auto pl-4" md="8">
            <v-row>
              <v-col xs="4">
                <v-img :src="fav.picUrl" :lazy-src="fav.picUrl" max-width="190" max-height="120"></v-img>
              </v-col>
              <v-col xs="4">
                <v-list-item-content>
                  <v-list-item-title style="height:68px;" v-text="fav.name"></v-list-item-title>
                  <v-list-item-subtitle v-html="'创建者：'+fav.creator.userName"></v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!-- end 收藏夹介绍 -->
        <v-row>
          <v-col class="mx-auto pl-4 py-0" md="8">
            <v-icon color="primary">mdi-star</v-icon>
            全部({{fav.courseBoxs.length}})
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <!-- start 收藏的课程 -->
        <v-row>
          <v-col class="mx-auto pa-0" md="8">
            <v-list>
              <v-list-item
                @click="goCourseBox(courseBox.id)"
                link
                class="pl-4"
                v-for="courseBox in fav.courseBoxs"
                :key="courseBox.id"
              >
                <v-row>
                  <v-col xs="4" class="pb-0">
                    <v-img
                      :src="courseBox.picUrl"
                      :lazy-src="courseBox.picUrl"
                      max-width="190"
                      max-height="120"
                    ></v-img>
                  </v-col>
                  <v-col xs="4" class="pb-0">
                    <v-list-item-content>
                      <v-list-item-title>
                        <span>{{courseBox.name}}</span>
                      </v-list-item-title>
                      <v-list-item-subtitle class="pt-7">
                        <v-row>
                          <v-col class="py-0">
                            <v-icon></v-icon>
                            {{courseBox.creator.userName}}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="pt-1">
                            <v-icon>fa-play-circle</v-icon>
                            {{courseBox.learnNum}}
                          </v-col>
                          <!-- <v-col><v-icon>play-box-outline</v-icon>{{courseBox.learnNum}}</v-col> -->
                        </v-row>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <!-- end 收藏的课程 -->
        <v-snackbar v-model="snackbar">{{ tipMsg }}</v-snackbar>
      </v-container>
    </v-content>
    <!-- end 主体内容区 -->
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      fav: {
        courseBoxs: [
          {
            id: 1,
            name: "软件工程",
            picUrl: "https://picsum.photos/id/11/500/300",
            creator: {
              id: 1,
              userName: "admin"
            },
            learnNum: 1231,
            favTime: 1324135
          },
          {
            id: 2,
            name: "计算机",
            picUrl: "https://picsum.photos/id/11/500/300",
            creator: {
              id: 2,
              userName: "guest"
            },
            learnNum: 31,
            favTime: 1324135
          },
          {
            id: 3,
            name: "软件测试",
            picUrl: "https://picsum.photos/id/11/500/300",
            creator: {
              id: 3,
              userName: "root"
            },
            learnNum: 23,
            favTime: 1324135
          }
        ],
        creator: {
          id: 1,
          userName: "admin"
        },
        createTime: 1351355,
        name: "这里的最棒了",
        picUrl: "https://picsum.photos/id/11/500/300",
        id: 1
      },
      snackbar: false,
      tipMsg: "",
      loading: false
    };
  },

  created() {
    if (!!localStorage.token) {
      this.$store.commit("getUser", this);
    }
  },
  mounted() {
    // this.loadFav();
  },

  methods: {

    back() {
      this.$router.push({ name: "MyFav" });
    },
    
    goCourseBox(id) {
      this.$router.push({ name: "CourseBox", params: { id: id } });
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
    },
  }
};
</script>