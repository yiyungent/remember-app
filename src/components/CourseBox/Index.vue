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
      <v-btn icon @click="showMore=!showMore">
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- end 应用栏 -->
    <v-content>
      <v-container fluid>
        <!-- start 视频播放区 -->
        <v-row>
          <v-col class="mx-auto py-0" md="8">
            <div id="video" style="height:240px;"></div>
          </v-col>
        </v-row>
        <!-- end 视频播放区 -->
        <!-- start 视频下方导航条 -->
        <v-row>
          <v-col class="mx-auto pa-0" md="8">
            <v-tabs v-model="navTabs" @change="tabsChange" class="nav-tabs">
              <v-tab>简介</v-tab>
              <v-tab>
                <span>评论</span>
                <span
                  class="pl-1 pt-1"
                  style="font-size:10px;"
                >{{courseBox.stat.commentNum | numPretty}}</span>
              </v-tab>
              <!-- <div class="flex-grow-1"></div> -->
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
        <!-- start 滑动切换区 -->
        <swiper ref="mySwiper" @slideChangeTransitionStart="slideChange">
          <swiper-slide style="overflow:hidden;">
            <!-- start 课程作者头像栏 -->
            <v-row style="padding-left: 10px;padding-right: 10px;">
              <v-col class="mx-auto pt-0" md="8">
                <v-row style="height:52px;">
                  <v-col xs="11" style="width:48px;">
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
                  <v-col xs="1" offset="6">
                    <v-btn small color="primary">
                      <v-icon left>add</v-icon>关注
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <!-- end 课程作者头像栏 -->
            <!-- start 课程信息 -->
            <v-row style="padding-left: 10px;padding-right: 10px;">
              <v-col class="mx-auto pb-0" md="8">
                <div>
                  <span style="font-size:18px;">{{courseBox.name || substrPretty(8) }}</span>
                  <v-btn class="float-right" icon @click="showDesc = !showDesc">
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
                  <div class="px-3" v-show="showDesc">{{courseBox.desc}}</div>
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
                      <span class="btn-icon-with-text"></span>
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
                <div class="pa-2" style="vertical-align:middle" @click="showPage = true">
                  <span>选集</span>
                  <span class="float-right">
                    <v-btn text small class="txt-gray txt-16">
                      全 {{videoNum}} 集
                      <v-icon class="pl-2">fa-angle-right</v-icon>
                    </v-btn>
                  </span>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="mx-auto pt-0" md="8">
                <v-slide-group v-model="slidePage" center-active>
                  <v-slide-item
                    v-for="(item, index) in courseBox.videoInfos"
                    :key="item.id"
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
                      <div>第{{index+1}}集</div>
                      <div>{{item.title}}</div>
                    </v-btn>
                  </v-slide-item>
                </v-slide-group>
              </v-col>
            </v-row>
            <!-- end 选集 -->
            <v-row>
              <v-col class="mx-auto py-0" md="8">
                <v-divider class="mx-4"></v-divider>
              </v-col>
            </v-row>
            <!-- start 更多推荐 -->
            <v-row>
              <v-col class="mx-auto pa-0 pl-4" md="8">
                <div class="pa-2">
                  <span>更多推荐</span>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="mx-auto py-0" md="8">
                <one-col-video-list :list="recom.courseBoxs" @goItem="goRecomItem"></one-col-video-list>
              </v-col>
            </v-row>
            <!-- end 更多推荐 -->
          </swiper-slide>
          <swiper-slide style="overflow:hidden;">
            <v-row style="padding-left: 10px;padding-right: 10px;">
              <v-col class="mx-auto pa-0" md="8">
                <comments></comments>
              </v-col>
            </v-row>
          </swiper-slide>
        </swiper>
        <!-- end 滑动切换区 -->
      </v-container>
    </v-content>
    <!-- start 选择收藏夹 -->
    <v-bottom-sheet v-model="showSelectFav">
      <v-list class="pb-0" flat subheader three-line>
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
          <v-btn block @click="favCourseBox">完成</v-btn>
        </v-list-item-group>
      </v-list>
    </v-bottom-sheet>
    <!-- end 选择收藏夹 -->
    <!-- start 底部更多菜单 -->
    <v-bottom-sheet v-model="showMore">
      <v-list>
        <v-list-item @click="learnCourseBox">
          <v-list-item-icon>
            <v-icon>{{isILearn?"cancel":"add"}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{isILearn?"取消学习":"加入学习"}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
    <!-- end 底部更多菜单 -->
    <!-- start 展开选集 -->
    <v-bottom-sheet v-model="showPage">
      <v-list class="v-list-showPage">
        <v-subheader class="justify-space-between" style="height:30px;">
          <span>选集（{{videoNum}}）</span>
          <span>
            <v-btn icon @click="showPage=false">
              <v-icon>close</v-icon>
            </v-btn>
          </span>
        </v-subheader>
        <swiper :options="showPageOption">
          <swiper-slide>
            <v-list-item v-for="(item, index) in courseBox.videoInfos" :key="item.id">
              <v-btn
                class="justify-space-between"
                block
                outlined
                :class="item.id==currentVideoInfoId?'currentPlay':null"
                @click="switchPage(index)"
              >
                <span>第 {{index+1}} 集</span>
                <span class="txt-gray">{{ item.title }}</span>
              </v-btn>
            </v-list-item>
          </swiper-slide>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
      </v-list>
    </v-bottom-sheet>
    <!-- end 展开选集 -->
    <!-- start 提示消息 -->
    <v-snackbar v-model="snackbar">{{ tipMsg }}</v-snackbar>
    <!-- end 提示消息 -->
  </v-app>
</template>
<script>
import comments from "./Comments";
import oneColVideoList from "../Common/OneColVideoList";

export default {
  name: "CourseBox",
  metaInfo() {
    return {
      title: !!this.courseBox ? this.courseBox.name : ""
    };
  },
  components: {
    comments,
    oneColVideoList
  },
  data() {
    return {
      // 视频对象
      videoObject: {
        container: "#video", //“#”代表容器的ID，“.”或“”代表容器的class
        variable: "player", //该属性必需设置，值等于下面的new chplayer()的对象
        video:
          "https://remstatic.oss-cn-beijing.aliyuncs.com/videos/01-%E7%A7%BB%E5%8A%A8web%E5%BC%80%E5%8F%91_01/1%E3%80%81%E5%A7%94%E6%89%98%E5%A4%8D%E4%B9%A0.mp4" //视频地址(必填)
      },
      player: null,
      // 是否显式隐藏详细描述
      showDesc: false,
      // 导航条[简介，评论]
      navTabs: 0,
      // 滑动集数组件
      slidePage: null,
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
      // 更多推荐
      recom: {
        courseBoxs: [
          {
            id: 1,
            name: "推荐1",
            picUrl: "http://r.moeci.com//upload/images/courseBoxPics/4.jpg",
            creator: {
              id: 1,
              userName: "哈哈"
            },
            stat: {
              favNum: 12,
              viewNum: 56
            }
          },
          {
            id: 2,
            name: "推荐2",
            picUrl: "http://r.moeci.com//upload/images/courseBoxPics/4.jpg",
            creator: {
              id: 1,
              userName: "看看"
            },
            stat: {
              favNum: 12,
              viewNum: 123
            }
          },
          {
            id: 3,
            name: "推荐3",
            picUrl: "http://r.moeci.com//upload/images/courseBoxPics/4.jpg",
            creator: {
              id: 1,
              userName: "建军节"
            },
            stat: {
              favNum: 12,
              viewNum: 56
            }
          }
        ]
      },
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
      // start 是否显示更多底部菜单
      showMore: false,
      // end 是否显示更多底部菜单
      // 展示选集页
      showPage: false,
      showPageOption: {
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: true,
        scrollbar: {
          el: ".swiper-scrollbar"
        },
        mousewheel: true
      },
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
    },
    // 我学习了此课程吗
    isILearn: function() {
      return !!this.courseBox.joinTime && this.courseBox.joinTime > 0;
    },
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  created() {
    console.log("created");
    this.loadCourseBox();
    this.loadFavStat();
  },
  mounted() {
    this.player = new ckplayer(this.videoObject);
    window.player = this.player;

    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    window.swiper = this.swiper;
    // this.swiper.on('slideChange', this.slideChangeStart)
  },
  methods: {
    loadCourseBox() {
      this.$http({
        method: "get",
        url: "/api/CourseBox",
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        //res是返回结果
        // console.log(res);
        this.courseBox = res.data.data;

        // 有历史记录则为历史记录课件，否则第一个课件
        if (res.data.data.lastPlayVideoInfo != null) {
          this.currentVideoInfoId = res.data.data.lastPlayVideoInfo.id;
          this.currentVideoInfoIndex = res.data.data.lastPlayVideoInfo.page - 1;
        } else {
          this.currentVideoInfoId = res.data.data.videoInfos[0].id;
          this.currentVideoInfoIndex = 0;
        }
        // 播放器
        // 跳转到当前集
        var video = this.courseBox.videoInfos[this.currentVideoInfoIndex];
        this.player.newVideo({ autoplay: false, video: video.playUrl });
        // 如果当前集有播放历史记录，则调至上次播放位置
        if (!!video.lastPlayAt) {
          // TODO: 注意：这里是关键帧，而不是秒数
          this.player.videoSeek(video.lastPlayAt);
        }
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

    // 加入学习/取消学习此课程
    learnCourseBox() {
      this.showMore = false;
      this.$http({
        method: "post",
        url: "/api/CourseBox/LearnCourseBox",
        data: {
          courseBoxId: this.$route.params.id
        }
      }).then(res => {
        this.tipMsg = res.data.message;
        this.snackbar = true;
        if (res.data.code >= 1) {
          // 更新data - 计算属性才会随之更新
          if (this.isILearn) {
            this.courseBox.joinTime = -1;
          } else {
            this.courseBox.joinTime = res.data.data.joinTime;
          }
        }
      });
    },

    slideChange() {
      this.navTabs = this.swiper.activeIndex;
      if (this.navTabs == 1) {
        // TODO: 命令 评论组件开始加载评论数据
        console.log("开始加载评论数据");
      }
    },

    tabsChange(val) {
      this.swiper.slideTo(val, 220, true);
    },

    // 切换视频集
    switchPage(currentIndex) {
      var currentVideo = this.courseBox.videoInfos[currentIndex];
      this.currentVideoInfoId = currentVideo.id;
      // 切换课件
      this.player.newVideo({ autoplay: false, video: currentVideo.playUrl });
      // 如果有播放历史记录，则调至此位置
      if (!!currentVideo.lastPlayAt) {
        // TODO: 注意：这里是关键帧，而不是秒数
        this.player.videoSeek(currentVideo.lastPlayAt);
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

    goRecomItem() {},

    back() {
      if (!!sessionStorage.getItem("returnRoute")) {
        var returnRoute = JSON.parse(sessionStorage.getItem("returnRoute"));
        sessionStorage.removeItem("returnRoute");
        this.$router.push(returnRoute);
      } else {
        this.$router.push({ name: "Home" });
      }
    }
  },
  watch: {
    slidePage(activeIndex) {
      this.switchPage(activeIndex);
    },
    showSelectFav(newVal) {
      if (newVal) {
        this.loadFavList();
      }
    },
    $route(newVal) {
      this.loadCourseBox();
      this.loadFavStat();
    }
  }
};
</script>
<style lang="less" scoped>
.theme--light.v-application {
  background: #fff;
}
.container {
  padding: 0;
}
.nav-tabs {
  box-shadow: 0px 13px 15px -17px #ccc;
  margin-bottom: 5px;
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
.txt-gray {
  color: gray;
  font-weight: 300;
}
.txt-16 {
  font-size: 16px;
}
.currentPlay {
  color: #e91e63 !important;
  caret-color: #e91e63 !important;
  .txt-gray {
    color: #e91e63 !important;
  }
}
.v-list-showPage {
  .v-btn--block {
    min-width: 90% !important;
  }
}
</style>