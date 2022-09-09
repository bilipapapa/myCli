<template>
  <div id="Index">
    <Header
      :title="title"
      :isMenu="false"
      :titleStyle="{
        fontSize: '18px',
        fontFamily: 'FZXiQian - M15S',
        fontWeight: '400',
        color: '#0CA49B',
        paddingLeft: '20px'
      }"
    ></Header>
    <main class="main">
      <Side-Menu></Side-Menu>
      <router-view class="content"/>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '@/components/header/index'
import SideMenu from '@/components/sideMenu/index'
export default {
  name: 'Index',
  components: {
    Header,
    SideMenu
  },
  data() {
    return {
      title: '首页'
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo'])
  },
  provide() {
    return {
      userInfo: this.userInfo
    }
  },
  mounted() {
    document.title = process.env.VUE_APP_TITLE
  },
  methods: {}
}
</script>
<style scoped lang="scss">
#Index {
  width: 100%;
  height: 100vh;
  background-color: #f1f4f6;
  .header {
    margin-bottom: 10px;
    background-color: #fff!important;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  .main {
    .side {
      width: 240px;
      float: left;
    }
    .content {
      width: calc(100% - 260px);
      height: calc(100vh - 80px);
      float: left;
      background: #fff;
      overflow: auto;
      margin: 0 10px;
    }
  }
}
</style>
