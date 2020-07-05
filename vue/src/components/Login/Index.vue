<template>
    <v-app id="rem-login-app">
        <!-- start 应用栏 -->
        <v-app-bar
                app
                color="primary"
        >
            <v-btn icon @click="back">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>
                <span>密码登录</span>
            </v-toolbar-title>
            <div class="flex-grow-1"></div>
            <span class="rem-info">短信登录</span>
        </v-app-bar>
        <!-- end 应用栏 -->
        <v-main>
            <van-form class="rem-form">
                <van-field
                        v-model="account"
                        label="账号"
                        placeholder="请输入用户名/邮箱/手机号"
                        clearable
                />
                <van-field
                        v-model="password"
                        type="password"
                        label="密码"
                        placeholder="请输入密码"
                        clearable
                >
                    <template #button>
                        <span class="rem-accent">忘记密码?</span>
                    </template>
                </van-field>
                <div class="rem-form-buttons">
                    <v-btn class="rem-btn" depressed large outlined color="secondary">注册</v-btn>
                    <v-btn
                            :class="enableLogin?'rem-btn':'rem-btn rem-btn-disable'"
                            depressed large color="secondary"
                            :disabled="!enableLogin"
                            @click="login">登陆
                    </v-btn>
                </div>
            </van-form>
            <div class="rem-explain">
                登录即代表你同意<a target="_blank" href="#">用户协议</a>和<a target="_blank" href="#">隐私政策</a>
            </div>
        </v-main>
    </v-app>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";
    import types from "@/store/types";
    import apiLogin from "@/api/UserInfo/login.js";
    import {Toast, Form, Field, Button} from "vant";
    import Vue from "vue";

    Vue.use(Toast);
    Vue.use(Form);
    Vue.use(Field);
    Vue.use(Button);

    export default {
        data() {
            return {
                account: "",
                password: "",
            };
        },
        computed: {
            ...mapGetters(["isLogin"]),
            enableLogin: function () {
                return this.account.trim() !== "" && this.password !== "";
            }
        },
        created() {
            this.isLoginRedirect();
        },
        methods: {
            ...mapActions([types.GET_USER]),
            login() {
                apiLogin(this.account, this.password).then(res => {
                    if (res.code > 0) {
                        // 登录成功
                        // 存入 localStorage
                        localStorage.token = res.data.token;
                        localStorage.token_expire = res.data.expire;
                        // 获取用户信息
                        this[types.GET_USER]();
                        // 跳转页面
                        if (this.$route.query.redirect) {
                            // TODO: 跳转到之前页
                            this.$router.push({path: this.$route.query.redirect});
                        } else {
                            this.$router.push({name: "Home"});
                        }
                    } else {
                        // 登录失败
                        Toast(res.message);
                    }
                });
            },
            isLoginRedirect() {
                if (this.isLogin) {
                    // 跳转页面
                    if (this.$route.query.redirect) {
                        // TODO: 跳转到之前页
                        // history模式
                        // window.location.href = this.$route.query.redirect;
                        // 以下失败
                        // window.location.href =
                        // window.location.origin + "/#" + this.$route.query.redirect;
                        // console.log(this.$route.query.redirect);
                        // this.$router.push({ path: this.$route.query.redirect });
                        this.$router.push({name: "Home"});
                    } else {
                        this.$router.push({name: "Home"});
                    }
                }
            },
            back() {
                if (sessionStorage.getItem("returnRoute")) {
                    var returnRoute = JSON.parse(sessionStorage.getItem("returnRoute"));
                    sessionStorage.removeItem("returnRoute");
                    this.$router.push(returnRoute);
                } else {
                    this.$router.push({name: "Home"});
                }
            }
        }
    };
</script>
<style lang="less" scoped>
    @import "~@/assets/css/colors.less";

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

</style>
