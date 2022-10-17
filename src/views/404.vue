<template>
  <div class="content">
    <span class="back-index" @click="toIndex">返回首页</span>
    <span class="back" @click="goBack">返回上一页</span>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  methods: {
    toIndex() {
      this.$router.push('/')
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 100vh;
  background-image: url('~@/assets/img/404.png');
  background-size: 100% 100%;
  .back-index,
  .back {
    position: relative;
    top: 35%;
    cursor: pointer;
  }
  .back {
    margin-left: 3.5rem;
  }
}
</style>
