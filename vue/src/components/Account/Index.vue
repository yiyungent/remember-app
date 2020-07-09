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
                <span>{{title}}</span>
            </v-toolbar-title>
            <div class="flex-grow-1"></div>
            <span @click="rightTitleClick()" class="rem-info">{{rightTitle}}</span>
        </v-app-bar>
        <!-- end 应用栏 -->
        <v-main>
            <van-form class="rem-form">
                <slot name="form"></slot>
            </van-form>
            <div class="rem-explain">
                <slot name="explain"></slot>
            </div>
        </v-main>
        <slot name="footer"></slot>
    </v-app>
</template>

<script>
    import {mapGetters} from "vuex";
    import {Form} from "vant";
    import Vue from "vue";

    Vue.use(Form);

    export default {
        props: {
            title: {
                type: String,
                default: "密码登陆"
            },
            rightTitle: {
                type: String,
                default: "短信登陆"
            }
        },
        data() {
            return {};
        },
        computed: {
            ...mapGetters(["isLogin"]),
        },
        created() {
            this.isLoginRedirect();
        },
        methods: {
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
            },
            rightTitleClick() {
                this.$emit("rightTitleClick");
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
