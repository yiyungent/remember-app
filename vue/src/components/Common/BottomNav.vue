<template>
    <v-bottom-navigation
            grow
            fixed
            color="secondary"
            light
            v-model="activeBtnModel"
    >
        <v-btn :to="{ name: 'Home_Index' }">
            <span>首页</span>
            <v-icon>fa-home</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'Home_Channel' }">
            <span>频道</span>
            <v-icon>fa-cubes</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'Home_Dynamic' }">
            <span>动态</span>
            <v-icon>fa-comments-o</v-icon>
        </v-btn>
        <v-btn>
            <span>会员购</span>
            <v-icon>fa-shopping-bag</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
    export default {
        props: {
            value: Number
        },
        data() {
            return {
                activeBtnModel: this.value
            };
        },
        watch: {
            activeBtnModel() {
                this.$emit("input", this.activeBtnModel);
            },
            value() {
                this.activeBtnModel = this.value;
            }
        }
    };
</script>

<style lang="less" scoped>
    /* fixed:生产环境与开发环境首页底部导航不一致(异常) #8 */
    /* https://github.com/yiyungent/remember-app/issues/8 */
    /* 原因分析: vue打包之前之后css优先级不同 */
    .v-item-group.v-bottom-navigation .v-btn {
        height: inherit;
    }
</style>
