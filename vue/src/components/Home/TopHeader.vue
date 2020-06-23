<template>
  <div>
    <v-app-bar hide-on-scroll :clipped-left="$vuetify.breakpoint.lgAndUp" app color="white" light>
      <v-app-bar-nav-icon @click.stop="drawerClick"></v-app-bar-nav-icon>
      <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img :src="!!user?user.avatar:'/static/images/guest-avatar.jpg'"></v-img>
        </v-avatar>
      </v-btn>
      <v-toolbar-title>
        <span class="hidden-sm-and-down">remember</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-badge overlap left>
          <template v-slot:badge>0</template>
          <v-icon>fa-envelope-o</v-icon>
        </v-badge>
      </v-btn>
      <!-- start 选项卡 -->
      <template v-slot:extension>
        <v-tabs background-color="transparent" center-active>
          <v-tab v-for="(item, i) in tabs" :key="i" :to="item.route">{{ item.text }}</v-tab>
        </v-tabs>
      </template>
      <!-- end 选项卡 -->
    </v-app-bar>
  </div>
</template>

<script>
export default {
  props: {
    tabs: Array,
    user: Object,
    drawerClick: Function
  }
};
</script>

<style>
</style>