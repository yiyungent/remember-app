<template>
  <v-list>
    <v-list-item @click="goItem(item)" link class="pl-4" v-for="item in dataList" :key="item.id">
      <v-row>
        <v-col xs="4" class="pb-0">
          <v-img
            :src="item.picUrl"
            lazy-src="/static/images/loading-pic.jpg"
            width="160"
            height="100"
          ></v-img>
        </v-col>
        <v-col xs="4" class="pb-0">
          <v-list-item-content>
            <v-list-item-title>
              <span>{{item.name}}</span>
            </v-list-item-title>
            <v-list-item-subtitle class="pt-4">
              <v-row>
                <v-col class="py-0">
                  <v-icon></v-icon>
                  {{item.creator.userName}}
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pt-1">
                  <v-icon x-small>fa-star-o</v-icon>
                  {{item.stat.favNum}}
                </v-col>
              </v-row>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-col>
      </v-row>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      dataList: []
    };
  },
  props: ["list"],
  methods: {
    goItem(item) {
      this.$emit("goItem", item);
      // 保存当前路由信息，用于只有返回
      sessionStorage.setItem(
        "returnRoute",
        JSON.stringify({
          name: this.$route.name,
          params: this.$route.params,
          query: this.$route.query
        })
      );
      this.$router.push({ name: "Article", params: { id: item.id } });
    }
  },
  created() {
    this.dataList = this.list;
  },
  watch: {
    list(newVal) {
        this.dataList = newVal;
    }
  }
};
</script>

<style>
</style>