<template>
  <transition name="fade">
    <div class="dialogBox" v-show="visible" :style="{ 'z-index': zIndex }" ref="dialogBox">
      <!-- 遮罩 -->
      <div
        class="dialogBox__layer"
        v-if="isLayer"
        @click="isLayerClickClose ? onClose() : null"
      ></div>
      <!-- 主体 -->
      <div
        class="dialogBox__main"
        ref="dialogBox__main"
        :style="{
          width: width == 'auto' ? undefined : `${handleLength(width, true)}px`,
          height: height == 'auto' ? undefined : `${handleLength(height)}px`,
          'margin-top': handleLength(marginTop) + 'px',
          left: posData.left !== undefined ? `${posData.left}px` : undefined,
          top: posData.top !== undefined ? `${posData.top}px` : undefined,
          right: posData.right !== undefined ? `${posData.right}px` : undefined,
          bottom: posData.bottom !== undefined ? `${posData.bottom}px` : undefined,
          'z-index': 100
        }"
      >
        <!-- 标题栏header -->
        <div class="dialogBox__header" v-show="!isHideHeader" ref="dialogBox__header">
          <span class="dialogBox__title">{{ title }}</span>
          <div class="dialogBox__close" @click="onClose">
            <i class="el-icon-close"></i>
          </div>
        </div>
        <!-- 内容body -->
        <div
          class="dialogBox__body"
          :style="{ height: `calc(100% - ${isHideHeader ? 0 : headerHeight})` }"
        >
          <component
            v-if="component"
            :is="component"
            v-bind="componentProps"
            class="dialogBox__content"
            @close="handleDialogBoxClose"
          >
          </component>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'DialogBox',
  props: {
    component: [Object, Function, String],
    componentProps: [Object],
    title: {
      type: String,
      default: '标题'
    },
    zIndex: {
      type: Number,
      default: 1
    },
    // 显示遮罩
    isLayer: {
      type: Boolean,
      default: true
    },
    // 是否点击遮罩关闭
    isLayerClickClose: {
      type: Boolean,
      default: false
    },
    // 是否隐藏标题
    isHideHeader: {
      type: Boolean,
      default: false
    },
    // 支持px,%,vh, 值为0表示无margin-top, 若要设置margin-top: 0，请使用 '0'/'0px'
    marginTop: {
      type: [Number, String],
      default: 0
    },
    // 宽度 auto为子元素宽度 支持px,%,vw
    width: {
      type: [Number, String],
      default: 'auto'
    },
    // 高度 auto为子元素高度 支持px,%,vh 无marginTop时，根据该属性设置居中位置
    height: {
      type: [Number, String],
      default: 'auto'
    },
    // 是否固定，false可拖拽
    isFixed: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false,
      result: null,
      callBackFunc: null,
      posData: {},
      headerHeight: 35
    }
  },
  created() {
    this.initPos()
  },
  mounted() {
    this.visible = true
    this.$nextTick(() => {
      this.headerHeight = this.$refs.dialogBox__header.offsetHeight
      this.isFixed || this.drag(this.$refs.dialogBox__header, this.$refs.dialogBox__main)
      window.onresize = this.onWinResize
    })
  },
  beforeDestroy() {
    this.callBackFunc((resolve, reject) => {
      resolve(this.result)
    })
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  },
  methods: {
    // 关闭
    onClose() {
      this.visible = false
      const st = setTimeout(() => {
        this.$destroy(true)
        clearTimeout(st)
      }, 300)
    },
    // 有数据的关闭
    handleDialogBoxClose(result) {
      this.result = result
      this.onClose()
    },
    // 初始化位置
    initPos() {
      const posData = {
        top: 0,
        left: 0
      }
      // 获取页面可视区域的宽高
      let docHeight = parseFloat(document.documentElement.clientHeight)
      let docWidth = parseFloat(document.documentElement.clientWidth)

      // 获取组件的宽高
      const domHeight = this.handleLength(this.height)
      const domWidth = this.handleLength(this.width, true)

      // 设置了marginTop属性则用margin-top
      if (!this.marginTop) {
        posData.top = (docHeight - domHeight) / 2
      }
      posData.left = (docWidth - domWidth) / 2
      this.posData = posData
    },
    /**
     * @description: 拖拽
     * @param {HTMLElement} dragBox 拖拽点击元素
     * @param {HTMLElement} moveBox 拖拽移动元素
     */
    drag(dragBox, moveBox) {
      let marginTopHeight = 0
      // 设置了marginTop则top会减去marginTop的高度
      if (this.marginTop) {
        marginTopHeight = this.handleLength(this.marginTop)
      }
      dragBox.onmousedown = e => {
        const disX = (e.pageX || e.clientX) - moveBox.offsetLeft
        const disY = (e.pageY || e.clientY) - moveBox.offsetTop
        document.onmousemove = e => {
          e.preventDefault()
          e.stopPropagation()
          let offX = e.clientX - disX
          let offY = e.clientY - disY
          const diffX = document.documentElement.clientWidth - moveBox.offsetWidth
          const diffY = document.documentElement.clientHeight - moveBox.offsetHeight
          offX = offX < 0 ? 0 : offX > diffX ? diffX : offX
          offY = offY < 0 ? 0 : offY > diffY ? diffY : offY
          this.posData.left = offX
          this.posData.top = offY - marginTopHeight
          return false
        }
        document.onmouseup = () => {
          document.onmousemove = null
          document.onmouseup = null
          return false
        }
        return false
      }
    },
    /**
     * @description 处理长度
     * @param len {String, Number} 传入的长度
     * @param isWidth {Boolean} 是否是宽度; true: 宽， false(默认): 高
     * @return {Number}
     */
    handleLength(len, isWidth) {
      let isHeight = isHeight || false
      let clientLen = isWidth
        ? document.documentElement.clientWidth
        : document.documentElement.clientHeight
      if (typeof len === 'number') {
        return len
      } else if (typeof len === 'string') {
        if (len.indexOf('vh') > -1) {
          return (parseFloat(len) * clientLen) / 100
        } else if (len.indexOf('vw') > -1) {
          return (parseFloat(len) * document.documentElement.clientWidth) / 100
        } else if (len.indexOf('px') > -1) {
          return parseFloat(len)
        } else if (len.indexOf('%') > -1) {
          return (parseFloat(len) * clientLen) / 100
        }
      } else {
        return 0
      }
    },
    // 调整窗口大小时调整位置
    onWinResize() {
      this.initPos()
    }
  }
}
</script>
<style lang="scss" scoped>
.dialogBox {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  &__main {
    position: absolute;
    background: #ffffff;
  }
  &__header {
    text-align: left;
    padding: 8px;
  }
  &__title {
    margin-left: 10px;
  }
  &__title::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 14px;
    left: 8px;
    top: 11px;
  }
  &__close {
    position: absolute;
    top: 10px;
    right: 14px;
    cursor: pointer;
  }
  &__body {
    padding: 10px;
    position: relative;
    height: calc(100% - 20px);
  }
  &__content {
    width: 100%;
    height: 100%;
  }
  &__layer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    background: rgba($color: #000000, $alpha: 0.5);
    z-index: 1;
  }
}
// fade过渡效果
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-enter {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
