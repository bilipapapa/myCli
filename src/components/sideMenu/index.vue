<template>
  <div class="side">
    <div class="menu-head">
      <i class="el-icon el-icon-menu"></i>
      <span>{{sideMenuTitle}}</span></span>
      <!-- <i class="add-btn el-icon el-icon-plus"></i> -->
    </div>
    <el-menu
      class="custom-side-menu"
      :default-active="activeMenuPath"
      @select="handleSelect"
      :collapse-transition="true"
    >
      <template v-for="item in menuInfo">
        <el-submenu
          :index="item.menuPath"
          :key="item.menuPath"
          popper-class="custom-side-popper-menu"
          v-if="item.children && item.children.length > 0"
        >
          <template slot="title">
            <i class="menu-logo">
              <img :src="item.icon" :alt="item.menuName" />
            </i>
            <span :title="item.menuName">{{ item.menuName }}</span>
          </template>
          <el-menu-item
            v-for="child_item in item.children"
            :index="child_item.menuPath"
            :key="child_item.menuPath"
            :title="child_item.menuName"
          >
            <i class="menu-logo">
              <!-- <img :src="child_item.icon | fileSrc" :alt="child_item.menuName" /> -->
              <!-- <span alt=""></span> -->
            </i>
            <span :title="item.menuName">{{ child_item.menuName }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="item.menuPath" :key="item.menuPath" v-else>
          <i class="menu-logo">
            <!--            <img :src="item.icon | fileSrc" :alt="item.menuName" />-->
            <img alt="" :src="item.icon" class="dot" />
          </i>
          <span :title="item.menuName">{{ item.menuName }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'side',
  data() {
    return {
      now: '/index',
      defaultCollapsePages: [],
      sideMenuTitle: '多源数据维护'
    }
  },
  computed: {
    ...mapGetters('menu', ['menuInfo']),
    activeMenuPath() {
      return this.$route.path
    }
  },
  methods: {
    handleSelect(key) {
      //key,keyPath
      if (key !== this.$route.path) {
        this.$router.push(key)
      }
    },
    determineRoute() {
      this.now = this.$route.path
      if (this.defaultCollapsePages.indexOf(this.now) > -1) this.collapse = true
    }
  },
  mounted() {
    this.determineRoute()
  }
}
</script>

<style lang="scss" scoped>
.side {
  height: calc(100vh - 80px);
  background: #fff;
  .menu-head {
    position: relative;
    height: 60px;
    line-height: 60px;
    color: #fff;
    background: #0ca49b;
    span {
      margin: 10px;
      font-weight: bold;
    }
    .add-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20px;
    }
  }
  .el-menu {
    height: calc(100% - 60px);
    overflow: auto;
    border-right: unset;
    .el-menu-item {
      padding: 0 20px !important;
      text-align: left;
      margin: auto;
      // font-weight: bold;
      font-size: 15px;
      &.is-active::before {
        content: '';
        position: absolute;
        width: 4px;
        height: 16px;
        left: 8px;
        top: 20px;
        background: #0ca49b;
      }
      &::after {
        content: '';
        position: absolute;
        left: 20px;
        bottom: 0;
        width: 80%;
        height: 1px;
        background: #e6e6e6;
      }
    }
  }
}
</style>
