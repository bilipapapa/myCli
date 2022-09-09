<template>
  <el-upload
    class="upload-demo upload_btn"
    ref="upload"
    :with-credentials="true"
    :action="uploadUrl"
    :data="dataObj"
    :multiple="multiple"
    :limit="limit"
    :auto-upload="true"
    :name="name"
    :accept="accept"
    :on-exceed="handleExceed"
    :show-file-list="showfileList"
    :file-list="choosedFile"
    :before-upload="beforeUpload"
    :on-success="uploadSuccess"
  >
    <el-button
      :size="btnAttr.btnSize || 'small'"
      :icon="btnAttr.icon"
      type="primary"
      class="btn-dialog"
      @click="clear"
      >{{ btnAttr.btnText || '点击上传' }}</el-button
    >
  </el-upload>
</template>

<script>
import { number } from 'echarts'
export default {
  props: {
    // 上传的额外参数
    dataObj: {
      type: Object,
      default: () => {}
    },
    //限制上传几个文件
    limit: {
      type: Number,
      default: 1
    },
    //上传路径
    uploadUrl: {
      type: String,
      default: ''
    },
    btnAttr: {
      type: Object,
      default: () => {
        return {
          btnSize: '',
          btnText: '',
          icon: ''
        }
      }
    },
    //是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    //接受的文件类型
    accept: {
      type: String,
      default: '',
      required: true
    },
    //是否使用组件默认的上传
    request: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'file'
    },
    // 是否需要accept里面的所有文件
    needAllFile: {
      type: Boolean,
      default: false
    },
    // 是否显示上传的文件列表
    showfileList: {
      type: Boolean,
      defaultl: false
    }
  },
  computed: {
    fileType() {
      var arr = this.accept.toLowerCase().split(',')
      return [...new Set(arr)]
    }
  },
  data() {
    return {
      choosedFile: [],
      fileList: [],
      times: 0,
      timer: null
    }
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
      this.$refs['upload'].clearFiles()
    },
    beforeUpload(val) {
      if (!this.request) {
        var choosedFileType = '.' + val.name.split('.').reverse()[0]
        if (!this.fileType.includes(choosedFileType)) return this.uploadWarning()
        // 是否需要fileType里面的所有文件
        if (this.needAllFile) {
          this.times++
          this.fileList.push(val)
          if (this.timer) clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            if (this.times === this.limit) {
              var set = new Set()
              this.fileList.forEach(item =>
                set.add(
                  item.name
                    .split('.')
                    .reverse()[0]
                    .toLowerCase()
                )
              )
              if (set.size === this.fileType.length) {
                this.$emit('sendFile', this.fileList)
              } else {
                this.uploadWarning()
              }

              this.times = 0
              this.fileList = []
            }
          }, 300)
        } else {
          this.$emit('sendFile', val)
        }
        return false
      }
    },
    uploadSuccess(res) {
      if (res.code === 200) {
        this.$emit('uploadSuccess')
      }
    },
    uploadWarning() {
      var str = this.needAllFile ? '请同时上传以' : '请上传'
      this.fileType.forEach(item => {
        str += item + '、'
      })
      this.$message({
        type: 'warning',
        message: str.slice(0, -1) + '为后缀的文件'
      })
      return false
    },
    clear() {
      this.$refs['upload'].clearFiles()
    }
  }
}
</script>

<style lang="scss" scoped>
.upload_btn {
  display: inline;
}
::v-deep .el-upload {
  width: 100%;
  .el-button {
    width: 100%;
  }
}
.el-button {
  border-color: unset;
}
</style>
