<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :md="24">
            <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1">主站</el-menu-item>
              <el-submenu index="2" class="menu-right">
                <template slot="title">admin</template>
                <el-menu-item index="2-1">个人中心</el-menu-item>
                <el-menu-item index="2-2">退出</el-menu-item>
              </el-submenu>
              <el-menu-item index="3" class="menu-right">历史</el-menu-item>
              <el-menu-item index="4" class="menu-right">收藏</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-main scroll-container>
        <!-- 主体导航栏 -->
        <el-row>
          <el-col :md="2">
            <el-button type="text" size="small">
              <i class="el-icon-s-home"></i> 首页
            </el-button>
          </el-col>
          <el-col :md="2">
            <el-badge :value="12">
              <el-button type="text" size="small">评论</el-button>
            </el-badge>
          </el-col>
        </el-row>
        <!-- 主体导航栏 -->
        <!-- start 幻灯片栏 -->
        <el-row type="flex" justify="space-between" style="padding-bottom: 10px;">
          <!-- start 幻灯片 -->
          <el-col :sm="10">
            <el-carousel height="220px" style="width: 440px;">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <!-- end 幻灯片 -->
          <!-- start 幻灯片右侧热门课程 -->
          <el-col :sm="10">
            <el-row :gutter="1">
              <el-col :sm="6">
                <router-link to>
                  <el-image
                    class="pic-image"
                    src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"
                  ></el-image>
                </router-link>
              </el-col>
              <el-col :sm="6">
                <router-link to>
                  <el-image
                    class="pic-image"
                    src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"
                  ></el-image>
                </router-link>
              </el-col>
              <el-col :sm="6">
                <router-link to>
                  <el-image
                    class="pic-image"
                    src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"
                  ></el-image>
                </router-link>
              </el-col>
              <el-col :sm="6">
                <router-link to>
                  <el-image
                    class="pic-image"
                    src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"
                  ></el-image>
                </router-link>
              </el-col>
              <el-col :sm="6">
                <router-link to>
                  <el-image
                    class="pic-image"
                    src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"
                  ></el-image>
                </router-link>
              </el-col>
              <el-col :sm="6">
                <router-link to>
                  <el-image
                    class="pic-image"
                    src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"
                  ></el-image>
                </router-link>
              </el-col>
            </el-row>
          </el-col>
          <!-- end 幻灯片右侧热门课程 -->
        </el-row>
        <!-- end 幻灯片栏 -->
        <!-- start 课程分类1 -->
        <el-row>
          <el-tag type="success">软件工程</el-tag>
          <el-divider></el-divider>
          <el-col :sm="4" v-for="item in hotCourseBox" :key="item.id">
            <el-image class="pic-image" :src="item.picUrl" lazy></el-image>
          </el-col>
        </el-row>
        <!-- end 课程分类1 -->
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HomeIndex",
  components: {},
  data() {
    return {
      activeIndex: "1",
      hotCourseBox: [
        {
          id: 1,
          picUrl:
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg"
        },
        {
          id: 2,
          picUrl:
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"
        },
        {
          id: 3,
          picUrl:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg"
        },
        {
          id: 4,
          picUrl:
            "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg"
        },
        {
          id: 5,
          picUrl:
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg"
        },
        {
          id: 6,
          picUrl:
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg"
        },
        {
          id: 7,
          picUrl:
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg"
        },
        {
          id: 8,
          picUrl:
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg"
        },
        {
          id: 9,
          picUrl:
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg"
        },
        {
          id: 10,
          picUrl:
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg"
        },
        {
          id: 11,
          picUrl:
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg"
        }
      ]
    };
  },
  computed: {},
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.menu-right {
  float: right;
}
.right-hot-course-second-row .pic-image {
  padding-top: 16px;
}
/* start 幻灯片 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/* end 幻灯片 */
.pic-image {
  width: 160px;
  height: 100px;
}
.hot-course {
  padding-top: 20px;
}
.el-divider--horizontal {
  margin-top: 5px;
  margin-bottom: 10px;
}
</style>