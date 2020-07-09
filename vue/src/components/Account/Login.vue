<template>
    <account-index @rightTitleClick="rightTitleClick">
        <template #form>
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
                <v-btn :to="{name:'Register'}" class="rem-btn" depressed large outlined color="secondary">注册</v-btn>
                <v-btn
                        :class="enableLogin?'rem-btn':'rem-btn rem-btn-disable'"
                        depressed large color="secondary"
                        :disabled="!enableLogin"
                        @click="login">登陆
                </v-btn>
            </div>
        </template>
        <template #explain>
            登录即代表你同意<a target="_blank" href="#">用户协议</a>和<a target="_blank" href="#">隐私政策</a>
        </template>
    </account-index>
</template>

<script>
    import {mapActions} from "vuex";
    import types from "@/store/types";
    import apiLogin from "@/api/UserInfo/login.js";
    import {Toast, Field} from "vant";
    import Vue from "vue";
    import AccountIndex from "@/components/Account/Index";

    Vue.use(Toast);
    Vue.use(Field);

    export default {
        components: {
            AccountIndex
        },
        data() {
            return {
                account: "",
                password: "",
            };
        },
        computed: {
            enableLogin: function () {
                return this.account.trim() !== "" && this.password !== "";
            }
        },
        created() {
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
            rightTitleClick() {
                this.$router.replace({name: "LoginByPhone"});
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
