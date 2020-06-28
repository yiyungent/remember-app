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
        <!-- start 文章显示区 -->
        <v-row>
          <v-col class="mx-auto py-0" md="8">
            <article-player></article-player>
          </v-col>
        </v-row>
        <!-- end 文章显示区 -->
        <!-- start 文章下方导航条 -->
        <v-row>
          <v-col class="mx-auto pa-0" md="8">
            <v-tabs v-model="navTabs" @change="tabsChange" class="nav-tabs">
              <v-tab>简介</v-tab>
              <v-tab>
                <span>评论</span>
                <span
                  class="pl-1 pt-1"
                  style="font-size:10px;"
                >{{article.stat.commentNum | numPretty}}</span>
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
        <!-- end 文章下方导航条 -->
        <!-- start 滑动切换区 -->
        <swiper ref="mySwiper" @slideChangeTransitionStart="slideChange">
          <swiper-slide style="overflow-x:hidden;">
            <!-- start 作者头像栏 -->
            <v-row style="padding-left: 10px;padding-right: 10px;">
              <v-col class="mx-auto pt-0" md="8">
                <v-row style="height:52px;">
                  <v-col xs="11" style="width:48px;">
                    <router-link :to="{name:'Home'}" style="text-decoration:none">
                      <v-avatar max-width="48">
                        <img :src="article.creator.avatar" />
                      </v-avatar>
                      <div style="transform: translate(60px, -46px);">
                        <div class="black--text">{{article.creator.userName | subStrPretty(5)}}</div>
                        <div
                          class="grey--text subtitle-1"
                          style="font-size:6px;"
                        >{{article.creator.fansNum | numPretty}}粉丝</div>
                      </div>
                    </router-link>
                  </v-col>
                  <v-col xs="1" offset="6">
                    <template v-if="creatorRelation==0">
                      <v-btn small color="primary" @click="follow(article.creator.id, 1)">
                        <v-icon left>add</v-icon>关注
                      </v-btn>
                    </template>
                    <template v-else-if="creatorRelation==1">
                      <v-btn small color="gray" @click="follow(article.creator.id, 2)">
                        <v-icon left>add</v-icon>已关注
                      </v-btn>
                    </template>
                    <template v-if="creatorRelation==2">
                      <v-btn small color="primary" @click="follow(article.creator.id, 1)">
                        <v-icon left>add</v-icon>回粉
                      </v-btn>
                    </template>
                    <template v-else-if="creatorRelation==3">
                      <v-btn small color="gray" @click="follow(article.creator.id, 2)">
                        <v-icon left>add</v-icon>已互粉
                      </v-btn>
                    </template>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <!-- end 作者头像栏 -->
            <!-- start 信息 -->
            <v-row style="padding-left: 10px;padding-right: 10px;">
              <v-col class="mx-auto pb-0" md="8">
                <div>
                  <span style="font-size:18px;">{{article.name || substrPretty(8) }}</span>
                  <v-btn class="float-right" icon @click="showDesc = !showDesc">
                    <v-icon>{{ showDesc ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </div>
                <div class="grey--text subtitle-1 py-1">
                  <span style="font-size:13px;" class="px-1">
                    <v-icon x-small>personal_video</v-icon>
                    <span>{{article.stat.viewNum | numPretty}}</span>
                  </span>
                  <span
                    style="font-size:13px;"
                    class="px-1"
                  >{{article.lastUpdateTime | dateFormat('YYYY-MM-DD HH:mm')}}</span>
                </div>
              </v-col>
            </v-row>
            <!-- end 信息 -->
            <!-- start 描述 -->
            <v-row>
              <v-col class="mx-auto py-0" md="8">
                <v-expand-transition>
                  <div class="px-3" v-show="showDesc">{{article.desc}}</div>
                </v-expand-transition>
              </v-col>
            </v-row>
            <!-- end 描述 -->
            <!-- start 按钮栏 -->
            <v-row>
              <v-col class="mx-auto py-0" md="8">
                <v-row class="mx-auto">
                  <v-col class="text-center pt-0">
                    <v-btn large text icon color="gray">
                      <v-icon>thumb_up</v-icon>
                      <span class="btn-icon-with-text">{{article.stat.likeNum | numPretty}}</span>
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
                  <span class="btn-icon-with-text">{{article.stat.coin}}</span>
                </v-btn>
                  </v-col>-->
                  <v-col class="text-center pt-0">
                    <v-btn @click="showSelectFav=true" large text icon color="gray">
                      <v-icon v-show="isIFav" color="primary">star</v-icon>
                      <v-icon v-show="!isIFav">star</v-icon>
                      <span class="btn-icon-with-text">{{article.stat.favNum | numPretty}}</span>
                    </v-btn>
                  </v-col>
                  <!-- <v-col>
                <v-btn large text icon color="gray">
                  <v-icon>share</v-icon>
                  <span class="btn-icon-with-text">{{article.stat.shareNum}}</span>
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
          <swiper-slide style="overflow-x:hidden;">
            <v-row style="padding-left: 10px;padding-right: 10px;">
              <v-col class="mx-auto pa-0" md="8">
                <comments @sendCommentSuccess="sendCommentSuccess"></comments>
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
    <!-- start 提示消息 -->
    <v-snackbar v-model="snackbar">{{ tipMsg }}</v-snackbar>
    <!-- end 提示消息 -->
  </v-app>
</template>
<script>
import comments from "./Comments";
import oneColItemList from "@/components/Common/OneColItemList";
import moment from "moment";

export default {
  components: {
    comments,
    oneColItemList,
  },
  data() {
    return {
      player: null,
      // 是否显式隐藏详细描述
      showDesc: false,
      // 导航条[简介，评论]
      navTabs: 0,
      // 滑动集数组件
      slidePage: null,
      // 数据
      article: {
        id: 0,
        title: "loading",
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
      },
      // 我的此创建者的关系
      creatorRelation: 0,
      // 更多推荐
      recom: {
        articles: [
          {
            id: 1,
            title: "推荐1",
            picUrl: "https://www.tikotiko.fun/upload/images/courseBoxPics/4.jpg",
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
            title: "推荐2",
            picUrl: "https://www.tikotiko.fun/upload/images/courseBoxPics/4.jpg",
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
            title: "推荐3",
            picUrl: "https://www.tikotiko.fun/upload/images/courseBoxPics/4.jpg",
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
      tipMsg: "",
      // end 提示消息
    };
  },
  computed: {
    // 我收藏了此吗
    isIFav: function() {
      if (
        !!this.favStat.myFavStat &&
        this.favStat.myFavStat.favIds.length >= 1
      ) {
        return true;
      }
      return false;
    },
    // 我看过了此吗
    isISeen: function() {
      return !!this.article.joinTime && this.article.joinTime > 0;
    },
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  created() {
    this.loadCourseBox();
    this.loadFavStat();
  },
  mounted() {
    this.player = this.$refs.player;
    window.player = this.player;

    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    window.swiper = this.swiper;
    // this.swiper.on('slideChange', this.slideChangeStart)
  },
  methods: {
    loadArticle() {
      this.$http({
        method: "get",
        url: "/api/Article",
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        //res是返回结果
        // console.log(res);
        this.article = res.data.data;

        // 判断是否有历史记录，历史记录提示只出现在第一次打开页时
        if (res.data.data.lastPlayVideoInfo != null) {
          // 有历史记录，弹出提示
          this.playHistoryTip(this.article.lastPlayVideoInfo);
        }

        this.loadRelation();
      });
    },

    loadRelation() {
      // 获取当前登录账号和此创建者的关系
      this.$http({
        method: "get",
        url: "/api/User/Relation",
        params: {
          uids: this.article.creator.id
        }
      }).then(res => {
        this.creatorRelation = res.data.data.relations[0].relation;
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

    favArticle() {
      this.loadFavStat();
      this.showSelectFav = false;
      // 获取要收藏到的收藏夹
      // 选择的收藏夹的ID
      var favIds = [];
      this.selectedFavList.forEach(ele => {
        var index = ele;
        console.log(index);
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
      // 加载哪些收藏夹被选中 -> 我的哪些收藏夹收藏了此 -> 要这些收藏夹的id
      this.selectedFavList = [];
      for (var i = 0; i < this.favList.length; i++) {
        var currentFavId = this.favList[i].id;
        if (
          !!this.favStat.myFavStat.favIds &&
          this.favStat.myFavStat.favIds.includes(currentFavId)
        ) {
          this.selectedFavList.push(i);
        }
      }
    },

    sendCommentSuccess() {
      this.article.stat.commentNum = this.article.stat.commentNum + 1;
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

    // 关注
    follow(uid, act) {
      this.$http({
        method: "post",
        url: "/api/User/Follow",
        params: {
          uid: this.article.creator.id,
          act: act
        }
      }).then(res => {
        if (res.data.code > 0) {
          this.creatorRelation = res.data.data.relation;
          this.article.creator.fansNum = res.data.data.followed.fans;
        } else {
          console.log("关注失败");
        }
      });
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
      this.switchPage(activeIndex + 1);
    },
    showSelectFav(newVal) {
      if (newVal) {
        this.favList = [];
        this.loadFavList();
      }
    },
    $route(newVal) {
      this.loadArticle();
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
.v-list-showPage {
  .v-btn--block {
    min-width: 90% !important;
  }
}
</style>