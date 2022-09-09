<template>
  <div class="box">
    <div :class="['title', noEmpty ? '' : 'empty']" :style="titleStyle">{{ title }}</div>
    <div ref="echarts" class="echarts" v-if="noEmpty"></div>
    <div v-else class="noEmpty">暂无数据</div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  model: {
    prop: 'option'
  },
  props: {
    //  是否重新绘制整张图标  可解决数据更新视图更新错误
    reDraw: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    titleStyle: {
      type: Object,
      default: () => {}
    },
    option: {
      type: Object,
      default: () => {}
    },
    emitData: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    option: {
      handler(val) {
        if (val.series[0].data.length) {
          this.noEmpty = true
          this.drawChart()
        } else {
          this.noEmpty = false
        }
      },
      deep: true,
      immediate: true
    },
    titleStyle: {
      handler(val) {
        if (val) {
          //dosomething
        }
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      noEmpty: false,
      myChart: null,
      style: {},
      resize: null
    }
  },
  methods: {
    //  绘制ecahrts
    drawChart() {
      this.$nextTick(() => {
        // 防止option变化 初始化多个echarts实例
        if (!this.myChart) {
          this.myChart = echarts.init(this.$refs['echarts'])
          if (this.emitData) {
            this.myChart.on('click', params => {
              this.$emit('clickChart', params)
            })
          }
          //  页面缩放重新绘制echarts
          this.resize = () => {
            this.myChart.resize()
          }
          window.addEventListener('resize', this.resize)
        }
        //  是否重新绘制整张图标  可解决数据更新视图更新错误
        if (this.reDraw) {
          this.myChart.setOption(this.option, true)
        } else {
          this.myChart.setOption(this.option)
        }
      })
    }
  },
  beforeDestroy() {
    this.noEmpty = false
    this.myChart = null
    window.removeEventListener('resize', this.resize)
  }
}
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .echarts {
    width: 100%;
    height: 100%;
  }
  .noEmpty {
    width: 100%;
    font-size: 20px;
    color: #666;
    text-align: center;
  }
  .empty {
    color: #666 !important;
  }
  .title {
    position: absolute;
    top: 20px;
    left: 50%;
    color: #606262;
    transform: translateX(-50%);
    z-index: 10000000;
  }
}
</style>
