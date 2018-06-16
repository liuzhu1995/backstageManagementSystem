<template>
  <div class="select_company">
    <el-container>
      <el-header>对账平台</el-header>
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>公司列表（选择您要进入的公司）</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="(item,index) in companyList" :key="index" class="text item" @click="getCompanyId(item)" style="font-size:17px ;vertical-align:middle;">
            <div class="company-img">
              <img src="" alt="">
            </div>
            <div class="company-name" style="vertical-align:middle;height:20px;"></div>
            {{ item.name }}
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    import {getCompany,enterCompany} from '../../axios/api'
    export default {
      name: "selectCompany",
      data() {
        return {
          companyList: [],  //公司列表
          companyOwning: '', //公司id
        }
      },
      mounted() {
        this.getCompanyData()
      },
      methods: {
          getCompanyData() { //请求公司列表
            getCompany().then(res=>{
              console.log(res,'qqq');
              if(res.data.obj){
                this.companyList = res.data.obj;
              }
            })
          },
          enterCompany(){
            enterCompany(this.companyOwning).then(res =>{
              console.log(res.status);
              if(res.status === 200){
                this.$router.push('/chart');
              }
            })
          },
          getCompanyId(item) { //获取公司id 请求进入
            this.companyOwning = item.id;
            if(this.companyOwning){
              this.enterCompany();
            }
          }
      }

    }
</script>

<style scoped>

  .text {
    font-size: 14px;
  }

  .item {
    background: #F2F6FC;
    border-top: 5px solid #409EFF;
    border-radius: 5px;
    margin: 0 20px 18px 20px;
    height: 120px;
    width: 200px;
    cursor: pointer;
  }
  .item:hover {
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  .item .company-img,.company-name{
    display: inline-block;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {

  }
</style>
