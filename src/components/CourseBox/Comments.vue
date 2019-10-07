<template>
  <v-list class="pa-0">
    <v-subheader>最新评论</v-subheader>
    <v-list-item class="pa-0">
      <v-col class="py-0">
        <v-row>
          <v-col class="py-0" cols="1">
            <v-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </v-col>
          <v-col class="py-0" cols="4">
            <span>躲雨的猫</span>
          </v-col>
          <v-col class="py-0 ml-auto" cols="4">
            <span class="float-right">2019-12-26</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0" cols="1"></v-col>
          <v-col class="py-0" xs="12">评论内容</v-col>
        </v-row>
        <v-row>
          <v-col class="py-0" cols="1"></v-col>
          <v-col class="py-0" xs="6">
            <span>
              <v-btn class="ma-2" x-small icon color="gray">
                <v-icon>fa-thumbs-o-up</v-icon>
                <span class="btn-icon-with-text">39</span>
              </v-btn>
              <v-btn class="ma-4" x-small icon color="gray">
                <v-icon>fa-thumbs-o-down</v-icon>
                <span class="btn-icon-with-text"></span>
              </v-btn>
            </span>
          </v-col>
          <v-col xs="6">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn class="float-right" x-small icon color="gray" v-on="on">
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title>举报</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
    </v-list-item>
  </v-list>
</template>

<script>
export default {};
</script>

<style>
</style>