<template>
  <account-index
    title="邮箱注册"
    rightTitle="短信注册"
    @rightTitleClick="rightTitleClick"
  >
    <template #form>
      <van-field
        v-model="email"
        label="邮箱"
        placeholder="请输入常用邮箱"
        clearable
      >
        <template #button>
          <span
            @click="getVCode"
            :class="enableEmail ? 'rem-accent' : 'rem-disabled'"
            >获取验证码</span
          >
        </template>
      </van-field>
      <van-field
        v-model="vcode"
        label="验证码"
        placeholder="请输入验证码"
        clearable
      />
      <div class="rem-divider"></div>
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        clearable
      />
      <van-field
        v-model="confirmPwd"
        type="password"
        label="确认密码"
        placeholder="请再次输入密码"
        clearable
      />
      <div class="rem-form-buttons">
        <v-btn
          :to="{ name: 'Login' }"
          class="rem-btn"
          depressed
          large
          outlined
          color="secondary"
          >登陆</v-btn
        >
        <v-btn
          :class="enableRegister ? 'rem-btn' : 'rem-btn rem-btn-disable'"
          depressed
          large
          color="secondary"
          :disabled="!enableRegister"
          @click="register"
          >同意并注册
        </v-btn>
      </div>
    </template>
    <template #explain>
      完成注册即代表你同意<a target="_blank" href="#">用户协议</a>和<a
        target="_blank"
        href="#"
        >隐私政策</a
      >
    </template>
    <template #footer>
      <van-popup
        v-model="showLayer"
        closeable
        close-icon="close"
        close-icon-position="bottom-left"
        class="simCaptcha"
        >点触验证码层
      </van-popup>
    </template>
  </account-index>
</template>

<script>
import { mapActions } from "vuex";
import types from "@/store/types";
// import apiRegister from "@/api/UserInfo/register.js";
import { Toast, Field, Popup } from "vant";
import Vue from "vue";
import AccountIndex from "@/components/Account/Index";

Vue.use(Toast);
Vue.use(Field);
Vue.use(Popup);

export default {
  components: {
    AccountIndex
  },
  data() {
    return {
      email: "",
      vcode: "",
      password: "",
      confirmPwd: "",
      showLayer: false
    };
  },
  computed: {
    enableRegister: function() {
      return (
        this.email.trim() !== "" &&
        this.vcode !== "" &&
        this.password !== "" &&
        this.confirmPwd !== ""
      );
    },
    enableEmail: function() {
      return this.email !== "";
    }
  },
  methods: {
    register() {},
    getVCode() {
      if (this.enableEmail) {
        // 弹出点触验证码层
        this.showVerifyCodeLayer();
      }
    },
    rightTitleClick() {
      this.$router.replace({ name: "RegisterByPhone" });
    },
    showVerifyCodeLayer() {
      this.showLayer = true;
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/colors.less";
@import "~@/assets/css/simCaptcha.css";

#rem-login-app {
  background-color: #f4f4f4;

  .rem-form {
    padding-top: 34px;

    .rem-form-buttons {
      padding-top: 16px;
      display: flex;
      justify-content: space-around;

      .rem-btn {
        width: 174px;
      }

      .rem-btn-disable {
        background-color: tint(@color-secondary, 50%) !important;
        color: #fff !important;
      }
    }
  }

  .rem-explain {
    color: #757575;
    font-size: 12px;
    text-align: center;
    padding-top: 28px;

    a {
      color: @color-accent;
    }
  }
}

.rem-divider {
  height: 16px;
}
</style>
