<template>
  <v-app id="inspire">
    <!-- start 左侧导航抽屉 -->
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <!-- start 顶部头像区 -->
      <template v-slot:prepend>
        <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
          <v-list>
            <v-list-item class="d-flex justify-space-between">
              <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
              </v-list-item-avatar>
              <v-list-item-icon>
                <v-btn x-small outlined fab color="white">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item link two-line>
              <v-list-item-content>
                <v-list-item-title class="title">admin</v-list-item-title>
                <v-list-item-subtitle>硬币：267</v-list-item-subtitle>
              </v-list-item-content>
              <!-- <v-list-item-action>
                <v-icon>mdi-menu-down</v-icon>
              </v-list-item-action>-->
            </v-list-item>
          </v-list>
        </v-img>
      </template>
      <!-- start 顶部头像区 -->
      <v-divider></v-divider>
      <!-- start 我的动态，关注，粉丝 -->

      <!-- end 我的动态，关注，粉丝 -->
      <v-divider></v-divider>
      <!-- start 一般导航区 -->
      <v-list nav dense>
        <v-list-item-group v-model="item" color="blue">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <!-- end 一般导航区 -->
    </v-navigation-drawer>
    <!-- end 左侧导航抽屉 -->
    <!-- start 应用栏 -->
    <v-app-bar
      hide-on-scroll
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify"></v-img>
        </v-avatar>
      </v-btn>
      <v-toolbar-title>
        <span class="hidden-sm-and-down">remember</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-badge overlap left>
          <template v-slot:badge>0</template>
          <v-icon>mdi-email</v-icon>
        </v-badge>
      </v-btn>
      <!-- start 选项卡 -->
      <template v-slot:extension>
        <v-tabs background-color="transparent" center-active>
          <v-tab>Tab 1</v-tab>
          <v-tab>Tab 2</v-tab>
          <v-tab>Tab 3</v-tab>
          <v-tab>Tab 4</v-tab>
          <v-tab>Tab 5</v-tab>
          <v-tab>Tab 6</v-tab>
          <v-tab>Tab 7</v-tab>
          <v-tab>Tab 8</v-tab>
          <v-tab>Tab 9</v-tab>
          <v-tab>Tab 10</v-tab>
          <v-tab>Tab 11</v-tab>
          <v-tab>Tab 12</v-tab>
        </v-tabs>
      </template>
      <!-- end 选项卡 -->
    </v-app-bar>
    <!-- end 应用栏 -->
    <!-- start 主体内容区 -->
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, quibusdam dolore vero animi placeat veritatis voluptates ipsum, explicabo nisi dolor nulla velit, ipsam perferendis. Fugiat, nobis, possimus neque voluptates consectetur, saepe esse deserunt soluta laboriosam vero quisquam optio reprehenderit tenetur ipsum porro dolor voluptas expedita placeat quos nemo harum quibusdam corrupti. Iusto est reiciendis quisquam sunt quia. Corrupti placeat, nobis tempore odit id tempora, nihil quis aliquid et optio sit vel libero nulla unde quidem magnam, nesciunt doloribus! Doloribus aliquid, dolorem voluptates, aut, quaerat dolores ad reiciendis magni saepe iusto expedita similique! Error laboriosam obcaecati accusamus veritatis iure harum a, itaque alias corporis maiores aliquam quaerat reprehenderit beatae iusto incidunt amet inventore placeat dolores modi porro? Impedit doloremque consequuntur ipsam voluptatem! Nisi maiores nesciunt aliquid excepturi vitae, quidem cumque assumenda sapiente repellendus nulla asperiores dolores voluptas mollitia facere velit officia tempora nobis, esse error fugiat! Quas molestiae accusantium sunt, labore praesentium voluptatibus sapiente adipisci ullam laborum, laboriosam nobis omnis repellendus dignissimos totam blanditiis! Itaque expedita ipsam veniam id voluptatem excepturi quidem nihil amet reprehenderit aliquam. Blanditiis perspiciatis eum corrupti id, unde libero veritatis cum molestiae, placeat, consequatur qui! Placeat optio quas excepturi facere ratione architecto nisi, perferendis nemo natus pariatur atque reprehenderit modi accusantium. Atque dolorum perferendis adipisci ea tenetur? Laboriosam alias aut animi culpa! Nesciunt, eveniet id. Labore necessitatibus enim repellendus nostrum maxime nisi ipsa distinctio voluptates sed cum? Accusantium incidunt, doloribus natus ea vitae architecto deleniti. Quibusdam, quod. Facere numquam vel possimus quas accusantium distinctio pariatur ad consequuntur impedit expedita veniam atque ex labore veritatis, eaque, deleniti fuga quae sapiente aspernatur dolor alias vero! Itaque blanditiis tempore quo voluptate voluptas deserunt, doloremque autem odio iusto ex optio esse voluptatem facere exercitationem eaque, corrupti officia atque odit culpa adipisci nobis illo in possimus eligendi. Minus voluptatem sequi perspiciatis animi odit excepturi fugiat saepe repellendus natus, nulla veritatis illum exercitationem laboriosam consectetur a. Deleniti culpa ratione provident nam corporis sequi voluptate, ad, quod veniam debitis laborum dolorem odio veritatis. Iure laboriosam voluptates autem optio voluptatum illum quam dolorem impedit, debitis maiores laborum unde deserunt cupiditate eligendi molestiae. Sunt inventore fugit ab, dolorum quaerat ducimus consectetur consequuntur veritatis, sed deserunt cupiditate distinctio exercitationem aut saepe possimus vel sapiente voluptate tempore molestiae! Tempore, odio distinctio! Dignissimos atque exercitationem id accusamus fugit, ipsam adipisci similique rerum placeat, sint voluptatem cupiditate. Impedit necessitatibus minima repellat, odit voluptates amet molestias laboriosam tempore voluptate labore vitae? Mollitia dignissimos ex aliquam asperiores fugiat perspiciatis laboriosam exercitationem esse vitae, error rerum suscipit voluptatem explicabo, illum culpa nulla tenetur nisi consectetur vel sit ratione minus blanditiis. Repudiandae iste eligendi qui dolore saepe aliquid ad quam. Sed commodi necessitatibus nisi esse quae animi fuga? Nisi quos cumque tenetur temporibus sunt officia quisquam. Dolore voluptatem fuga voluptate neque ab aperiam tempore amet ipsum eligendi possimus assumenda officiis dolor minus debitis facilis ipsam porro voluptas repellendus nam at, unde eaque deleniti quasi a! Quam perspiciatis quaerat aspernatur, tempore dignissimos eos perferendis quod facere sequi aperiam magnam, voluptatibus quidem minus consequatur necessitatibus velit.</p>
        </v-row>
      </v-container>
    </v-content>
    <!-- end 主体内容区 -->
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data() {
    return {
      drawer: null,
      item: 0,
      items: [
        { text: "首页", icon: "mdi-folder" },
        { text: "历史记录", icon: "mdi-history" },
        { text: "我的收藏", icon: "mdi-star" },
        { text: "投稿", icon: "mdi-upload" },
        { text: "Recent", icon: "mdi-history" },
        { text: "Offline", icon: "mdi-check-circle" },
        { text: "Backups", icon: "mdi-cloud-upload" }
      ],
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"]
    };
  }
};
</script>
<style lang="less" scoped>
.lightbox {
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 72px
  );
}
</style>