<template>
  <item-list :items="items" :showLoading="showLoading"></item-list>
</template>
<script>
import ItemList from "./ItemList";
import apiLast from "@/api/Article/last";

export default {
  components: {
    ItemList
  },
  data() {
    return {
      items: [
        // {
        //   article: { id: 1, title: "最新1", picUrl: "" },
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
      apiLast(10).then(res => {
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
