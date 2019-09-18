<template>
  <v-app id="inspire">
    <!-- start 应用栏 -->
    <v-app-bar hide-on-scroll :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary" dark>
      <v-btn icon>
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
        <v-row>
          <v-col class="mx-auto py-0" md="8">
            <d-player :options="playerOptions" ref="player"></d-player>
          </v-col>
        </v-row>
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
        <v-row>
          <v-col class="mx-auto pt-0" md="8">
            <v-row style="height:52px;">
              <v-col xs="7" style="width:48px;">
                <router-link :to="{name:'Home'}" style="text-decoration:none">
                  <v-avatar max-width="48">
                    <img :src="courseBox.creator.avatar" alt="John" />
                  </v-avatar>
                  <div style="transform: translate(60px, -46px);">
                    <div class="black--text">{{courseBox.creator.name}}</div>
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
                <v-icon x-small>personal_video</v-icon>{{courseBox.stat.viewNum}}
              </span>
              <span style="font-size:13px;" class="px-1">
                <v-icon x-small>star</v-icon>{{courseBox.stat.favNum}}
              </span>
              <span style="font-size:13px;" class="px-1">{{courseBox.lastUpdateTime}}</span>
              <span style="font-size:13px;" class="px-1">
                <v-icon x-small>personal_video</v-icon>全站日排行榜最高第九名
              </span>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mx-auto py-0" md="8">
            <v-expand-transition>
              <div v-show="showDesc">
                <v-card-text class="py-1">{{courseBox.desc}}</v-card-text>
              </div>
            </v-expand-transition>
          </v-col>
        </v-row>
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
                  <span class="btn-icon-with-text">{{courseBox.stat.share}}</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mx-auto py-0" md="8">
            <v-divider class="mx-4"></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mx-auto pa-0 pl-4" md="8">
            <!-- start 选集 -->
            <div class="pa-1 pb-0">选集</div>
            <!-- end 选集 -->
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mx-auto pt-0" md="8">
            <v-slide-group v-model="slideGroup" class center-active show-arrows>
              <v-slide-item
                v-for="(item, index) in courseInfos"
                :key="index"
                v-slot:default="{ active, toggle }"
              >
                <v-btn
                  @click="toggle"
                  :disabled="active"
                  x-large
                  class="mx-2"
                  outlined
                  :class="item.id==currentCourseInfoId?'v-slide-item--active':null"
                >
                  <div>第{{index+1}}话</div>
                  <div>{{item.title}}</div>
                </v-btn>
              </v-slide-item>
            </v-slide-group>
          </v-col>
        </v-row>
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
          url: "http://static.smartisanos.cn/common/video/t1-ui.mp4",
          pic:
            "http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg"
        },
        autoplay: false,
        // danmaku: {
        //   // ...
        //   addition: ["https://api.prprpr.me/dplayer/v3/bilibili?aid=[aid]"]
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
        id: 425,
        name: "大学计算机的自我修养",
        desc: "这里是大学计算机的自我修养的详细描述",
        createTime: 1231231232222,
        lastUpdateTime: 1231231232222,
        creator: {
          id: 1,
          name: "沙优优",
          fansNum: 2313,
          avatar: "https://cdn.vuetifyjs.com/images/john.jpg"
        },
        stat: {
          likeNum: 434,
          dislikeNum: 13,
          coin: 23,
          favNum: 33,
          share: 12,
          commentNum: 20000,
          viewNum: 2313
        }
      },
      courseInfos: [
        { id: 12, title: "测试12", videoUrl: "" },
        { id: 13, title: "测试13", videoUrl: "" },
        { id: 14, title: "测试14", videoUrl: "" },
        { id: 15, title: "测试15", videoUrl: "" },
        { id: 16, title: "测试16", videoUrl: "" },
        { id: 17, title: "测试17", videoUrl: "" },
        { id: 18, title: "测试18", videoUrl: "" }
      ],
      currentCourseInfoId: 17
    };
  },
  components: {
    "d-player": VueDPlayer
  },
  mounted() {
    this.player = this.$refs.player.dp;
  },
  methods: {
    sendDm() {
      console.log(this.dmText);
    }
  },
  watch: {
    isSendDm(newVal) {
      if (newVal) {
        this.player.pause();
      }
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
      console.log(this.courseInfos[activeIndex]);
      this.currentCourseInfoId = this.courseInfos[activeIndex].id;
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