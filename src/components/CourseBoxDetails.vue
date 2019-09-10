<template>
    <div>
      <h1>{{courseBox.id}}</h1>
      <p>{{courseBox.description}}</p>
    </div>
</template>

<script>
    export default {
        name: "CourseBoxDetails",
        data () {
          return {
            courseBox: {
              id: 0,
              description: ''
            }
          }
        },
      mounted(){
        //get或者post , api为接口地址
        this.$http({
          method: 'get',
          url: '/api/CourseBox',
          params:{
            id: this.$route.params.id
          }
        }).then(res => {  //res是返回结果
          console.log(res)
          this.courseBox = res.data.data
        }).catch(err => { //请求失败就会捕获报错信息
          //err.response可拿到服务器返回的报错数据
        })
      }
    }
</script>

<style scoped>

</style>
