<template>
  <v-container fluid>
    <v-row v-show="loading">
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
                  @click="followYou(user.user)"
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
                  @click="noFollowYou(user.user)"
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
                  @click="followYou(user)"
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
                  @click="noFollowYou(user)"
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
      loading: true
    };
  },

  created() {
    if (!!localStorage.token) {
      this.$store.commit("getUser", this);
    }
  },
  mounted() {
    this.loadFansList();
  },

  methods: {
    loadFansList() {
      this.$http({
        method: "get",
        url: "/api/User/MyFans"
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
    followYou(user) {
      if (user.relation == 2) {
        // 你是我的粉丝，我再关注你就是互粉
        user.relation = 3;
      } else if (user.relation == 0) {
        user.relation = 1;
      }
    },
    noFollowYou(user) {
      if (user.relation == 3) {
        // 我和你互粉，我不再关注你，那么就是你单方面关注我
        user.relation = 2;
      } else if (user.relation == 1) {
        user.relation = 0;
      }
    }
  }
};
</script>