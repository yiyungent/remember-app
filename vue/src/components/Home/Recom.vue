<template>
  <card-list :items="items" :showLoading="showLoading"></card-list>
</template>
<script>
import CardList from "./CardList";
import apiRecom from "@/api/Article/recom";

export default {
  components: {
    CardList
  },
  data() {
    return {
      items: [
        // {
        //   article: { id: 1, title: "推荐1", picUrl: "" },
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
      apiRecom(10).then(res => {
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
