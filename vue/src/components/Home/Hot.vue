<template>
  <card-list :items="items" :showLoading="showLoading"></card-list>
</template>
<script>
import CardList from "./CardList";
import apiHot from "@/api/Article/hot";

export default {
  components: {
    CardList
  },
  data() {
    return {
      items: [
        // {
        //   article: { id: 1, title: "热门1", picUrl: "" },
        //   favNum: 123
        // }
      ],
      showLoading: false //true
    };
  },
  created() {
    this.loadList();
  },
  mounted() {},
  methods: {
    loadList() {
      this.showLoading = true;
      apiHot(10).then(res => {
        if (res.code > 0) {
          this.items = res.data;
        }
        this.showLoading = false;
      });
    }
  }
};
</script>
<style scoped></style>
