<template>
  <el-table
    :data="data"
    border
    :stripe="tableAttribute.stripe || true"
    ref="table"
    :height="tableAttribute.height"
    :show-header="tableAttribute.showHeader || true"
    :size="tableAttribute.size"
    :header-row-class-name="tableAttribute.headerClass"
    :highlight-current-row="tableAttribute.highlightCurrentRow || false"
    :default-sort="tableAttribute.defaultSort"
    @current-change="currentChange"
    @row-dblclick="rowDbclick"
    @selection-change="selectionChange"
    @sort-change="sortChange"
  >
    <el-table-column
      v-if="tableAttribute.type === 'selection' || tableAttribute.type === 'index'"
      align="center"
      width="60"
      :label="tableAttribute.type === 'index' ? '序号' : ''"
      :type="tableAttribute.type"
    >
    </el-table-column>
    <template v-for="item in tableAttribute.columns">
      <slot v-if="item.slot" :name="item.slot"></slot>
      <el-table-column
        v-else
        :key="item.label"
        :prop="item.field"
        :label="item.label"
        :align="item.align || 'center'"
        :min-width="item.width"
        :class-name="item.class"
        :sortable="item.sortable || false"
        :formatter="item.formatter"
        show-overflow-tooltip
      >
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  props: {
    //表格属性
    tableAttribute: {
      type: Object,
      default: () => {
        return {
          type: '', //表格的type selection或者index
          height: window.innerHeight, //表格的最大高度
          stripe: true, //  斑马纹表格
          size: '',
          showHeader: true, //  默认显示表头
          headerClass: 'headerClass', //表格头部的类名
          highlightCurrentRow: false,
          tableEvents: '', //表格的事件
          columns: [] //表格的列
        }
      }
    },
    //表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    //选中某行
    currentRow: {
      type: [Number, Object],
      default: -1 //-1时清空所选行
    },
    //表格请求的参数
    tableParams: {
      type: Object,
      default: () => {}
    },
    //模糊查询--本地（不调用方法)
    fuzzyLocal: {
      type: Boolean,
      default: false
    },
    //本地搜索模糊查询的字段
    queryField: {
      type: String,
      default: ''
    },
    sortChange: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      data: []
    }
  },
  methods: {
    //单机切换选择行
    currentChange(currentRow) {
      this.$emit('radio', currentRow)
    },
    //双击事件
    rowDbclick(currentRow) {
      this.$emit('dbclick', currentRow)
    },
    selectionChange(selection) {
      this.$emit('selection', selection)
    }
  },
  watch: {
    currentRow: {
      handler(val) {
        if (this.tableAttribute.tableEvents !== 'selection') {
          this.$refs['table'].setCurrentRow(val)
        }
      }
    },
    tableParams: {
      handler(val) {
        //模糊搜索本地
        if (this.fuzzyLocal) {
          if (!this.queryField) {
            throw new Error('未传入模糊查询需字段--queryField')
          }
          this.data = this.tableData.filter(item => {
            return item[this.queryField].includes(val[this.queryField].toLowerCase())
          })
        }
      },
      deep: true
    },
    tableData: {
      handler(val) {
        if (val.length) {
          this.data = val
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {}
}
</script>
