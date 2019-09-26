<template>
  <v-app id="inspire">
    <!-- start 应用栏 -->
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary" dark>
      <v-btn icon @click="back">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>
        <span class="hidden-sm-and-down">remember</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- end 应用栏 -->
    <v-content>
      <v-container fluid>
        <!-- start 视频播放区 -->
        <v-row>
          <v-col class="mx-auto py-0" md="8">
            <!-- <d-player style="height:230px;" :options="playerOptions" ref="player"></d-player> -->
            <d-player :options="playerOptions" ref="player"></d-player>
          </v-col>
        </v-row>
        <!-- end 视频播放区 -->
        <!-- start 视频下方导航条 -->
        <v-row>
          <v-col class="mx-auto pt-0" md="8">
            <v-tabs>
              <v-tab>简介</v-tab>
              <v-tab style="vertical-align:bottom;">
                <span>评论</span>
                <span style="font-size:10px;">{{courseBox.stat.commentNum | numPretty}}</span>
              </v-tab>
              <div class="flex-grow-1"></div>
              <!-- <v-btn-toggle rounded fixed>
                <v-expand-x-transition>
                  <v-btn
                    v-show="enableDm"
                    @click="isSendDm=!isSendDm"
                  >{{ isSendDm?'弹幕输入中':'点我发弹幕' }}</v-btn>
                </v-expand-x-transition>
                <v-btn @click="enableDm=!enableDm">
                  <v-icon>{{enableDm?'personal_video':'tv_off'}}</v-icon>
                </v-btn>
              </v-btn-toggle>-->
            </v-tabs>
          </v-col>
        </v-row>
        <!-- end 视频下方导航条 -->
        <!-- start 课程作者头像栏 -->
        <v-row>
          <v-col class="mx-auto pt-0" md="8">
            <v-row style="height:52px;">
              <v-col xs="7" style="width:48px;">
                <router-link :to="{name:'Home'}" style="text-decoration:none">
                  <v-avatar max-width="48">
                    <img :src="courseBox.creator.avatar" />
                  </v-avatar>
                  <div style="transform: translate(60px, -46px);">
                    <div class="black--text">{{courseBox.creator.userName | subStrPretty(5)}}</div>
                    <div
                      class="grey--text subtitle-1"
                      style="font-size:6px;"
                    >{{courseBox.creator.fansNum | numPretty}}粉丝</div>
                  </div>
                </router-link>
              </v-col>
              <v-col xs="1" offset="4">
                <v-btn color="primary">
                  <v-icon left>add</v-icon>关注
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!-- end 课程作者头像栏 -->
        <!-- start 课程信息 -->
        <v-row>
          <v-col class="mx-auto pb-0" md="8">
            <div>
              <span style="font-size:18px;">{{courseBox.name || substrPretty(8) }}</span>
              <v-btn class="float-right mr-4" icon @click="showDesc = !showDesc">
                <v-icon>{{ showDesc ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </div>
            <div class="grey--text subtitle-1 py-1">
              <span style="font-size:13px;" class="px-1">
                <v-icon x-small>personal_video</v-icon>
                <span>{{courseBox.stat.viewNum | numPretty}}</span>
              </span>
              <span
                style="font-size:13px;"
                class="px-1"
              >{{courseBox.lastUpdateTime | dateFormat('YYYY-MM-DD HH:mm')}}</span>
            </div>
          </v-col>
        </v-row>
        <!-- end 课程信息 -->
        <!-- start 课程描述 -->
        <v-row>
          <v-col class="mx-auto py-0" md="8">
            <v-expand-transition>
              <div v-show="showDesc">
                <v-card-text class="py-1">{{courseBox.desc}}</v-card-text>
              </div>
            </v-expand-transition>
          </v-col>
        </v-row>
        <!-- end 课程描述 -->
        <!-- start 按钮栏 -->
        <v-row>
          <v-col class="mx-auto py-0" md="8">
            <v-row class="mx-auto">
              <v-col class="text-center pt-0">
                <v-btn large text icon color="gray">
                  <v-icon>thumb_up</v-icon>
                  <span class="btn-icon-with-text">{{courseBox.stat.likeNum | numPretty}}</span>
                </v-btn>
              </v-col>
              <v-col class="text-center pt-0">
                <v-btn large text icon color="gray">
                  <v-icon>thumb_down</v-icon>
                  <span class="btn-icon-with-text">{{courseBox.stat.dislikeNum | numPretty}}</span>
                </v-btn>
              </v-col>
              <!-- <v-col>
                <v-btn large text icon color="gray">
                  <v-icon>attach_money</v-icon>
                  <span class="btn-icon-with-text">{{courseBox.stat.coin}}</span>
                </v-btn>
              </v-col>-->
              <v-col class="text-center pt-0">
                <v-btn @click="showSelectFav=true" large text icon color="gray">
                  <v-icon v-show="isIFav" color="primary">star</v-icon>
                  <v-icon v-show="!isIFav">star</v-icon>
                  <span class="btn-icon-with-text">{{courseBox.stat.favNum | numPretty}}</span>
                </v-btn>
              </v-col>
              <!-- <v-col>
                <v-btn large text icon color="gray">
                  <v-icon>share</v-icon>
                  <span class="btn-icon-with-text">{{courseBox.stat.shareNum}}</span>
                </v-btn>
              </v-col>-->
            </v-row>
          </v-col>
        </v-row>
        <!-- end 按钮栏 -->
        <v-row>
          <v-col class="mx-auto py-0" md="8">
            <v-divider class="mx-4"></v-divider>
          </v-col>
        </v-row>
        <!-- start 选集 -->
        <v-row>
          <v-col class="mx-auto pa-0 pl-4" md="8">
            <div class="pa-2">
              <span>选集</span>
              <span class="float-right mr-6">全 {{videoNum}} 话</span>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mx-auto pt-0" md="8">
            <v-slide-group v-model="slideGroup" center-active>
              <v-slide-item
                v-for="(item, index) in courseBox.videoInfos"
                :key="index"
                v-slot:default="{ active, toggle }"
              >
                <v-btn
                  @click="toggle"
                  :disabled="active"
                  x-large
                  class="mx-2"
                  outlined
                  :class="item.id==currentVideoInfoId?'v-slide-item--active':null"
                >
                  <div>第{{index+1}}话</div>
                  <div>{{item.title}}</div>
                </v-btn>
              </v-slide-item>
            </v-slide-group>
          </v-col>
        </v-row>
        <!-- end 选集 -->
      </v-container>
    </v-content>
    <!-- <v-bottom-sheet v-model="isSendDm">
      <v-sheet height="48" color="white">
        <v-row>
          <v-col cols="10" style="padding-top:0;padding-right:0;">
            <v-text-field
              v-model="dmText"
              autofocus
              solo
              shaped
              height="48px"
              label="发个友善的弹幕见证当下"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <div>
              <v-btn small color="pink" text icon>
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-bottom-sheet>-->
    <!-- start 选择收藏夹 -->
    <v-bottom-sheet v-model="showSelectFav">
      <v-list flat subheader three-line>
        <v-subheader>
          <v-icon color="yellow" class="pr-1">folder</v-icon>选择收藏夹
          <div class="flex-grow-1"></div>
          <v-btn @click="goCreateFav" text small style="color:gray;">
            <v-icon>add</v-icon>新建收藏夹
          </v-btn>
        </v-subheader>
        <div v-show="loadingSelectFav" class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <v-list-item-group v-model="selectedFavList" multiple active-class>
          <v-list-item v-for="(fav, index) in favList" :key="index">
            <template v-slot:default="{ active, toggle }">
              <v-list-item-action>
                <v-checkbox v-model="active" color="primary" @click="toggle"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{fav.name}}</v-list-item-title>
                <v-list-item-subtitle>{{fav.count}}个内容 · {{fav.isOpen?"公开":"私密"}}</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>
          <v-list-item>
            <v-btn block @click="favCourseBox">完成</v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-bottom-sheet>
    <!-- end 选择收藏夹 -->
    <!-- start 提示消息 -->
    <v-snackbar v-model="snackbar">{{ tipMsg }}</v-snackbar>
    <!-- end 提示消息 -->
  </v-app>
</template>
<script>
import VueDPlayer from "vue-dplayer";
import "vue-dplayer/dist/vue-dplayer.css";

export default {
  name: "CourseBox",
  metaInfo() {
    return {
      title: !!this.courseBox ? this.courseBox.name : ""
    };
  },
  data() {
    return {
      // 是否处于发送弹幕中
      isSendDm: false,
      // 弹幕文本
      dmText: "",
      enableDm: true,
      // 视频播放器选项
      playerOptions: {
        video: {
          url: "",
          pic: ""
        },
        autoplay: false,
        subtitle: {
          url: "/static/upload/subtitles/zm1.vtt",
          type: "webvtt",
          fontSize: "25px",
          bottom: "10%",
          color: "#b7daff"
        },
        // danmaku: {
        //   // api: "/static/upload/danmakus/add-dm-1.json",
        //   addition: ["/static/upload/danmakus/add-dm-1.json"]
        // },
        contextmenu: [
          {
            text: "GitHub",
            link: "https://github.com/MoePlayer/vue-dplayer"
          }
        ]
      },
      player: null,
      // 是否显式隐藏详细描述
      showDesc: false,
      // 滑动集数组件
      slideGroup: null,
      // 课程数据
      courseBox: {
        id: 0,
        name: "loading",
        desc: "",
        createTime: 0,
        lastUpdateTime: 0,
        creator: {
          id: 0,
          name: "",
          fansNum: 0,
          avatar: "https://cdn.vuetifyjs.com/images/john.jpg"
        },
        stat: {
          likeNum: 0,
          dislikeNum: 0,
          coin: 0,
          favNum: 0,
          shareNum: 0,
          commentNum: 0,
          viewNum: 0
        },
        videoInfos: [{ id: 0, title: "loading", playUrl: "" }]
      },
      currentVideoInfoId: 17,
      currentVideoInfoIndex: 0,
      // start 选择收藏夹
      showSelectFav: false,
      loadingSelectFav: true,
      selectedFavList: [],
      favList: [],
      favStat: {
        courseBoxFavCount: 0,
        myFavStat: { favIds: [] }
      },
      // end 选择收藏夹
      // start 提示消息
      snackbar: false,
      tipMsg: ""
      // end 提示消息
    };
  },
  computed: {
    videoNum: function() {
      if (this.courseBox != null && this.courseBox.videoInfos != null) {
        return this.courseBox.videoInfos.length;
      } else {
        return 0;
      }
    },
    // 我收藏了此课程吗
    isIFav: function() {
      if (
        !!this.favStat.myFavStat &&
        this.favStat.myFavStat.favIds.length >= 1
      ) {
        return true;
      }
      return false;
    }
  },
  components: {
    "d-player": VueDPlayer
  },
  created() {
    this.loadCourseBox();
    this.loadFavStat();
  },
  mounted() {
    this.player = this.$refs.player.dp;
  },
  methods: {
    sendDm() {
      console.log(this.dmText);
      this.player.danmaku.send(
        {
          text: this.dmText,
          color: "#b7daff",
          type: "right" // should be `top` `bottom` or `right`
        },
        function() {
          console.log("发送弹幕成功");
        }
      );
    },
    loadCourseBox() {
      this.$http({
        method: "get",
        url: "/api/CourseBox",
        params: {
          id: this.$route.params.id
        }
      })
        .then(res => {
          //res是返回结果
          console.log(res);
          this.courseBox = res.data.data;

          // 有历史记录则为历史记录课件，否则第一个课件
          if (res.data.data.lastPlayVideoInfo != null) {
            this.currentVideoInfoId = res.data.data.lastPlayVideoInfo.id;
            this.currentVideoInfoIndex =
              res.data.data.lastPlayVideoInfo.page - 1;
          } else {
            this.currentVideoInfoId = res.data.data.videoInfos[0].id;
            this.currentVideoInfoIndex = 0;
          }
          // 播放器
          // 跳转到当前集
          var video = this.courseBox.videoInfos[this.currentVideoInfoIndex];
          this.player.switchVideo({
            url: video.playUrl,
            pic: "",
            thumbnails: ""
          });
          // 如果当前集有播放历史记录，则调至上次播放位置
          if (!!video.lastPlayAt) {
            this.player.seek(video.lastPlayAt);
          }
        })
        .catch(err => {
          //请求失败就会捕获报错信息
          //err.response可拿到服务器返回的报错数据
        });
    },
    loadFavList() {
      this.loadingSelectFav = true;
      this.$http({
        method: "get",
        url: "/api/Favorite/MyFavList"
      }).then(res => {
        if (res.data.code >= 1) {
          this.favList = res.data.data.groups[0].favList;
        } else {
          this.tipMsg = res.data.message;
          this.snackbar = true;
        }
        this.loadMyFav();
        this.loadingSelectFav = false;
      });
    },

    loadFavStat() {
      this.$http({
        method: "get",
        url: "/api/Favorite/FavStatInCourseBox",
        params: {
          courseBoxId: this.$route.params.id
        }
      }).then(res => {
        if (res.data.code >= 1) {
          this.favStat = res.data.data;
        } else {
          this.tipMsg = res.data.message;
          this.snackbar = true;
        }
      });
    },

    favCourseBox() {
      this.loadFavStat();
      this.showSelectFav = false;
      // 获取要收藏到的收藏夹
      // 选择的收藏夹的ID
      var favIds = [];
      this.selectedFavList.forEach(ele => {
        var index = ele - 1;
        if (index >= 0) {
          favIds.push(this.favList[index].id);
        }
      });
      this.$http({
        method: "post",
        url: "/api/Favorite/FavCourseBox",
        data: {
          courseBoxId: this.$route.params.id,
          favListIds: favIds.join(",")
        }
      }).then(res => {
        if (res.data.code >= 1) {
          this.tipMsg = res.data.message;
          this.loadFavStat();
          this.loadMyFav();
        } else {
          this.tipMsg = res.data.message;
        }
        this.snackbar = true;
      });
    },

    loadMyFav() {
      // 加载哪些收藏夹被选中 -> 我的哪些收藏夹收藏了此课程 -> 要这些收藏夹的id
      this.selectedFavList = [];
      for (var i = 0; i < this.favList.length; i++) {
        var currentFavId = this.favList[i].id;
        if (
          !!this.favStat.myFavStat.favIds &&
          this.favStat.myFavStat.favIds.includes(currentFavId)
        ) {
          this.selectedFavList.push(i + 1);
        }
      }
    },

    goCreateFav() {
      var currentRoute = {
        name: "CourseBox",
        params: { id: this.$route.params.id }
      };
      sessionStorage.setItem("returnRoute", JSON.stringify(currentRoute));

      this.$router.push({ name: "CreateFavorite" });
    },

    back() {
      if (!!sessionStorage.getItem("returnRoute")) {
        var returnRoute = JSON.parse(sessionStorage.getItem("returnRoute"));
        sessionStorage.removeItem("returnRoute");
        this.$router.push(returnRoute);
      } else {
        this.$router.push({ name: "Home" });
      }
    },

    promiseFun(url, data) {
      return new Promise((resolve, reject) => {
        this.$http.post(url, data).then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
      });
    }
  },
  watch: {
    isSendDm(newVal) {
      // if (newVal) {
      //   this.player.pause();
      // }
    },
    enableDm(newVal) {
      if (newVal) {
        this.player.danmaku.show();
      } else {
        this.player.danmaku.hide();
      }
    },
    slideGroup(activeIndex) {
      console.log(activeIndex);
      var currentVideo = this.courseBox.videoInfos[activeIndex];
      console.log(currentVideo);
      this.currentVideoInfoId = currentVideo.id;

      // 切换课件
      this.player.switchVideo({
        url: currentVideo.playUrl,
        pic: "",
        thumbnails: ""
      });
      // 如果有播放历史记录，则调至此位置
      if (!!currentVideo.lastPlayAt) {
        this.player.seek(currentVideo.lastPlayAt);
      }
    },
    showSelectFav(newVal) {
      if (newVal) {
        this.loadFavList();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  padding: 0;
}
// 集数选择-选中项样式
.v-btn.v-slide-item--active {
  color: #e91e63 !important;
  caret-color: #e91e63 !important;
}
.btn-icon-with-text {
  transform: translate(-18px, 22px);
  font-size: 8px;
  color: gray;
}
</style>