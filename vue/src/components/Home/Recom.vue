<template>
  <item-list :items="items" :showLoading="showLoading"></item-list>
</template>
<script>
import ItemList from "./ItemList";

export default {
  components: {
    ItemList
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
      this.$http({
        method: "get",
        url: "/api/article/recom",
        params: {
          number: 10
        }
      }).then(res => {
        if (res.data.code > 0) {
          this.items = res.data.data;
        }
        this.showLoading = false;
      });
    }
  }
};
</script>
<style scoped></style>
