<template>
  <div>
    <h4>请导入异常需重新对账的数据</h4>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="importUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-error="uploadFail"
      :on-success="uploadSuccess"
      :file-list="fileList"
      :auto-upload="false"
      :with-credentials="withCredentials">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传Excl类型文件</div>
    </el-upload>
  </div>
</template>

<script>
  import {platform,uploadError} from '../../../axios/api'

  export default {
    name: "uploadError",
    data() {
      return {
        //上传的地址
        importUrl: 'http://192.168.1.138:8081/SettlePlatform/platformManage/getPlatformManageList',
        importHeaders:{ //请求头格式
          enctype:'multipart/form-data',
          cityCode:''
        },
        withCredentials: true,
        processing: false,
        fileList: [],
        options: [], //请求的所有公司
        platformId: '',//选中的公司
      }
    },
    mounted() {
      // this.getPlatform();
    },
    methods:{
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {//文件移除
        // console.log(file, fileList);
      },
      handlePreview(file) { //点击文件列表中已上传的文件时的钩子可以通过 file.response 拿到服务端返回数据
        console.log(file);
      },
      beforeUpload(file){
        //上传前配置
        let fd = new FormData();
        fd.append('file',file);
        uploadError(this.importUrl,fd).then(res =>{
          console.log(res);
          if(res.data.status === '200') {
            let length = res.data.obj.length;
            this.$message.success('成功上传'+ length + '条数据');
          }else {
            this.$message.error(res.data.msg);
          }
        });
        return true
      },
      //上传错误
      uploadFail(err, file, fileList) {
        this.uploadTip = '点击上传';
        this.processing = false;
        this.$message.error(err)
      },
      //上传成功
      uploadSuccess(response, file, fileList) {
        this.processing = false;
        console.log(response,1);
      },
      getPlatform() {
        platform(this.importUrl).then(res => {
          if(res.data.status === '200') {
            this.options = res.data.obj;
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
