<template>
  <v-container fluid>
    <v-row v-show="loading">
      <v-col class="mx-auto pa-0" md="8">
        <div class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mx-auto pa-0" md="8">
        <v-list>
          <v-list-group
            v-for="group in groups"
            :key="group.id"
            v-model="group.isFolder"
            prepend-icon="star"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="group.groupName"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              @click="goFav(fav.id)"
              link
              class="pl-4"
              v-for="fav in group.favList"
              :key="fav.id"
            >
              <v-row>
                <v-col xs="4">
                  <v-img
                    :src="fav.picUrl"
                    :lazy-src="fav.picUrl"
                    width="190"
                    height="120"
                  ></v-img>
                </v-col>
                <v-col xs="4">
                  <v-list-item-content>
                    <v-list-item-title
                      style="height:68px;"
                      v-text="fav.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="
                        fav.count + '个内容 · ' + (fav.isOpen ? '公开' : '私密')
                      "
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-col>
    </v-row>
    <!-- start 提示消息 -->
    <v-snackbar v-model="snackbar">{{ tipMsg }}</v-snackbar>
    <!-- end 提示消息 -->
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      groups: [
        {
          id: 0,
          isFolder: true,
          groupName: "我的创建",
          favList: [
            {
              id: 0,
              name: "默认收藏夹",
              count: 0,
              isOpen: true,
              picUrl: "https://picsum.photos/id/11/500/300"
            }
          ]
        }
      ],
      snackbar: false,
      tipMsg: "",
      loading: true
    };
  },

  created() {
    if (localStorage.token) {
      this.$store.commit("getUser", this);
    }
  },

  mounted() {
    this.loadFavList();
  },

  methods: {
    loadFavList() {
      this.$http({
        method: "get",
        url: "/api/Favorite/MyFavList"
      }).then(res => {
        if (res.data.code > 0) {
          this.groups = res.data.data.groups;
        } else {
          this.tipMsg = res.data.message;
          this.snackbar = true;
        }
        this.loading = false;
      });
    },
    goFav(id) {
      this.$router.push({ name: "Favorite", params: { id: id } });
    }
  }
};
</script>
