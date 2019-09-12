<template>
  <panel header="课程目录" :list="list" :type="type" :footer="footer"></panel>
</template>

<script>
  import {Panel} from 'vux'

  export default {
    name: "CourseBoxCatalog",
    components: {
      Panel
    },
    data() {
      return {
        type: '1',
        list: [{
          src: 'https://hbimg.huabanimg.com/2eb26c236f96a6ae5228fdc7448b9795a3a6549f4bee-DOOnnk_fw658',
          title: '标题一',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/CourseInfo/1'
        }],
        footer: {
          title: '添加课件',
          url: 'http://vux.li'
        },
        isICreate: true,
      }
    },
    mounted() {
      // 加载当前登录用户创建的课程
      this.$http({
        method: 'get',
        url: '/api/CourseBox/ICreate',
      }).then(res => {  //res是返回结果
        var iCreateList = res.data.data;
        var currentCourseBox = this.$route.id;
        iCreateList.forEach(function (currentVal) {
          console.log(this);
          if (currentVal.id == currentCourseBox) {
            this.isICreate = true;
          }
        }, this)
      }).catch(err => { //请求失败就会捕获报错信息
        //err.response可拿到服务器返回的报错数据
      })

    },
  }
</script>

<style scoped>

</style>
