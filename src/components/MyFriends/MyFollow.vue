<template>
  <v-container fluid>
    <v-row v-show="showLoading">
      <v-col class="mx-auto pa-0" md="8">
        <div class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
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

            <v-list-item class="pl-4" v-for="user in group.users" :key="user.user.id">
              <v-list-item-avatar>
                <v-img :src="user.user.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="user.user.userName"></v-list-item-title>
                <v-list-item-subtitle v-html="user.user.desc"></v-list-item-subtitle>
              </v-list-item-content>
              <!-- start 关注，已关注，回粉，已互粉 -->
              <v-list-item-action>
                <v-btn
                  v-if="user.relation==0"
                  @click="follow(user.user.id, 1)"
                  small
                  tile
                  outlined
                  color="primary"
                  width="75px"
                  height="28px"
                >
                  <v-icon left>add</v-icon>关注
                </v-btn>
                <v-btn
                  v-else-if="user.relation==1"
                  @click="follow(user.user.id, 2)"
                  small
                  tile
                  outlined
                  color="gray"
                  width="75px"
                  height="28px"
                >
                  <v-icon left>add</v-icon>已关注
                </v-btn>
                <v-btn
                  v-else-if="user.relation==2"
                  @click="follow(user.user.id, 1)"
                  small
                  tile
                  outlined
                  color="primary"
                  width="75px"
                  height="28px"
                >
                  <v-icon left>add</v-icon>回粉
                </v-btn>
                <v-btn
                  v-else-if="user.relation==3"
                  @click="follow(user.user.id, 2)"
                  small
                  tile
                  outlined
                  color="gray"
                  width="75px"
                  height="28px"
                >
                  <v-icon left>add</v-icon>已互粉
                </v-btn>
              </v-list-item-action>
              <!-- end 关注，已关注，回粉，已互粉 -->
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">{{ tipMsg }}</v-snackbar>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      groups: [],
      snackbar: false,
      tipMsg: "",
      showLoading: true
    };
  },

  created() {
    if (!!localStorage.token) {
      this.$store.commit("getUser", this);
    }
  },
  mounted() {
    this.loadFollowList();
  },

  methods: {
    loadFollowList() {
      this.$http({
        method: "get",
        url: "/api/User/MyFollow"
      }).then(res => {
        if (res.data.code > 0) {
          this.groups = res.data.data.groups;
        } else {
          this.tipMsg = res.data.message;
          this.snackbar = true;
        }
        this.showLoading = false;
      });
    },
    // 关注
    follow(uid, act) {
      this.$http({
        method: "post",
        url: "/api/User/Follow",
        params: {
          uid: uid,
          act: act
        }
      }).then(res => {
        if (res.data.code > 0) {
          var group = this.groups[0];
          var index = 0;
          group.users.forEach(ele => {
            if (ele.user.id == uid) {
              this.groups[0].users[index].relation = res.data.data.relation;
            }
            index++;
          });
        } else {
          console.log("关注失败");
        }
      });
    }
  }
};
</script>