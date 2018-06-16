<template>
    <div class="system">
      <div class="head_search">
        <h3 class="head_title">系统对账单</h3>
        <search @system="flitersystem"></search>
        <bill :selectedData="handSelectDataList[0]"></bill>
        <singleDifferences :selectData="handSelectDataList" @reqMethod="systemSingleDif"></singleDifferences>
      </div>
      <div class="container">
        <template>
          <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <!--按钮-->
            <el-row>
              <el-btn  @reqParent="request">审核</el-btn>
              <el-btn  @reqParent="request">反审核</el-btn>
              <el-btn>差异对账</el-btn>
              <el-btn  @reqParent="request">删除</el-btn>
              <el-btn @openBill="openBill">结算详情</el-btn>
            </el-row>
            <el-tab-pane label="全部" name="UnSettled,Part,Completely,Exception"></el-tab-pane>
            <el-tab-pane label="已对账" name="Completely"></el-tab-pane>
            <el-tab-pane label="部份对账" name="Part"></el-tab-pane>
            <el-tab-pane label="未对账" name="UnSettled"></el-tab-pane>
            <template>
              <el-table
                border
                v-loading="loading"
                ref="OrderTable"
                :data="getLocalDataList"
                highlight-current-row
                height="410"
                @row-click="handleSelectedRow"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="60">
                </el-table-column>
                <el-table-column
                  prop="billNo"
                  label="单据编号"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="payChannelManageName"
                  label="支付渠道"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="payChannelName"
                  label="支付渠道类型"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="settleTotalAmount"
                  label="结算金额"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="settleAmount"
                  label="已对账金额"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="unsettleAmount"
                  label="未对账金额"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="单据状态"
                  width="100"
                  :formatter="formatStatus">
                </el-table-column>
                <el-table-column
                  prop="reconStatus"
                  label="对账状态"
                  width="100"
                  :formatter="formatSettleStatus">
                </el-table-column>
                <el-table-column
                  prop="differenceProcessingStatus"
                  label="差异处理状态"
                  width="110"
                  :formatter="formatDifferenceProcessingStatus">
                </el-table-column>
                <el-table-column
                  prop="differenceProcessingAmount"
                  label="差异处理金额"
                  width="110">
                </el-table-column>
                <el-table-column
                  prop="differenceProcessingRamarks"
                  label="差异处理原因"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="transTotalAmount"
                  label="交易金额"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="transTotalCharge"
                  label="手续费"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="settleReconNo"
                  label="结算单号"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="batchNo"
                  label="批次号"
                  width="130">
                </el-table-column>
              </el-table>
            </template>
          </el-tabs>
        </template>

      </div>
      <template>
       <div class="block" v-show="pagination">
            <el-pagination @size-change="handleSizeChangeOrder" @current-change="handleCurrentChangeOrder" :current-page="system.selectPageNumber" :page-sizes="[100, 200, 500, 1000,20000]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="system.total">
            </el-pagination>
        </div>
      </template>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {settlementtCheckAjax,settlementtCheckPage,singleDif,Method,systemStatementAjax,systemStatementPage
  } from '../../axios/api'
  import search from '../../components/search/Search'
  import singleDifferences from '../../components/filterBox/singleDifferences'
  import bill from '../../components/filterBox/bill'
  import button from '../../components/btnList/button'
  export default {
    name: 'system',
    components:{
      search,//高级搜索
      singleDifferences,
      bill,
      'el-btn': button,
    },
    data () {
      return {
        loading: true,
        diffName: 'settlementPlatform',//差异对账接口url
        activeName: 'UnSettled,Part,Completely,Exception',
        getLocalDataList:[],//请求的数据
        handSelectDataList:[],//选中的数据
        pagination:true,  //分页显示
        btnInfo:[],
        message: '',
        currentPage4: 4,
        system: { //请求查询条件
          commercialTenantName: "",
          commercialTenantNo: "",
          companyOwning: "",
          pageNumber: 1,
          pageSize: 100,
          platformName: "",
          reconStatus: null,
          status: null,
          transNo: "",
          total: 1,
          // totals: Number,
          selectPageNumber: 1,
          // selectPageNumbers: 1
        },
        valueData:[], //查询返回的数组
      }
    },
    computed: {
      ...mapState({
        verifyStatus:store=>store.verifyStatus
      })
    },
    mounted(){
      this.getLocalData();
      this.getPagination();
    },
    methods:{
      //高级查询
      flitersystem(value){
        console.log(value)
        this.valueData = value;
        this.loading = true;
        //查询
        systemStatementAjax(value).then(res=>{
          this.getLocalDataList = res.data.obj;
          this.loading = false;
        })
        //分页
        systemStatementPage(value).then(res=>{
          this.system.total = res.data.obj[0].total;
          this.loading = false;
        })
      },

      demandonLoad(){
        //查询
        var value = this.valueData;
        this.loading = true;
        systemStatementAjax(value).then(res=>{
          this.getLocalDataList = res.data.obj;
          this.loading = false;
        })
        //分页
        systemStatementPage(value).then(res=>{
          this.system.total = res.data.obj[0].total;
          this.loading = false;
        })
      },
      pageOnclick(){
        if(this.valueData == ''){
          this.getLocalData();
        }else{
          this.demandonLoad();
        }
      },

      /*请求数据*/
      getLocalData(){
        //数据
        settlementtCheckAjax(
          this.system.commercialTenantName,
          this.system.commercialTenantNo,
          this.system.companyOwning,
          this.system.pageNumber,
          this.system.pageSize,
          this.system.platformName,
          this.system.reconStatus,
          this.system.status,
          this.system.transNo
        ).then(res=>{
        if(res.data.status === '200'){
          this.getLocalDataList = res.data.obj;
          this.loading = false;
        }
      });
      },
      getPagination() {
        //分页
        settlementtCheckPage(
          this.system.commercialTenantName,
          this.system.commercialTenantNo,
          this.system.companyOwning,
          this.system.pageNumber,
          this.system.pageSize,
          this.system.platformName,
          this.system.reconStatus,
          this.system.status,
          this.system.transNo
        ).then(res=>{
          if(res.data.status === '200'){
            this.system.total = res.data.obj[0].total;
            this.loading = false;
          }
        })
      },
       handleSizeChangeOrder(val) {
          //选择条数
         if(this.valueData == ''){
           this.system.pageSize = val;
         }else{
           this.valueData[0].pageSize = val;
         }
         this.pageOnclick()
//         this.system.pageSize = val;
//         this.loading = true;
//         this.getLocalData();
//         this.getPagination();
    },
      handleCurrentChangeOrder(val) {
        //选中页码
        if(this.valueData == ''){
          this.system.pageNumber = val;
        }else{
          this.valueData[0].pageNumber = val;
        }
        // this.getLocalData();
        this.pageOnclick()
//        this.system.selectPageNumber = val;
//        this.system.pageNumber = val;
//        this.loading = true;
//        this.getLocalData();
//        this.getPagination();
      },
      handleClick() {
        this.loading = true;
        this.system.reconStatus = this.activeName;
        this.getLocalData();
        this.getPagination();
      },
      getRowInfo(row){//获取点击的信息然后跳转
        //let index = this.getLocalDataList.indexOf(row);
        this.$store.dispatch('storeOrderListUUid',row.uuid);
        this.$refs.OrderTable.toggleRowSelection(row);
        this.$router.push({
          name: 'orderDetail',
          params: {id: row.uuid}
        })
      },
      //点击行
      handleSelectedRow(row){
        this.$refs.OrderTable.toggleRowSelection(row);
      },
      //当选择项发生变化时会触发该事件
      handleSelectionChange(val){
        this.handSelectDataList = val;
      },
     systemSingleDif(dataMore) { //差异处理
       singleDif(this.diffName,dataMore).then(res=>{
         if(res.data.status === '200') {
           this.$store.dispatch('dialogDifferences');
           this.getLocalData();
           this.$message.success(res.data.msg);
         }else{
           this.$message.error('差异对账失败');
         }
       })
     },
      getId(str) { //获取所有选中元素id
        let arr = [];
        let status = this.status(str);
        this.handSelectDataList.forEach((value,index)=>{
          if(value.status === status.status) {
            arr.push(value.uuid);
          }
        });
        return arr;
      },
      request(str) {
        let name = 'settlementPlatform';
        let message = (str === 'audit' && '审核') ||
          (str === 'unAudit' && '反审核') ||
          (str === 'delete' && '删除');
        let data = this.getId(str);
        if(data.length) {
          Method(name,str,data).then(res=>{
            console.log(res);
            if(res.data.status == 200) {
              this.$message.success(message + '成功');
              this.getLocalData();
              this.getPagination();
            }else{
              this.$message.error(res.data.msg);
            }
          })
        }else {
          let status = this.status(str);
          this.$message.error('单据状态为' + status.name + '才能' + message);
        }
      },
      status(str) {
        let status = {};
        switch (str){
          case 'audit':
            status = {
              status: 'Save',
              name: '保存',
            };
            break;
          case 'unAudit':
            status = {
              status: 'Audited',
              name: '审核',
            };
            break;
          case 'delete':
            status = {
              status: 'Save',
              name: '保存',
            };
            break;
        }
        return status;
      },
      openBill() {
        if(this.handSelectDataList[0]) {
          this.$store.dispatch('dialogFromBill')
        }else {
          this.$message.error('请选择一条数据');
        }
      },
      // //数格式转换
      //   formatTime(row) { //转换时间
      //       return FormatDate(row.transTime);
      //   },
        formatStatus(row) { //单据状态
            return (row.status === 'Save' && '保存') || (row.status === 'Audited' && '审核');
        },
        formatSettleStatus(row) { //对账状态
            return (row.reconStatus === "UnSettled" && '未对账') || (row.reconStatus === "Part" && '部分对账') || (row.reconStatus === 'Completely' && '完全对账');
        },
        formatDifferenceProcessingStatus(row) { //差异处理状态
            return (row.differenceProcessingStatus === "Y" && '是') || (row.differenceProcessingStatus === "N" && '否');
        },
        formatReconStatus(row) { //退款状态
            return row.reconStatus = (row.reconStatus === 'UnSettled' && '未退款') || (row.reconStatus === 'Part' && '部分退款') || (row.reconStatus === 'Completely' && '完全退款')
        }
        // formatClearDate(row) {
        //     return FormatDate(row.clearDate);
        // },

    },
  }

</script>
<style scoped>
  .el-row{
    /*background: #d0e9ff;*/
    height:40px;
    padding:5px 0;
  }
  table .el-button{
    width: 50%;
    padding: 0;
  }
  .el-dropdown{
    padding:0 8px;
  }
  .el-row .el-button-group .el-button{
    padding:5px;
  }
  .el-pagination{
    margin-top:10px;
  }
</style>
