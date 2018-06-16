<template>
  <div class="platform-setup">
    <div class="search-btn">
      <div class="search">
        <el-input v-model="inputValue" size="mini" placeholder="请输入内容"></el-input>
        <el-button type="primary" size="mini" @click="filterData">搜索</el-button>
      </div>
      <div class="btn-box">
        <el-button type="primary" size="mini">新增</el-button>
        <el-button type="success" size="mini">修改</el-button>
        <el-button type="danger" size="mini" @click="ordPlatformDele">删除</el-button>
      </div>
    </div>
    <template>
      <el-table
        border
        :data="platformData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="number"
          label="平台编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="平台名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="platformName"
          label="平台类型">
        </el-table-column>
        <el-table-column
          prop="payChannelNames"
          label="支付渠道">
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="所属公司">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
    import {orderPlatform,ordPlatformDele} from '../../axios/api'
    export default {
      name: "platformSetup",
      data() {
        return {
          selectedId: '',//选中的id
          inputValue: '',
          platformData: [],
        }
      },
      watch: {
        inputValue(newValue){
          if(!newValue) {
            this.getData();
          }
        }
      },
      mounted() {
        this.getData()
      },
      methods: {
        aa() {
          let arr = ['Object的hasOwnProperty()方法返回一个布尔值,判断对象是否包含特定的自身(非继承)属性。'];
          console.log(arr[0].indexOf(this.inputValue));
        },
        getData() { //请求数据
          orderPlatform().then(res => {
            console.log(res);
            if(res.data.status === '200') {
              this.platformData = JSON.parse(res.data.obj.data)
            }
          })
        },
        filterData() {
          let val = this.inputValue;
          let selectedData = [];
          let i;
          let length = this.platformData.length;
          console.log(typeof val);
          for(i = 0;i<length; i += 1) {
            let allValue = this.getIndex(this.platformData[i]);
            console.log(allValue.indexOf(val));
            if(allValue.length) {
              if(allValue.indexOf(val) !== -1) {
                selectedData.push(this.platformData[i])
              }
            }
          }
          this.platformData = selectedData;
        },
        getIndex(value) {
          let arr = '';
          for(let key in value) {
            if(value.hasOwnProperty(key)) {
              arr += value[key]
            }
          }
          return arr;
        },
        handleCurrentChange(val) { //选中
          console.log(val);
          this.selectedId = val.id;
          this.currentRow = val;
        },
        ordPlatformDele() {
          if(this.selectedId) {
            ordPlatformDele(this.selectedId).then(res=>{
              if(res.data.status === '200') {
                this.getData();
                this.$message.success(res.data.msg)
              }else {
                this.$message.error(res.data.msg)
              }
            })
          }else{
            this.$message.error('请选择要删除的平台')
          }
        }
      }
    }
</script>

<style scoped>
  .search-btn{
    display: -webkit-box;
    display: flex;
    padding: 15px 0;
  }
  .search-btn>div{
    flex: 1;
  }
  .btn-box{
    justify-content: flex-end;
    display: flex;
  }
  .search{
    display: -webkit-box;
    display: flex;
  }
  .search .el-input{
    margin-right: 10px;
    width: 150px;
  }

</style>
