<template>
  <v-app id="inspire">
    <!-- start 应用栏 -->
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <v-btn icon @click="back">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>
        <span>创建</span>
      </v-toolbar-title>
      <v-toolbar-title>
        <span></span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon @click="submit"> <v-icon>save</v-icon>保存 </v-btn>
    </v-app-bar>
    <!-- end 应用栏 -->
    <!-- start 主体内容区 -->
    <v-content>
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
        <!-- start 收藏夹介绍 -->
        <v-row>
          <v-col class="mx-auto pl-4" md="8">
            <form>
              <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                :counter="10"
                label="收藏夹名"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
              <v-textarea
                v-model="desc"
                :error-messages="descErrors"
                :counter="40"
                label="收藏夹描述"
                @input="$v.desc.$touch()"
                @blur="$v.desc.$touch()"
              ></v-textarea>
              <v-checkbox
                v-model="isOpen"
                label="公开"
                color="primary"
                @change="$v.isOpen.$touch()"
                @blur="$v.isOpen.$touch()"
              ></v-checkbox>
            </form>
          </v-col>
        </v-row>
        <!-- end 收藏夹介绍 -->
      </v-container>
    </v-content>
    <!-- end 主体内容区 -->
    <!-- start 提示消息 -->
    <v-snackbar v-model="snackbar">{{ tipMsg }}</v-snackbar>
    <!-- end 提示消息 -->
  </v-app>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    desc: { maxLength: maxLength(40) },
    isOpen: {
      checked(val) {
        return val;
      }
    }
  },

  data() {
    return {
      loading: false,
      // start 提示消息
      snackbar: false,
      tipMsg: "",
      // end 提示消息
      // start 表单
      name: "",
      desc: "",
      isOpen: false
    };
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength && errors.push("收藏夹名最多10个字符");
      !this.$v.name.required && errors.push("收藏夹名不可少");
      return errors;
    },
    descErrors() {
      const errors = [];
      if (!this.$v.desc.$dirty) return errors;
      !this.$v.desc.maxLength && errors.push("收藏夹描述最多40个字符");
      return errors;
    }
  },

  created() {
    if (localStorage.token) {
      this.$store.commit("getUser", this);
    }
  },

  mounted() {},

  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // 验证通过
        this.$http({
          method: "post",
          url: "/api/Favorite/Create",
          data: {
            name: this.name,
            desc: this.desc,
            isOpen: this.isOpen
          }
        }).then(res => {
          if (res.data.code >= 1) {
            this.back();
          } else {
            this.tipMsg = res.data.message;
            this.snackbar = true;
          }
        });
      }
    },

    back() {
      if (sessionStorage.getItem("returnRoute")) {
        var returnRoute = JSON.parse(sessionStorage.getItem("returnRoute"));
        sessionStorage.removeItem("returnRoute");
        this.$router.push(returnRoute);
      } else {
        this.$router.push({ name: "MyFav" });
      }
    }
  }
};
</script>
