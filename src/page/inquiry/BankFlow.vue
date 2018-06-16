<template>
    <div class="hello">
      <div class="head_search">
        <h3 class="head_title">银行流水</h3>
        <search @bankFlow="fliterbankFlow"></search>
        <singleDifferences :selectData="handSelectDataList" @reqMethod="bankSingleDif"></singleDifferences>
      </div>
      <div class="container">
        <template>
          <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <!--按钮-->
            <el-row>
              <dropDown>
                <template slot="nameOne">导入</template>
                <template slot="nameTwo">导出</template>
              </dropDown>
              <el-btn  @reqParent="request">审核</el-btn>
              <el-btn  @reqParent="request">反审核</el-btn>
              <el-btn  @reqParent="request">差异对账</el-btn>
              <el-btn @reqParent="request">删除</el-btn>
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
                  prop="transTime"
                  label="交易日期"
                  width="100"
                  :formatter="formatTime">
                </el-table-column>
                 <el-table-column
                  prop="creditAmount"
                  label="收入"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="debitAmount"
                  label="支出"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="单据状态"
                  width="100"
                  :formatter="formatStatus">
                </el-table-column>
                <el-table-column
                  prop="settleStatus"
                  label="对账状态"
                  width="110"
                  :formatter="formatSettleStatus">
                </el-table-column>
                <el-table-column
                  prop="settledAmount"
                  label="已对账金额"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="unSettledAmount"
                  label="未对账金额"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="differenceProcessingStatus"
                  label="差异处理状态"
                  width="130"
                  :formatter="formatDifferenceProcessingStatus">
                </el-table-column>
                <el-table-column
                  prop="differenceProcessingAmount"
                  label="差异处理金额"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="differenceProcessingRamarks"
                  label="差异处理原因"
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="transRamarks"
                  label="摘要"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="bankName"
                  label="银行名称"
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="bankAccount"
                  label="银行账号"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="ropDepositBankName"
                  label="对方银行名称"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="ropAccount"
                  label="对方银行账号 "
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="ropName"
                  label="对方银行账户名"
                  width="140">
                </el-table-column>
              </el-table>
            </template>
          </el-tabs>
        </template>

      </div>
      <template>
       <div class="block" v-show="pagination">
            <el-pagination @size-change="handleSizeChangeOrder" @current-change="handleCurrentChangeOrder" :current-page="business.selectPageNumber" :page-sizes="[100, 200, 500, 1000,20000]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="business.total">
            </el-pagination>
        </div>
      </template>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {bankStatementAjax,bankStatementPage,Method,singleDif,bankFlowAjax,bankFlowPage
  } from '../../axios/api'
  import search from '../../components/search/Search'
  import singleDifferences from '../../components/filterBox/singleDifferences'
  import dropDown from '../../components/btnList/dropDown'
  import button from '../../components/btnList/button'

  export default {
    name: 'HelloWorld',
    components:{
      search,//高级搜索
      singleDifferences,//差异对账
      dropDown,
      'el-btn': button,
    },
    data () {
      return {
        loading: true,
        diffName: 'bankFlowing',
        activeName: 'UnSettled,Part,Completely,Exception',
        getLocalDataList:[],//请求的数据
        handSelectDataList:[],//选中的数据
        pagination:true,  //分页显示
        btnInfo:[],
        message: '',
        currentPage4: 4,
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
      this.getLocalData();
      this.getPagination();
    },
    methods:{
      //高级查询
      fliterbankFlow(value){
        console.log(value)
        this.valueData = value;
        this.loading = true;
        //查询
        bankFlowAjax(value).then(res=>{
          this.getLocalDataList = res.data.obj;
          this.loading = false;
        })
        //分页
        bankFlowPage(value).then(res=>{
          this.business.total = res.data.obj[0].total;
          this.loading = false;
        })
      },

      demandonLoad(){
        //查询
        var value = this.valueData;
        this.loading = true;
        bankFlowAjax(value).then(res=>{
          this.getLocalDataList = res.data.obj;
          this.loading = false;
        })
        //分页
        bankFlowPage(value).then(res=>{
          this.business.total = res.data.obj[0].total;
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
        //流水
        bankStatementAjax(
          this.business.platformName,
          this.business.pageNumber,
          this.business.pageSize,
          this.business.reconStatus
        ).then(res=>{
        if(res.data.status === '200'){
          this.getLocalDataList = res.data.obj;
          this.loading = false;
        }
      })
      },
      getPagination() {
        //分页
        bankStatementPage(
          this.business.platformName,
          this.business.pageNumber,
          this.business.pageSize,
          this.business.reconStatus
        ).then(res=>{
          if(res.data.status === '200'){
            this.business.total = res.data.obj[0].total;
            this.loading = false;
          }
        })
      },
       handleSizeChangeOrder(val) {
         console.log(this.valueData);

         if(this.valueData == ''){
           this.business.pageSize = val;
         }else{
           this.valueData[0].pageSize = val;
         }
         this.pageOnclick()
      //选择条数
//      this.Order.pageSize = val;
//      this.loading = true;
//      this.getLocalData();
    },
    handleCurrentChangeOrder(val) {
      if(this.valueData == ''){
        this.business.pageNumber = val;
      }else{
        this.valueData[0].pageNumber = val;
      }
      // this.getLocalData();
      this.pageOnclick()
      //选中页码
//      this.Order.selectPageNumber = val;
//      this.Order.pageNumber = val;
//      this.loading = true;
//      this.getLocalData();
    },
      handleClick() {
        this.loading = true;
        this.business.reconStatus = this.activeName;
        this.getLocalData();
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
      bankSingleDif(dataMore) {
        singleDif(this.diffName,dataMore).then(res => {
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
          console.log(value.status);
          if(value.status === status.status) {
            arr.push(value.uuid);
          }
        });
        return arr;
      },
      request(str) {
        let name = 'bankFlowing';
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
      // //数格式转换
        formatTime(row) { //转换时间
          if(row.businessDate || row.clearDate){
            let time = row.clearDate || row.businessDate;
            return time.split('T')[0];
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
            (row.reconStatus === 'Completely' && '完全对账');
        },
        formatDifferenceProcessingStatus(row) { //差异处理状态
            return (row.differenceProcessingStatus === "Y" && '是') ||
            (row.differenceProcessingStatus === "N" && '否');
        },
        formatReconStatus(row) { //退款状态
            return (row.reconStatus === 'UnSettled' && '未退款') ||
            (row.reconStatus === 'Part' && '部分退款') ||
            (row.reconStatus === 'Completely' && '完全退款');
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
