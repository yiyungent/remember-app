<template>
  <div>
    <v-bottom-navigation grow fixed color="primary" light v-model="activeBtnModel">
      <v-btn :to="{name:'Home'}">
        <span>首页</span>
        <v-icon>fa-home</v-icon>
      </v-btn>
      <v-btn :to="{name:'Channel'}">
        <span>频道</span>
        <v-icon>fa-cubes</v-icon>
      </v-btn>
      <v-btn>
        <span>动态</span>
        <v-icon>fa-comments-o</v-icon>
      </v-btn>
      <v-btn>
        <span>会员购</span>
        <v-icon>fa-shopping-bag</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  props: {
    activeBtn: Number
  },
  data() {
    return {
      activeBtnModel: this.activeBtn
    };
  },
  watch: {
    // activeBtnModel() {
    //   this.$emit("activeChange", this.activeBtnModel);
    // },
    // activeBtn() {
    //   this.activeBtnModel = this.activeBtn;
    // }
  }
};
</script>

<style>
</style>