<template>
  <div class="pagination">
    <el-button size="mini" class="btn-shadow" @click="goPage(1)">首页</el-button>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="pageSizes"
      :page-size.sync="size"
      :layout="layout"
      :total="total"
    >
    </el-pagination>
    <el-button size="mini" class="btn-shadow" @click="goPage(totalPage)">尾页</el-button>
  </div>
</template>

<script>
export default {
  props: {
    layout: {
      type: String,
      default: 'prev, pager, next'
    },
    pageSize: {
      type: Number,
      default: 15
    },
    pageNum: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      required: true
    },
    pageSizes: {
      type: Array,
      default: () => [10, 30, 50, 100]
    }
  },
  computed: {
    page: {
      get() {
        return this.pageNum
      },
      set(val) {
        this.$emit('update:pageNum', val)
      }
    },
    size: {
      get() {
        return this.pageSize
      },
      set(val) {
        this.$emit('update:pageSize', val)
      }
    },
    totalPage() {
      return Math.ceil(this.total / this.size)
    }
  },
  methods: {
    handleSizeChange(val) {
      this.size = val
      this.goPage()
    },
    handleCurrentChange(val) {
      this.page = val
      this.goPage()
    },
    goPage(val) {
      if (val) this.page = val
      this.$emit('pagination')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.pagination {
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  // .el-button {
  //   border-color: transparent !important;
  //   color: #fff;
  //   width: 60px;
  //   height: 28px;
  // }
  // .el-pagination {
  //   background: transparent;
  //   padding: 2px 30px;
  //   .number {
  //     background: transparent;
  //     color: #fff;
  //   }
  //   .active {
  //     color: #0ff;
  //   }
  //   button {
  //     color: #fff;
  //     background-size: auto;
  //     background-color: rgba(0, 255, 255, 0.3) !important; /* 浏览器不支持的时候显示 */
  //     background-image: radial-gradient(
  //       rgba(19, 68, 70, 1),
  //       rgba(19, 68, 70, 0.9),
  //       rgba(0, 255, 255, 0.1)
  //     ) !important; /* 标准的语法（必须放在最后 */
  //   }
  //   .btn-prev {
  //     .el-icon-arrow-left:before {
  //       display: none;
  //     }
  //     &:before {
  //       content: '上一页';
  //     }
  //   }

  //   .btn-next {
  //     .el-icon-arrow-right:before {
  //       display: none;
  //     }
  //     &:before {
  //       content: '下一页';
  //     }
  //   }
  // }
}
</style>
