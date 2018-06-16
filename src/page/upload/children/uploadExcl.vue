<template>
    <div class="uploadExcl">
      <h4>请选择需要导入的Excel文件</h4>
      <websocket></websocket>
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
        <template>
          <span class="name">平台：</span>
          <el-select v-model="platformId" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
        <div slot="tip" class="el-upload__tip">只能上传Excl类型文件</div>
      </el-upload>
    </div>
</template>

<script>
  import websocket from '../../../components/getWebSocket/getWebSocket'
  import {platform,uploadExcl} from '../../../axios/api'

    export default {
      name: "uploadExcl",
      components: {
        websocket
      },
      data() {
          return {
            //上传的地址
            importUrl: '',
            importHeaders:{ //请求头格式
              enctype:'multipart/form-data',
              cityCode:''
            },
            withCredentials: true,
            processing: false,
            fileList: [],
            options: [], //请求的所有公司
            platformId: '',//选中的公司
            companyUrl: '',
          }
      },
      created() {
        this.getCompanyUrl();
      },
      mounted() {
        this.getPlatform();
      },
      methods:{
        getCompanyUrl() {
          let url = this.$route.path;
          if(url === '/orderUpload') {
            this.companyUrl = '/platformManage/getPlatformManageList';
            this.importUrl = 'http://192.168.1.138:8081/SettlePlatform/orderReceivable/importOrder';
            console.log(this.companyUrl,1);
          }else if(url === '/transUpload') {
            this.companyUrl = '/payChannelManage/getPayChannelManageList';
            this.importUrl = 'http://192.168.1.138:8081/SettlePlatform/transaction/importTrans'
          }
        },
        submitUpload() {
          if(this.platformId) {
            this.$refs.upload.submit();
          }else {
            this.$message.error('请选择平台');
          }
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
          fd.append('id',this.platformId);
          uploadExcl(this.importUrl,fd).then(res =>{
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
          console.log(response);
        },
        getPlatform() {
          console.log(this.companyUrl);
          platform(this.companyUrl).then(res => {
            console.log(res,11);
            if(res.data.status === '200') {
              this.options = res.data.obj;
            }
          })
        }
      }
    }
</script>

<style scoped>
  .uploadExcl{
    padding-top: 15px;
  }
</style>
