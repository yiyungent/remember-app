<template>
  <div style="height:100%;">
    <view-box ref="viewBox">
      <!-- 顶部工具条 -->
      <x-header slot="header" :left-options="{backText: ''}" :right-options="{showMore: true}" @on-click-more="showMenus = true">{{courseBox?courseBox.name:'无此课程'}}
      </x-header>
      <!-- 顶部右侧展开更多菜单 -->
      <div v-transfer-dom>
        <actionsheet :menus="menus" v-model="showMenus" show-cancel></actionsheet>
      </div>
      <router-view></router-view>
      <!-- 底部导航栏 -->
      <tabbar slot="bottom">
        <tabbar-item v-bind:selected="0==currentTabbarItemIndex" :link="0==currentTabbarItemIndex?'':'/CourseBox/'+courseBox.id">
          <img slot="icon" src="../assets/icons/edit.png">
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item v-bind:selected="1==currentTabbarItemIndex" :link="1==currentTabbarItemIndex?'':'/CourseBox/'+courseBox.id+'/CommentList'">
          <img slot="icon" src="../assets/icons/edit.png">
          <span slot="label">评论</span>
        </tabbar-item>
        <tabbar-item v-bind:selected="2==currentTabbarItemIndex" :link="2==currentTabbarItemIndex?'':'/CourseBox/'+courseBox.id+'/Catalog'">
          <img slot="icon" src="../assets/icons/edit.png">
          <span slot="label">目录</span>
        </tabbar-item>
        <tabbar-item v-bind:selected="3==currentTabbarItemIndex" :link="3==currentTabbarItemIndex?'':'/CourseBox/'+courseBox.id+'/Analyze'">
          <img slot="icon" src="../assets/icons/edit.png">
          <span slot="label">统计</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
  import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, Tabbar, TabbarItem } from 'vux'

  export default {
    name: "CourseBox",
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Actionsheet,
      ButtonTab,
      ButtonTabItem,
      Tabbar,
      TabbarItem
    },
    data() {
      return {
        courseBox: {
          id: 0
        },
        user: null,
        isFold: true,
        isILearn: true,
        isICreate: true,
        showMenus: false,
      }
    },
    computed: {
      menus: function () {
        if (this.isILearn) {
          menusResult.menu1 = '取消学习';
        } else {
          menusResult.menu1 = '加入学习';
        }
        if (this.isICreate) {
          menusResult.menu2 = '编辑';
          menusResult.menu3 = '删除';
          menusResult.menu4 = '添加课件';
        }
        menusResult.menu5 = '举报';

        return menusResult;
      },
      currentTabbarItemIndex: function () {
        var tabbarItemIndex = this.$route.meta.tabbarItem;
        return tabbarItemIndex;
      }
    },
    mounted() {
      // load courseBox
      this.$http({
        method: 'get',
        url: '/api/CourseBox',
        params: {
          id: this.$route.params.id
        }
      }).then(res => {  //res是返回结果
        console.log(res)
        this.courseBox = res.data.data
      }).catch(err => { //请求失败就会捕获报错信息
        //err.response可拿到服务器返回的报错数据
      })
      // load user
      this.$http({
        method: 'get',
        url: '/api/User',
      }).then(function (res) {
        console.log(res);
        this.user = res.data;
      }).catch(function (error) { // 请求失败处理
        console.log(error);
      });

    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
