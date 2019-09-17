<template>
  <v-app id="inspire">
    <div>
      <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
    </div>
    <div>
      <v-tabs fixed-tabs>
        <v-tab>Item One</v-tab>
        <v-tab>Item Two</v-tab>
        <v-tab>Item Three</v-tab>
      </v-tabs>
    </div>
    <div>
      <v-container fluid>
        <v-row>
          <v-col cols="12" xs="12">
            <div>Top western road trips</div>
            <span class="grey--text subtitle-1">1,000 miles of wonder</span>
          </v-col>
        </v-row>
        <v-divider class="mx-4"></v-divider>
        <!-- start 选集 -->
        <div>选集</div>
        <!-- end 选集 -->
        <v-divider class="mx-4"></v-divider>
      </v-container>
    </div>
  </v-app>
</template>
<script>
export default {
  name: "CourseBox",
  data() {
    return {
      show: false
    };
  }
};
</script>
<style lang="less" scoped>
</style>