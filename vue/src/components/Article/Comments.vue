<template>
  <div>
    <v-list class="pa-0">
      <v-subheader>最新评论</v-subheader>
      <v-list-item v-for="item in dataList" :key="item.id" class="pa-0">
        <v-col class="py-0">
          <v-row>
            <v-col class="py-0" cols="1">
              <v-avatar>
                <img :src="item.author.avatar" :alt="item.author.userName" />
              </v-avatar>
            </v-col>
            <v-col class="py-0" cols="4">
              <span>{{ item.author.userName }}</span>
            </v-col>
            <v-col class="py-0 ml-auto" cols="4">
              <span class="float-right">{{
                item.createTime | dateFormat("YYYY-MM-DD h:mm")
              }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0" cols="1"></v-col>
            <v-col class="py-0" xs="12">{{ item.content }}</v-col>
          </v-row>
          <v-row>
            <v-col class="py-0" cols="1"></v-col>
            <v-col class="py-0" xs="6">
              <span>
                <v-btn
                  @click="commentDo(item.id, 1)"
                  class="ma-2"
                  x-small
                  icon
                  color="gray"
                >
                  <v-icon>fa-thumbs-o-up</v-icon>
                  <span class="btn-icon-with-text">{{ item.likeNum }}</span>
                </v-btn>
                <v-btn
                  @click="commentDo(item.id, 2)"
                  class="ma-4"
                  x-small
                  icon
                  color="gray"
                >
                  <v-icon>fa-thumbs-o-down</v-icon>
                  <span class="btn-icon-with-text"></span>
                </v-btn>
              </span>
            </v-col>
            <v-col xs="6">
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="float-right"
                    x-small
                    icon
                    color="gray"
                    v-on="on"
                  >
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
    <div>
      <v-btn
        @click="showCommentArea = !showCommentArea"
        style="top:16px;"
        color="primary"
        dark
        small
        absolute
        top
        right
        fab
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-bottom-sheet v-model="showCommentArea">
      <v-textarea
        solo
        name="input-7-4"
        hide-details
        autofocus
        auto-grow
        counter="40"
        clearable
        label="发个评论见证当下"
        v-model="inputContent"
      ></v-textarea>
      <v-btn @click="sendComment" color="primary" block>发表评论</v-btn>
    </v-bottom-sheet>

    <!-- start 提示消息 -->
    <v-snackbar v-model="snackbar">{{ tipMsg }}</v-snackbar>
    <!-- end 提示消息 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      fab: false,
      showCommentArea: false,
      inputContent: "",
      snackbar: false,
      tipMsg: ""
    };
  },
  created() {
    this.loadComments();
  },
  methods: {
    sendComment() {
      var courseBoxId = this.$route.params.id;
      var content = this.inputContent;
      console.log(content, courseBoxId);

      this.$http({
        method: "post",
        url: "/api/Article/Comment",
        data: {
          courseBoxId: courseBoxId,
          content: content
        }
      }).then(res => {
        this.tipMsg = res.data.message;
        this.snackbar = true;
        if (res.data.code >= 1) {
          this.loadComments();
          // TODO: 改为这种方法事先保存当前登录用户信息，评论成功后，可返回评论ID，评论信息，用这些将其手动添加到dataList，而不需要重新加载
          // this.dataList.unshift({

          // });
          this.showCommentArea = false;
          this.inputContent = "";

          this.$emit("sendCommentSuccess");
        }
      });
    },
    commentDo(commentId, doType) {
      this.$http({
        method: "post",
        url: "/api/Article/CommentLike",
        data: {
          commentId: commentId,
          doType: doType
        }
      }).then(res => {
        this.tipMsg = res.data.message;
        this.snackbar = true;
        if (res.data.code >= 1) {
          this.dataList.forEach(ele => {
            if (ele.id == commentId) {
              if (doType == 1) {
                ele.likeNum = ele.likeNum + 1;
              }
            }
          });

          this.$emit("commentDoSuccess", { commentId, doType });
        }
      });
    },
    loadComments() {
      var courseBoxId = this.$route.params.id;

      this.$http({
        method: "get",
        url: "/api/Article/SimpleComments",
        params: {
          courseBoxId: courseBoxId
        }
      }).then(res => {
        if (res.data.code > 0) {
          this.dataList = res.data.data.comments;
        } else {
          this.tipMsg = res.data.message;
          this.snackbar = true;
        }
      });
    }
  }
};
</script>

<style scroped lang="less"></style>
