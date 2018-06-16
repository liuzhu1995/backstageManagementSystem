<template>
    <div class="hello">
      <div class="head_search">
        <h3 class="head_title">交易流水</h3>
        <search @transactionFlow="flitertransactionFlow"></search>
        <batchAudit @reqMethod="transAudit"></batchAudit>
        <batchUnAudit @reqMethod="transUnAudit"></batchUnAudit>
        <singleDifferences :selectData="handSelectDataList" @reqMethod="transSingleDif"></singleDifferences>
        <batchDifferences @reqMethod="transDifferences"></batchDifferences>
        <batchDelete @reqMethod="transDeletes"></batchDelete>
      </div>
      <div class="container">
        <template>
          <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <!--按钮-->
            <el-row>
              <el-row>
                <dropDown>
                  <template slot="nameOne">流水导入</template>
                  <template slot="nameTwo">流水导出</template>
                </dropDown>
                <dropDown  @reqParent="request">
                  <template slot="nameOne">审核</template>
                  <template slot="nameTwo">批量审核</template>
                </dropDown>
                <dropDown  @reqParent="request">
                  <template slot="nameOne">反审核</template>
                  <template slot="nameTwo">批量反审核</template>
                </dropDown>
                <dropDown>
                  <template slot="nameOne">差异对账</template>
                  <template slot="nameTwo">批量差异对账</template>
                </dropDown>
                <dropDown  @reqParent="request">
                  <template slot="nameOne">删除</template>
                  <template slot="nameTwo">批量删除</template>
                </dropDown>
              </el-row>
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
                  prop="orderNo"
                  label="平台订单号"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="payChannelName"
                  label="支付渠道类型"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="payChannelManageName"
                  label="支付渠道名称"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="reconStatus"
                  label="对账状态"
                  width="100"
                  :formatter="formatSettleStatus">
                </el-table-column>
                <el-table-column
                  prop="settleAmount"
                  label="已对账金额"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="unSettleAmount"
                  label="未对账金额"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="transAmount"
                  label="交易金额"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="单据状态"
                  width="100"
                  :formatter="formatStatus">
                </el-table-column>
                <el-table-column
                  prop="businessType"
                  label="业务类型"
                  width="100"
                  :formatter="formatBusinessType">
                </el-table-column>
                <el-table-column
                  prop="transType"
                  label="交易类型"
                  width="100"
                  :formatter="transTypeStatus">
                </el-table-column>
                <el-table-column
                  prop="serviceCharge"
                  label="手续费"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="reconAmount"
                  label="结算金额"
                  width="100">
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
                  prop="transTime"
                  label="交易时间"
                  width="100"
                  :formatter="formatTime">
                </el-table-column>
                <el-table-column
                  prop="clearDate"
                  label="清算日期"
                  width="100"
                  :formatter="clearDate">
                </el-table-column>
                <el-table-column
                  prop="companyOwningName"
                  label="销售公司名称"
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="transNo"
                  label="交易流水号"
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="batchId"
                  label="批次号"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="serviceAmount"
                  label="技术服务费"
                  width="110">
                </el-table-column>
                <el-table-column
                  prop="indemnityAmount"
                  label="赔款金额"
                  width="110">
                </el-table-column>
                <el-table-column
                  prop="freightAmount"
                  label="运费补偿"
                  width="110">
                </el-table-column>
                <el-table-column
                  prop="indemnityHighAmount"
                  label="贵就赔"
                  width="110">
                </el-table-column>
                <el-table-column
                  prop="commissionAmount"
                  label="佣金支付净额"
                  width="110">
                </el-table-column>
                <el-table-column
                  prop="chargebackAmount"
                  label="扣款"
                  width="110">
                </el-table-column>
                <el-table-column
                  prop="commissionPushedAmount"
                  label="推手佣金"
                  width="110">
                </el-table-column>
                <el-table-column
                  prop="commissionShopkeeperAmount"
                  label="贝店店主佣金"
                  width="110">
                </el-table-column>
                <el-table-column
                  prop="commissionDepositAmount"
                  label="贝贝高佣返现"
                  width="110">
                </el-table-column>
              </el-table>
            </template>
          </el-tabs>
        </template>

      </div>
      <template>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="business.total">
          </el-pagination>
        </div>
      </template>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {
    transactionAjax,
    transactionPage,
    getAuditData,
    getPlatform,
    singleDif,
    Method,
    transAudit,
    transUnAudit,
    transDifferences,
    transDeletes,
    transactionFlowAjax,
    transactionFlowPage
  } from '../../axios/api'
  import search from '../../components/search/Search'
  import batchAudit from '../../components/filterBox/batchAudit'
  import batchUnAudit from '../../components/filterBox/batchUnAudit'
  import singleDifferences from '../../components/filterBox/singleDifferences'
  import batchDifferences from '../../components/filterBox/batchDifferences'
  import batchDelete from '../../components/filterBox/batchDelete'
  import dropDown from '../../components/btnList/dropDown'
  import button from '../../components/btnList/button'

  export default {
    name: 'HelloWorld',
    components:{
      search,//高级搜索
      batchAudit,//批量审核框
      batchUnAudit,//批量反审核框
      batchDifferences,//批量差异对帐
      batchDelete,//批量删除
      'el-btn': button,//单个按钮
      dropDown,//列表按钮
      singleDifferences,
    },
    data () {
      return {
        loading: true,
        diffName: 'transaction',//差异对账接口url
        activeName: 'UnSettled,Part,Completely,Exception',
        getLocalDataList:[],//请求的数据
        handSelectDataList:[],//选中的数据
        filterData: {}, //批量框数据
        pagination:true,  //分页显示
        btnInfo:[],
        message: '',
        currentPage4: 1,
        business: {
          pageNumber: 1, //第几页
          pageSize: 100, //每页展示数
          platformName: "", //参数
          reconStatus: "UnSettled,Part,Completely", //参数
          total: 1, //总页数
          selectPageNumber: 1, //选中的页数,
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
      this.getTransData();
      this.getPagination();
      this.getParaData();
    },
    methods:{


      flitertransactionFlow(value){
        console.log(value)
        this.valueData = value;
        this.loading = true;
        //查询
        transactionFlowAjax(value).then(res=>{
          this.getLocalDataList = res.data.obj;
          this.loading = false;
        })
        //分页
        transactionFlowPage(value).then(res=>{
          this.business.total = res.data.obj[0].total;
          this.loading = false;
        })
      },

      demandonLoad(){
        //查询
        var value = this.valueData;
        this.loading = true;
        transactionFlowAjax(value).then(res=>{
          this.getLocalDataList = res.data.obj;
          this.loading = false;
        })
        //分页
        transactionFlowPage(value).then(res=>{
          this.business.total = res.data.obj[0].total;
          this.loading = false;
        })
      },
      pageOnclick(){
        if(!this.valueData.length){
          this.getTransData();
        }else{
          this.demandonLoad();
        }
      },
      getParaData(){ //请求所有弹出框数据和平台
        getAuditData().then(res =>{
          if(res.status === 200){
            this.filterData = res.data;
            this.getPlatform(); //请求平台
          }
        })
      },
      getPlatform() {
        getPlatform().then(res=>{
          if(res.status === 200) {
            this.filterData.platform = res.data.obj;
          }
        });
        this.$store.dispatch('storeFilterData',this.filterData)
      },

      getTransData(){
        let that = this;
        //流水
        transactionAjax(
          that.business.platformName,
          that.business.pageNumber,
          that.business.pageSize,
          that.business.reconStatus
        ).then(res=>{
          if(res.data.status === '200'){
            this.getLocalDataList = res.data.obj;
            this.loading = false;
          }
        })
      },
      getPagination() {//请求分页
        transactionPage(
          this.business.platformName,
          this.business.pageNumber,
          this.business.pageSize,
          this.business.reconStatus
        ).then(res=>{
          if(res.data.status === '200'){
            this.business.total = res.data.obj[0].total;
          }
        })
      },
      handleSizeChange(val) { // 选择请求每页页数
        console.log(`每页 ${val} 条`);
        if(this.valueData == ''){
          this.business.pageSize = val;
        }else{
          this.valueData[0].pageSize = val;
        }
        this.pageOnclick()
//        this.pageSize = val;
//        this.getTransData();
//        this.getPagination();
      },
      handleCurrentChange(val) { //翻页

        if(this.valueData == ''){
          this.business.pageNumber = val;
        }else{
          this.valueData[0].pageNumber = val;
        }
        // this.getLocalData();
        this.pageOnclick()
//        this.business.pageNumber = val;
//        this.getTransData();
//        this.getPagination();
        console.log(`当前页: ${val}`);
      },
      handleClick() {
        this.loading = true;
        this.business.reconStatus = this.activeName;
        this.getTransData();
        this.getPagination();
      },
      //点击行
      handleSelectedRow(row){
        this.$refs.OrderTable.toggleRowSelection(row);
      },
      //当选择项发生变化时会触发该事件
      handleSelectionChange(val){
        this.handSelectDataList = val;
      },
      transSingleDif(dataMore) { //差异对账
        singleDif(this.diffName,dataMore).then(res => {
          this.$store.dispatch('loadDisabled',false);
          if(res.data.status === '200') {
            this.$store.dispatch('dialogDifferences');
            this.getTransData();
            this.$message.success(res.data.msg);
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      getId(str) { //获取所有选中元素id
        let arr = [];
        let status = this.status(str);
        this.handSelectDataList.forEach((value,index)=>{
          console.log(value.status);
          if(value.status === status.status) {
            arr.push(value.uuid);
          }
        });
        return arr;
      },
      request(str) {
        let name = 'transaction';
        let message = (str === 'audit' && '审核') ||
          (str === 'unAudit' && '反审核') ||
          (str === 'delete' && '删除');
        let data = this.getId(str);
        if(data.length) {
          Method(name,str,data).then(res=>{
            console.log(res);
            if(res.data.status == 200) {
              this.$message.success(res.data.msg);
              this.getTransData();
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

      transAudit(form) { //批量审核
        transAudit(
          form.businessDate,
          form.businessDateEnd,
          form.orderType,
          form.platform,
          form.settleStatus,
          form.remarks,
          form.status,
        ).then(res=>{
          this.$store.dispatch('loadDisabled',false);
          if(res.data.status === '200') {
            this.$message.success(res.data.obj.success);
            this.$store.dispatch('dialogFromAudit');
            this.getTransData();
            this.getPagination();
          }else{
            this.$message.error('批量审核失败');
          }
        })
      },
      transUnAudit(form) { //批量反审核
        transUnAudit(
          form.businessDate,
          form.businessDateEnd,
          form.orderType,
          form.platform,
          form.reconStatus,
          form.status,
        ).then(res=>{
          console.log(res);
          this.$store.dispatch('loadDisabled',false);
          if(res.data.status === '200') {
            this.$message.success(res.data.obj.success);
            this.$store.dispatch('dialogFromUnAudit');
            this.getTransData();
            this.getPagination();
          }else{
            this.$message.error('批量反审核失败');
          }
        })
      },
      transDifferences(form) { //批量差异对账
        console.log(form);
        transDifferences(
          form.settleStatus,
          form.platform,
          form.status,
          form.businessDate,
          form.businessDateEnd,
          form.orderType,
          form.remarks,
          form.settleDate,
        ).then(res=>{
          this.$store.dispatch('loadDisabled',false);
          if(res.data.status === '200') {
            this.$message.success(res.data.msg);
            this.$store.dispatch('dialogFromDifferences');
            this.getTransData();
            this.getPagination();
          }else{
            this.$message.error('批量差异对账失败');
          }
        })
      },
      transDeletes(form) {
        transDeletes(
          form.settleStatus,
          form.platform,
          form.status,
          form.businessDate,
          form.businessDateEnd,
          form.orderType,
        ).then(res=>{
          this.$store.dispatch('loadDisabled',false);
          if(res.data.status === 200) {
            this.$store.dispatch('dialogFromDelete');
            this.$message.success(res.data.obj.success);
          }else {
            this.$message.error('批量删除失败');
          }
        })
      },
      //数格式转换
      formatTime(row) { //转换时间
        if(row.transTime){
          return row.transTime.split('T')[0];
        }
      },
      clearDate(row) {
        if(row.clearDate){
          return row.clearDate.split('T')[0];
        }
      },
      formatBusinessType(row) {
        return (row.businessType === 'Collection' && '收入') ||
          (row.businessType === 'Refund' && '支出') ||
          (row.businessType === 'ServiceCharge' && '服务费');
      },
      //交易类型
      transTypeStatus(row) {
        return (row.transType === 'OrderGather' && '订单收款') ||
          (row.transType === 'OrderRefund' && '订单退款') ||
          (row.transType === 'ServiceCharge' && '手续费支出') ||
          (row.transType === 'ServiceChargeRefund' && '退手续费') ||
          row.transType;
      },
      formatStatus(row) { //单据状态
        return (row.status === 'Save' && '保存') ||
          (row.status === 'Audited' && '审核') ||
          (row.status === 'HandClose' && '手工关闭') ||
          (row.status === 'AutoClose' && '自动关闭');
      },
      formatSettleStatus(row) { //对账状态
        return (row.reconStatus === "UnSettled" && '未对账') ||
          (row.reconStatus === "Part" && '部分对账') ||
          (row.reconStatus === 'Completely' && '完全对账')||
          (row.reconStatus === 'Exception' && '异常')
          ;
      },
      formatDifferenceProcessingStatus(row) { //差异处理状态
        return (row.differenceProcessingStatus === "Y" && '是') ||
          (row.differenceProcessingStatus === "N" && '否');
      },
      formatReconStatus(row) { //退款状态
        return (row.reconStatus === 'UnSettled' && '未退款') ||
          (row.reconStatus === 'Part' && '部分退款') ||
          (row.reconStatus === 'Completely' && '完全退款')||
          (row.reconStatus === 'RefundException' && '退款异常')
          ;
      },
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
