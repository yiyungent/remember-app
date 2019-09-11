<template>
  <div>
    <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">{{courseBox?courseBox.name:'无此课程'}}
    </x-header>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" show-cancel></actionsheet>
    </div>
  </div>
</template>

<script>
  import {XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem} from 'vux'

  export default {
    name: "CourseBoxDetails",
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Actionsheet,
      ButtonTab,
      ButtonTabItem
    },
    data() {
      return {
        courseBox: null,
        user: null,
        isFold: true,
        isILearn: true,
        isICreate: true,
        showMenus: false,
      }
    },
    computed: {
      menus: function () {
        var menusResult = {};
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
  }
</script>

<style scoped>

</style>
