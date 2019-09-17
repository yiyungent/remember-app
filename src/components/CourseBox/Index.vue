<template>
  <v-app id="inspire">
    <!-- start 应用栏 -->
    <v-app-bar
      hide-on-scroll
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <v-btn icon>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>
        <span class="hidden-sm-and-down">remember</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- end 应用栏 -->
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col class="mx-auto py-0" md="8">
            <d-player :options="playerOptions" ref="player"></d-player>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mx-auto pt-0" md="8" >
            <v-tabs>
              <v-tab>简介</v-tab>
              <v-tab style="vertical-align:bottom;">
                <span>评论</span>
                <span style="font-size:10px;">2万</span>
              </v-tab>
              <div class="flex-grow-1"></div>
              <v-btn-toggle rounded fixed>
                <v-expand-x-transition>
                  <v-btn
                    v-show="enableDm"
                    @click="isSendDm=!isSendDm"
                  >{{ isSendDm?'弹幕输入中':'点我发弹幕' }}</v-btn>
                </v-expand-x-transition>
                <v-btn @click="enableDm=!enableDm">
                  <v-icon>{{enableDm?'personal_video':'tv_off'}}</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-tabs>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mx-auto" md="8">
            <div>【hanser】直播小剧场</div>
            <span class="grey--text subtitle-1">1,000 miles of wonder</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mx-auto" md="8">
            <v-divider class="mx-4"></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mx-auto" md="8">
            <!-- start 选集 -->
            <div>选集</div>
            <!-- end 选集 -->
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mx-auto" md="8">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore provident iste tempore aliquam doloribus, inventore dignissimos similique minus ipsa unde voluptatem obcaecati voluptatibus nisi sapiente amet temporibus dolor nobis. Error sint sapiente maiores impedit? Accusamus rerum animi ducimus adipisci autem explicabo quidem iure cumque facilis ullam provident impedit voluptatem similique, tempore illum atque illo aspernatur. Maiores in eos doloremque enim molestiae, hic nam mollitia voluptates minus rerum dicta, velit quod repellat animi sint inventore temporibus quasi, quos saepe commodi praesentium. Asperiores tempora repudiandae rerum provident nesciunt quisquam, repellendus accusamus dicta odio, eos eveniet ipsam? Libero sit sunt cum vitae beatae possimus nihil! Exercitationem in et iusto nihil necessitatibus sit dolores expedita! Sunt, quia voluptatibus est magnam animi expedita exercitationem, ut quod labore recusandae neque fuga alias rerum debitis accusamus nobis? Laborum at soluta qui omnis dicta molestias expedita fugiat totam accusamus quis ipsum explicabo sunt voluptas aspernatur, ullam quia modi! Eligendi voluptatibus blanditiis dignissimos quibusdam. Quaerat incidunt temporibus tenetur nemo iste ab velit, molestiae animi iusto provident facere impedit quibusdam nihil magni, ipsum aliquid aperiam ratione est optio magnam dolor ut labore blanditiis a! Excepturi nesciunt at ipsum ipsa sint veritatis inventore odio consectetur. Nobis odit perferendis, iusto autem expedita nihil doloribus, tenetur repudiandae, dolorum dolores voluptatem. Ducimus repudiandae tempora, harum impedit illo eos nihil odio quidem eaque ratione rerum molestiae voluptas blanditiis necessitatibus tempore. Modi id sequi illo minima ea rem accusamus esse numquam velit vel, rerum error at? Suscipit, doloribus nesciunt. Cum suscipit sequi amet. Doloribus, provident dolorem! Autem esse quis nesciunt temporibus optio iste impedit voluptates provident natus adipisci totam blanditiis quos accusamus architecto omnis voluptatum quaerat fugiat, debitis voluptatibus ullam rerum repudiandae. Dicta illo architecto quasi. Atque accusantium neque quas officia, nobis repellendus cumque harum deleniti, excepturi a repellat illo voluptate suscipit voluptas quia, debitis saepe repudiandae. Aperiam, quam adipisci necessitatibus voluptas sequi optio non quas nihil perspiciatis perferendis ad! Velit quam natus minima quae deserunt suscipit unde error pariatur mollitia, labore molestiae sequi dolorem animi commodi debitis quia placeat ullam aliquam! Vero, perferendis. Qui, nemo non! Saepe provident vero similique fuga voluptatem. Sed, atque vel! Corrupti nisi possimus laboriosam nobis, rem consequuntur saepe, eligendi facilis accusantium placeat sint similique asperiores, exercitationem ipsam ad nesciunt. Deserunt, laudantium amet similique cumque tempore facere dignissimos quae perspiciatis? Fugit itaque temporibus iste commodi aspernatur! Atque cupiditate corrupti maxime rem voluptas, dicta magni dolorem impedit rerum nisi repudiandae eius commodi totam ipsam velit ipsa? Incidunt perspiciatis quos inventore quam! Consequuntur in alias ipsa, sed tempore quos ut sint est nesciunt libero officiis aut expedita reiciendis maxime rem ducimus voluptate beatae vitae atque quis rerum nam repudiandae ipsam velit! Laborum distinctio illo ad sunt. Adipisci iste iure molestiae assumenda quia suscipit incidunt totam et repellat doloribus molestias eligendi esse voluptates corporis, itaque officia ducimus! Quaerat quidem delectus consequuntur similique, id, consequatur omnis voluptate accusamus nobis ullam totam eum et quos maiores aliquid non rem animi qui sunt corporis atque nihil hic. Ipsa aperiam dolores fuga molestias ipsam, fugiat eum modi magnam.</p>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-bottom-sheet v-model="isSendDm">
      <v-sheet height="48" color="white">
        <v-row>
          <v-col cols="10" style="padding-top:0;padding-right:0;">
            <v-text-field
              v-model="dmText"
              autofocus
              solo
              shaped
              height="48px"
              label="发个友善的弹幕见证当下"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <div>
              <v-btn small color="pink" text icon>
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-bottom-sheet>
  </v-app>
</template>
<script>
import VueDPlayer from "vue-dplayer";
import "vue-dplayer/dist/vue-dplayer.css";

export default {
  name: "CourseBox",
  data() {
    return {
      // 是否处于发送弹幕中
      isSendDm: false,
      // 弹幕文本
      dmText: "",
      enableDm: true,
      // 视频播放器选项
      playerOptions: {
        video: {
          url: "http://static.smartisanos.cn/common/video/t1-ui.mp4",
          pic:
            "http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg"
        },
        autoplay: false,
        // danmaku: {
        //   // ...
        //   addition: ["https://api.prprpr.me/dplayer/v3/bilibili?aid=[aid]"]
        // },
        contextmenu: [
          {
            text: "GitHub",
            link: "https://github.com/MoePlayer/vue-dplayer"
          }
        ]
      },
      player: null
    };
  },
  components: {
    "d-player": VueDPlayer
  },
  mounted() {
    this.player = this.$refs.player.dp;
  },
  methods: {
    sendDm() {
      console.log(this.dmText);
    }
  },
  watch: {
    isSendDm(newVal) {
      if (newVal) {
        this.player.pause();
      }
    },
    enableDm(newVal) {
      if (newVal) {
        this.player.danmaku.show();
      } else {
        this.player.danmaku.hide();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  padding: 0;
}
</style>