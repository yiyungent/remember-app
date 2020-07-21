<template>
  <div>
    <account-index title="邮箱注册" rightTitle="短信注册" @rightTitleClick="rightTitleClick">
      <template #form>
        <van-field v-model="email" label="邮箱" placeholder="请输入常用邮箱" clearable>
          <template #button>
            <span
              @click="getVCode"
              :class="enableGetVCode ? 'rem-accent' : 'rem-disabled'"
            >{{getVCodeTxt}}</span>
          </template>
        </van-field>
        <van-field v-model="vCode" label="验证码" placeholder="请输入验证码" clearable />
        <div class="rem-divider"></div>
        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" clearable />
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
          >登陆</v-btn>
          <v-btn
            :class="enableRegister ? 'rem-btn' : 'rem-btn rem-btn-disable'"
            depressed
            large
            color="secondary"
            :disabled="!enableRegister"
            @click="register"
          >同意并注册</v-btn>
        </div>
      </template>
      <template #explain>
        完成注册即代表你同意
        <a target="_blank" href="#">用户协议</a>和
        <a target="_blank" href="#">隐私政策</a>
      </template>
    </account-index>
    <vue-sim-captcha
      v-model="captcha.showCaptcha"
      :appId="captcha.appId"
      :callback="saveTicket"
      :source="captcha.source"
    ></vue-sim-captcha>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import types from "@/store/types";
import apiEmailVCode from "@/api/UserInfo/emailVCode.js";
import apiRegister from "@/api/UserInfo/registerByEmail.js";
import { Toast, Field, Popup } from "vant";
import Vue from "vue";
import AccountIndex from "@/components/Account/Index";
import VueSimCaptcha from "vue-sim-captcha";

Vue.use(Toast);
Vue.use(Field);
Vue.use(Popup);
Vue.use(VueSimCaptcha);

export default {
  components: {
    AccountIndex
  },
  data() {
    return {
      email: "",
      vCode: "",
      password: "",
      confirmPwd: "",
      getVCodeWait: 0, // 重新获取邮箱验证码
      getVCodeTimer: null,
      captcha: {
        appId: "132132",
        source: {
          reqVCodeImgUrl: "https://captcha.moeci.com/api/vCode/VCodeImg",
          reqVCodeCheckUrl: "https://captcha.moeci.com/api/vCode/VCodeCheck"
        },
        showCaptcha: false,
        ticket: "",
        userId: ""
      }
    };
  },
  computed: {
    enableRegister: function() {
      return (
        this.email.trim() !== "" &&
        this.vCode !== "" &&
        this.password !== "" &&
        this.confirmPwd !== ""
      );
    },
    enableEmail: function() {
      return this.email !== "";
    },
    enableGetVCode: function() {
      return this.enableEmail && this.getVCodeWait <= 0;
    },
    getVCodeTxt: function() {
      return this.getVCodeWait > 0
        ? this.getVCodeWait + "s后重试"
        : "获取验证码";
    }
  },
  methods: {
    register() {
      // TODO: 注册: 邮箱，邮箱验证码，密码
      // 效验密码与确认密码
      if (this.password !== this.confirmPwd) {
        Toast("两次密码输入不一致");
        return;
      }
      // 发送 邮箱，邮箱验证码，密码
      apiRegister(this.email, this.vCode, this.password).then(res => {
        if (res.code > 0) {
          Toast("注册成功, 即将前往登录");
          setTimeout(() => {
            this.$router.push({ name: "Login" });
          }, 1000);
        } else {
          Toast(res.message);
          if (res.code == -1) {
            // 邮箱验证码不正确
            this.vCode = "";
            this.password = "";
            this.confirmPwd = "";
          }
        }
      });
    },

    getVCode() {
      if (this.enableEmail) {
        // 弹出点触验证码层
        this.captcha.showCaptcha = true;
      }
    },

    rightTitleClick() {
      this.$router.replace({ name: "RegisterByPhone" });
    },

    saveTicket(res) {
      if (res.code === 0) {
        // 验证码服务端-验证通过
        console.log("第一次验证通过");
        // 第一次验证通过
        // 准备 业务后台 第二次验证
        this.captcha.ticket = res.ticket;
        this.captcha.userId = res.userId;
        console.log("第一次验证 结束");
        // 发送到业务后台-获取邮箱验证码
        apiEmailVCode(this.email, this.captcha.ticket, this.userId).then(
          res => {
            if (res.code > 0) {
            } else {
              Toast(res.message);
              this.captcha.ticket = "";
              this.captcha.userId = "";
            }
          }
        );
        // 60s后重试
        this.getVCodeWait = 60;
        this.getVCodeTimer = setInterval(() => {
          this.getVCodeWait -= 1;
          if (this.getVCodeWait <= 0) {
            clearInterval(this.getVCodeTimer);
          }
        }, 1000);
      }
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
