<template>
  <v-app id="inspire">
    <router-view></router-view>
    <!-- start 底部导航区 -->
    <bottom-nav v-model="bNavActiveBtn"></bottom-nav>
    <!-- end 底部导航区 -->
  </v-app>
</template>

<script>
import bottomNav from "@/components/Common/BottomNav";

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
<style lang="less" scoped>
</style>
