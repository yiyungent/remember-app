<template>
  <v-app id="inspire">
    <router-view></router-view>
    <!-- start 底部导航区 -->
    <bottom-nav :activeBtn="bNavActiveBtn" @activeChange="(val)=>{bNavActiveBtn=val}"></bottom-nav>
    <!-- end 底部导航区 -->
  </v-app>
</template>

<script>
import bottomNav from "../../components/Home/BottomNav";

export default {
  components: {
    bottomNav
  },
  data() {
    return {
      bNavActiveBtn: 0
    };
  }
};
</script>

<style>
</style>