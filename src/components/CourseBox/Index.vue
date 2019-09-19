<template>
  <v-app id="inspire">
    <!-- start 应用栏 -->
    <v-app-bar hide-on-scroll :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary" dark>
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
                <span style="font-size:10px;">{{courseBox.stat.commentNum}}</span>
              </v-tab>
              <div class="flex-grow-1"></div>
              <v-btn-toggle rounded fixed>
                <v-expand-x-transition>
                  <v-btn
                    v-show="enableDm"
                    @click="isSendDm=!isSendDm"
                  >{{ isSendDm?'弹幕输入中':'点我发弹幕' }}</v-btn>
                </v-expand-x-transition>
                <v-btn @click="enableDm=!enableDm">
                  <v-icon>{{enableDm?'personal_video':'tv_off'}}</v-icon>
                </v-btn>
              </v-btn-toggle>
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
                    <img :src="courseBox.creator.avatar" alt="John" />
                  </v-avatar>
                  <div style="transform: translate(60px, -46px);">
                    <div class="black--text">{{courseBox.creator.name | subStrPretty(5)}}</div>
                    <div class="grey--text subtitle-1">{{courseBox.creator.fansNum}}粉丝</div>
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
          <v-col class="mx-auto" md="8">
            <div>
              <span>{{courseBox.name}}</span>
              <v-btn class="float-right mr-4" icon @click="showDesc = !showDesc">
                <v-icon>{{ showDesc ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </div>
            <div class="grey--text subtitle-1 py-1">
              <span style="font-size:13px;" class="px-1">
                <v-icon x-small>personal_video</v-icon>
                {{courseBox.stat.viewNum}}
              </span>
              <span style="font-size:13px;" class="px-1">
                <v-icon x-small>star</v-icon>
                {{courseBox.stat.favNum}}
              </span>
              <span style="font-size:13px;" class="px-1">{{courseBox.lastUpdateTime}}</span>
              <span style="font-size:13px;" class="px-1">
                <v-icon x-small>personal_video</v-icon>全站日排行榜最高第九名
              </span>
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
              <v-col>
                <v-btn large text icon color="gray">
                  <v-icon>thumb_up</v-icon>
                  <span class="btn-icon-with-text">{{courseBox.stat.likeNum}}</span>
                </v-btn>
              </v-col>
              <v-col>
                <v-btn large text icon color="gray">
                  <v-icon>thumb_down</v-icon>
                  <span class="btn-icon-with-text">{{courseBox.stat.dislikeNum}}</span>
                </v-btn>
              </v-col>
              <v-col>
                <v-btn large text icon color="gray">
                  <v-icon>attach_money</v-icon>
                  <span class="btn-icon-with-text">{{courseBox.stat.coin}}</span>
                </v-btn>
              </v-col>
              <v-col>
                <v-btn large text icon color="gray">
                  <v-icon>star</v-icon>
                  <span class="btn-icon-with-text">{{courseBox.stat.favNum}}</span>
                </v-btn>
              </v-col>
              <v-col>
                <v-btn large text icon color="gray">
                  <v-icon>share</v-icon>
                  <span class="btn-icon-with-text">{{courseBox.stat.shareNum}}</span>
                </v-btn>
              </v-col>
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
    <v-bottom-sheet v-model="isSendDm">
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
    </v-bottom-sheet>
  </v-app>
</template>
<script>
import VueDPlayer from "vue-dplayer";
import "vue-dplayer/dist/vue-dplayer.css";

export default {
  name: "CourseBox",
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
        danmaku: {
          api: "/static/upload/danmakus/add-dm-1.json",
          addition: ["/static/upload/danmakus/add-dm-1.json"]
        },
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
      currentVideoInfoIndex: 0
    };
  },
  computed: {
    videoNum: function() {
      if (this.courseBox != null && this.courseBox.videoInfos != null) {
        return this.courseBox.videoInfos.length;
      } else {
        return 0;
      }
    }
  },
  components: {
    "d-player": VueDPlayer
  },
  mounted() {
    this.player = this.$refs.player.dp;
    this.loadCourseBox();
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
          this.player.switchVideo({
            url: this.courseBox.videoInfos[this.currentVideoInfoIndex].content,
            pic: "",
            thumbnails: ""
          });
        })
        .catch(err => {
          //请求失败就会捕获报错信息
          //err.response可拿到服务器返回的报错数据
        });
    },
    back() {
      this.$router.go(-1);
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
      console.log(this.courseBox.videoInfos[activeIndex]);
      this.currentVideoInfoId = this.courseBox.videoInfos[activeIndex].id;

      // 切换课件
      var currentVideoInfo = this.courseBox.videoInfos[activeIndex];
      this.player.switchVideo({
        url: currentVideoInfo.playUrl,
        pic: "",
        thumbnails: ""
      });
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
  transform: translate(-24px, 22px);
  font-size: 8px;
  color: gray;
}
</style>