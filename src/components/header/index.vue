<template>
  <div class="header">
    <div class="title-box">
      <img src="@/assets/img/baseLogo.png" alt="" />
      <span class="title" :style="titleStyle">{{ title }}</span>
    </div>
    <el-menu
      :default-active="activeMenuPath"
      class="el-menu-demo"
      mode="horizontal"
      v-if="isMenu"
      @select="handleSelect"
    >
      <template v-for="item in menuInfo">
        <el-submenu
          :key="item.menuPath"
          :index="item.menuPath"
          v-if="item.children && item.children.length"
        >
          <template slot="title">
            <i v-if="item.icon">
              <img :src="item.icon" alt="" />
            </i>
            <span :title="item.menuName">{{ item.menuName }}</span>
          </template>
          <template>
            <el-menu-item
              v-for="_item in item.children"
              :key="_item.menuPath"
              :index="_item.menuPath"
            >
              <template>
                <i v-if="_item.icon">
                  <img :src="_item.icon" alt="" />
                </i>
                <span :title="_item.menuName">{{ _item.menuName }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-else :key="item.menuPath" :index="item.menuPath">
          <template>
            <i v-if="item.icon">
              <img :src="item.icon" alt="" />
            </i>
            <span :title="item.menuName">{{ item.menuName }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
    <div class="user-box" v-if="hasUseInfo">
      <span class="name"></span>
      <span class="user">{{
        userInfo ? (userInfo.name ? userInfo.name : '请登录') : '请登录'
      }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: '权限设计',
      require: true
    },
    isMenu: {
      type: Boolean,
      default: true
    },
    hasUseInfo: {
      type: Boolean,
      default: true
    },
    titleStyle: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // activeMenuPath: ''
    }
  },
  computed: {
    ...mapGetters('menu', ['menuInfo']),
    ...mapGetters('user', ['userInfo']),
    activeMenuPath() {
      return this.$route.query.path === '/data_maintaince' ? '/data_maintaince' : '/main_page'
    }
  },

  methods: {
    handleSelect(key) {
      //key,keyPath
      if (key !== this.$route.path) {
        this.$router.push(key)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  position: relative;
  background: url(../../assets/img/bg1.png) no-repeat 0 0 / 100% 100%;
  .title-box {
    text-align: left;
    text-indent: 40px;
    width: 500px;
    height: 60px;
    line-height: 60px;
    float: left;
    img {
      transform: translateY(12px);
    }
    .title {
      font-size: 18px;
      font-family: FZXiQian-M15S;
      font-weight: bold;
      color: #448ac8;
    }
  }
  .el-menu {
    float: left;
    margin-left: 250px;
  }
  .user-box {
    width: 300px;
    height: 60px;
    line-height: 60px;
    float: right;
    .user {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      padding-left: 10px;
    }
    .name {
      width: 24px;
      height: 24px;
      display: inline-block;
      background-image: url(../../assets/img/login.png);
      background-position: 0px -68px;
      transform: translateY(7px);
    }
  }
}
</style>
