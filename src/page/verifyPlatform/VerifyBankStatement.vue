<template>
    <div class="hello">
      <div class="head_search">
        <h3 class="head_title">银行对账</h3>
      </div>
      <template>
        <!-- <el-row style="float:left;">
          <el-button size="mini" type="primary" @click="isRefundCilitaion" :disabled="isRefundCilitaionStatus">收款对账</el-button>
          <el-button size="mini" type="primary" @click="isRefundCilitaion" :disabled="!isRefundCilitaionStatus">退款对账</el-button>
        </el-row> -->
      </template>
      <div style="clear:both;">
        <div class="head_search">
          <h3 class="head_title">系统对账单</h3>
          <search @systemSearch="systemFliter"></search>
        </div>
          <template>
                <el-table
                  border
                  ref="orderTable"
                  :data="orderDataList"
                  v-loading="loading"
                  highlight-current-row
                  max-height="250"
                  tooltip-effect="dark"
                  @row-click="rowClickOrder"
                  @selection-change="handleSelectionPayment"
                  @select-all="handleSelectionPaymentAll">
                  <el-table-column
                      width="60"
                      type="selection">
                  </el-table-column>
                  <el-table-column
                        label="本次对账金额"
                        width="120">
                    <template slot-scope="scope">
                        <el-button class="elInput"  v-if="scope.row.checked" size="mini" @click.native.prevent="handleEdit(scope.row,scope.$index,'system')">{{settleSettlementPlatformMap[scope.$index].settleAmount}}</el-button>
                        <el-input v-if="scope.row.showInput" placeholder="请输入金额" size="mini " @change="reviseVal( scope.row,$event,scope.$index,'system')" :value="dataList.settleSettlementPlatformMap[scope.$index].settleAmount"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="billNo" label="单据编号" width="200">
                  </el-table-column>
                  <el-table-column prop="settleAmount" label="已对账金额" width="100">
                  </el-table-column>
                  <el-table-column prop="unsettleAmount" label="未对账金额" width="100">
                  </el-table-column>
                  <el-table-column prop="settleTotalAmount" label="结算金额" width="100">
                  </el-table-column>
                  <el-table-column prop="reconStatus" label="对账状态" :formatter="formatSettleStatus" width="100">
                  </el-table-column>
                  <el-table-column prop="payChannelManageName" label="支付渠道" width="120">
                  </el-table-column>
                  <el-table-column prop="payChannelName" label="支付渠道类型" width="120">
                  </el-table-column>
                  <el-table-column prop="differenceProcessingStatus" label="差异处理状态" :formatter="formatDifferenceProcessingStatus" width="120">
                  </el-table-column>
                  <el-table-column prop="differenceProcessingAmount" label="差异处理金额" width="140">
                  </el-table-column>
                  <el-table-column prop="differenceProcessingRamarks" label="差异处理原因" width="140">
                  </el-table-column>
                  <el-table-column prop="transTotalAmount" label="交易金额" width="100">
                  </el-table-column>
                  <el-table-column prop="transTotalCharge" label="交易手续费" width="100">
                  </el-table-column>
                  <el-table-column prop="transTotalNum" label="结算记录数" width="150">
                  </el-table-column>
                </el-table>
              </template>
        </div>
      <template>
       <div class="block" v-show="pagination">
            <el-pagination @size-change="handleSizeChangeOrder" @current-change="handleCurrentChangeOrder" :current-page="Order.selectPageNumber" :page-sizes="[100, 200, 500, 1000,1500]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="Order.total">
            </el-pagination>
        </div>
      </template>
      <div>
        <div class="head_search">
          <h3 class="head_title">银行对账单</h3>
          <searchBank @bankRecon="bankSearch"></searchBank>
        </div>
        <template>
          <el-table
          ref="bankTable"
          border
          highlight-current-row
          :data="getDataList"
          v-loading="loadings"
          height="250"
          tooltip-effect="dark"
          @row-click="rowClickBank"
          @selection-change="handleSelectionBank"
          @select-all="handleSelectionBankAll">
      <el-table-column
              type="selection"
              width="60">
      </el-table-column>
      <el-table-column
            label="本次对账金额"
            width="120">
        <template slot-scope="scope" >
            <el-button class="elInput"  v-if="scope.row.checked" size="mini" @click.native.prevent="handleEdit(scope.row,scope.$index,'bank')">{{settleBankFlowingMap[scope.$index].settleAmount}}</el-button>
            <el-input v-if="scope.row.showInput" placeholder="请输入金额" size="mini " v-model="dataList.settleBankFlowingMap[scope.$index].settledAmount" @change="reviseVal(scope.row,$event,scope.$index,'bank')"></el-input>
        </template>
      </el-table-column>
            <el-table-column prop="billNo" label="单据编号" width="200">
            </el-table-column>
            <el-table-column prop="settledAmount" label="已对账金额" width="100">
            </el-table-column>
            <el-table-column prop="unSettledAmount" label="未对账金额" width="100">
            </el-table-column>
            <el-table-column prop="settleTotalAmount" label="结算金额" width="100">
            </el-table-column>
            <el-table-column prop="settleStatus" label="对账状态" :formatter="banksStatus" width="100">
            </el-table-column>
            <el-table-column prop="differenceProcessingStatus" label="差异处理状态" :formatter="formatDifferenceProcessingStatus" width="110">
            </el-table-column>
            <el-table-column prop="differenceProcessingAmount" label="差异处理金额" width="110">
            </el-table-column>
            <el-table-column prop="differenceProcessingRamarks" label="差异处理原因" width="130">
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="block">
          <el-pagination @size-change="handleSizeChangeBank" @current-change="handleCurrentChangeBank" :current-page="stream.selectPageNumber" :page-sizes="[100, 200, 500, 1000,1500]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="stream.total">
          </el-pagination>
      </div>
      <el-row style="text-align:center">
        <el-button type="primary" size="small" @click="checks">对账</el-button>
      </el-row>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {initRules,statement,statementPageAjax,getOrderPlans,bankAjax,bankPageAjax,autobank,systemStatementAjax,systemStatementPage,bankFlowAjax,bankFlowPage} from '../../axios/api'
  import search from '../../components/search/Search'
  import searchBank from '../../components/search/autosearch/searchBank'
  import batchAudit from '../../components/filterBox/batchAudit'
  import batchUnAudit from '../../components/filterBox/batchUnAudit'
  import batchDifferences from '../../components/filterBox/batchDifferences'
  import batchDelete from '../../components/filterBox/batchDelete'
  export default {
    name: 'HelloWorld',
    components:{
      search,//高级搜索,
      searchBank,//银行查询
      batchAudit,//批量审核框
      batchUnAudit,//批量反审核框
      batchDifferences,//批量差异对帐
      batchDelete,//批量删除
    },
    data () {
      return {
        loading: true,
        loadings:true,
        activeName: 'Whole',
        getLocalDataList:[],//请求的数据
        handSelectDataList:[],//选中的数据
        pagination:true,  //分页显示
        btnInfo:[],
        message: '',
        currentPage4: 4,


        ruleList:[], //对账规则
        ruleValue: '', //对账规则值
        ruleShow: false,
        //对账规则匹配input框
        checkDate: false,
        checkMoney: false,
        textMoney: '',
        textDate: '',
        paymentDetail: [],
        selectPay: '',
        streamDetail: '',
        isSelectedAll: false, //是否全选
        settleAmount: [], //保存输入的本次对账金额和对应id
        dataList: { settleSettlementPlatformMap: {}, settleBankFlowingMap: {} },
        settleSettlementPlatformMap: [],
        settleBankFlowingMap: [],
        ind: 0, //交易流水点击金额修改时保存对应的下标
        getDataList: [], //获取的交易流水数据
        orderDataList: [],
        isSelectedOwn: false,
        stream: { //交易流水
            companyOwning: '',
            pageNumber: 1,
            pageSize: 100,
            selectPageNumber: 0,
            // reconStatus: 'UnSettled,Part',
            settleStatus: 'UnSettled,Part',
            status: 'Audited',
            total: 0,
            selectPageNumbers: 0,
        },
        //退款点击input
        showInput: true,
        Order: { //订单应收
            companyOwning: '',
            pageNumber: 1,
            pageSize: 100,
            selectPageNumber: 0,
            reconStatus: "UnSettled,Part",
            status: 'Audited',
            total: 0,
            selectPageNumbers: 0,
        },
        selectedOrder: Number,
        isRefundCilitaionType: 'collect', //收退款对账 collect收 retreat退
        // isRefundCilitaionStatus: true,
        drawback: { //收退款对账状态
            settleAmount: 'settleAmount',
            unsettleAmount: 'unsettleAmount',
            setName: '已对账金额',
            unSetName: '未对账金额',
            reviseName: '本次对账金额'
        },
        valueData:[],
        valueData1:[],

      }
    },
    computed: {
      ...mapState({
        verifyStatus:store=>store.verifyStatus
      })
    },
    mounted(){
      // this.getLocalData()
      this.beforeInit()
      this.OrderIncome();
      this.streamLoad();
    },
    methods:{
/******************************************************************高级查询*********************************************************************/
 systemFliter(value){
         console.log(value)
        this.valueData = value;
        this.loading = true;
        //查询
        systemStatementAjax(value).then(res=>{
          this.orderDataList = res.data.obj;
          this.loading = false;
        })
        //分页
        systemStatementPage(value).then(res=>{
            this.Order.total = res.data.obj[0].total;
            this.loading = false;
        })
      },
      systemOnLoad(){
         //查询
         var value = this.valueData;
         this.loading = true;
        systemStatementAjax(value).then(res=>{
          this.orderDataList = res.data.obj;
          this.loading = false;
        })
        //分页
        systemStatementPage(value).then(res=>{
            this.Order.total = res.data.obj[0].total;
            this.loading = false;
        })
      },
      systemPage(){
        if(this.valueData == ''){
          this.OrderIncome();
        }else{
          this.systemOnLoad();
        }
      },
      //银行对账单
      bankSearch(value){
          console.log(value)
        this.valueData1 = value;
        this.loading = true;
        //查询
        bankFlowAjax(value).then(res=>{
          this.getDataList = res.data.obj;
          this.loading = false;
        })
        //分页
        bankFlowPage(value).then(res=>{
            this.stream.total = res.data.obj[0].total;
            this.loading = false;
        })
      },
      bankOnload(){
          //查询
         var value = this.valueData1;
         this.loading = true;
        bankFlowAjax(value).then(res=>{
          this.getDataList = res.data.obj;
          this.loading = false;
        })
        //分页
        bankFlowPage(value).then(res=>{
            this.stream.total = res.data.obj[0].total;
            this.loading = false;
        })
      },
      bankPage(){
        if(this.valueData1 == ''){
          this.streamLoad()
        }else{
          this.bankOnload();
        }
      },

/******************************************************************高级查询*********************************************************************/
      //订单规则
      beforeInit(){
        initRules().then(res=>{
          if (res.data.obj) {
              this.ruleList = res.data.obj;
          }
        })
      },

  /*请求数据*/
  //订单
  OrderIncome:function(){
    //数据
    statement(
      this.Order.pageNumber,
      this.Order.pageSize,
      this.Order.reconStatus,
      this.Order.status
    ).then(res=>{
      if(res.data.obj){
        this.settleSettlementPlatformMap = [];
        this.orderDataList = res.data.obj;
        res.data.obj.forEach((value, index) => {
            this.settleSettlementPlatformMap.push({ 'uuid': value.uuid, 'settleAmount': value.unsettleAmount });
        });
      }
    })
    this.loading = false;
    //分页
    statementPageAjax(
      this.Order.pageNumber,
      this.Order.pageSize,
      this.Order.reconStatus,
      this.Order.status
    ).then(res=>{
      if(res.data.obj){
        this.Order.total = res.data.obj[0].total;
      }
    })
  },
  //流水查询
  streamLoad:function(){
    //数据
    bankAjax(
      this.stream.pageNumber,
      this.stream.pageSize,
      this.stream.settleStatus,
      this.stream.status
    ).then(res=>{
      if(res.data.obj){
        this.settleBankFlowingMap = [];
        this.getDataList = res.data.obj;
        res.data.obj.forEach((value, index) => {
            // value.transTime = FormatDate(value.transTime);
            this.settleBankFlowingMap.push({ 'uuid': value.uuid, 'settleAmount': value.unSettledAmount });

        });
      }
    })
    this.loadings = false;
    //分页
    bankPageAjax(
      this.stream.pageNumber,
      this.stream.pageSize,
      this.stream.settleStatus,
      this.stream.status
    ).then(res=>{
      if(res.data.obj){
        this.stream.total = res.data.obj[0].total;
      }
    })
  },
  rowClickOrder(row, event) { //订单应收点击行数据
    if (event.target.nodeName === 'DIV' || event.target.nodeName === 'TD') {
          var newId = row.uuid;
          if (row) {
              this.orderDataList.forEach((value) => {
                  if (value.uuid === newId) {
                      console.log(value.unsettleAmount);
                      this.$refs.orderTable.toggleRowSelection(row);
                      value.showInput = false;
                  }
              });
          }
      }
    },
    rowClickBank(row, event) {//流水点击
        if (event.target.nodeName === 'DIV' || event.target.nodeName === 'TD') {
            var newId = row.uuid;
            if (row) {
                this.getDataList.forEach((value) => {
                    if (value.uuid === newId) {
                        this.$refs.bankTable.toggleRowSelection(row);
                        value.showInput = false;
                    }
                });
            }
        }
    },
    handleSelectionPayment(val) { //订单应收子表点击事件
     this.dataList.settleSettlementPlatformMap = {};
            if (val.length === 0) {
                this.orderDataList.forEach((value, index) => {
                    if (typeof value.checked === 'undefined') {
                        this.$set(value, 'checked', false);
                        this.$set(value, 'showInput', false);
                    } else {
                        value.checked = false;
                        value.showInput = false
                    }
                })
            }
            if (val.length > 0) {
                this.settleSettlementPlatformMap.forEach((value, index) => {
                    val.forEach((val, ind) => {
                        if (value.uuid === val.uuid) {
                            this.dataList.settleSettlementPlatformMap[index] = { 'uuid': value.uuid, 'settleAmount': value.settleAmount };
                            if (typeof val.checked === 'undefined') {
                                this.$set(val, 'checked', true);
                            } else {
                                if (val.showInput) {
                                    val.checked = false;
                                } else {
                                    val.checked = true;
                                }
                            }
                        }
                    })
                });
                this.orderDataList.forEach((value, index) => {
                    if (val.indexOf(value) === -1) {
                        if (typeof value.checked === 'undefined') {
                            this.$set(value, 'checked', false);
                        } else {
                            value.checked = false
                        }
                    }
                });

            }
    },
    handleSelectionBank(val) { //交易流水点击事件
        this.dataList.settleBankFlowingMap = {};
        if (val.length === 0) {
            this.getDataList.forEach((value, index) => {
                if (typeof value.checked === 'undefined') {
                    this.$set(value, 'checked', false);
                    this.$set(value, 'showInput', false);
                } else {
                    value.checked = false;
                    value.showInput = false
                }
            })
        }
        if (val.length > 0) {
            this.settleBankFlowingMap.forEach((value, index) => {
                val.forEach((val, ind) => {
                    if (value.uuid === val.uuid) {
                        this.dataList.settleBankFlowingMap[index] = { 'uuid': value.uuid, 'settledAmount': value.settleAmount };
                        if (typeof val.checked === 'undefined') {
                            this.$set(val, 'checked', true);
                        } else {
                            if (val.showInput) {
                                val.checked = false;
                            } else {
                                val.checked = true;
                            }
                        }
                    }
                })

            });
            this.getDataList.forEach((value, index) => {
                if (val.indexOf(value) === -1) {
                    if (typeof value.checked === 'undefined') {
                        this.$set(value, 'checked', false);
                    } else {
                        value.checked = false
                    }
                }
            });
        }
    },
    handleSelectionPaymentAll() {//订单
      this.orderDataList.forEach((value, index) => {
          if (typeof value.checked === 'undefined') {
              this.$set(value, 'checked', true);
          }
          this.dataList.settleSettlementPlatformMap[index] = { 'uuid': value.uuid, 'settleAmount': value.unsettleAmount };
      })
    },
    handleSelectionBankAll() { //流水
        this.getDataList.forEach((value, index) => {
            if (typeof value.checked === 'undefined') {
                this.$set(value, 'checked', true);
            }
            this.dataList.settleBankFlowingMap[index] = { 'uuid': value.uuid, 'settledAmount': value.unSettledAmount };
        })
    },
    handleEdit(row, index, str) { //show input box
      if (typeof row.showInput === 'undefined') {
          this.$set(row, 'showInput', true);
          row.checked = !row.checked;
      } else {
          row.showInput = true;
          row.checked = !row.checked;
      }
    },
    reviseVal(row, $event, index, type) { //修改本次对账金额
      var boolean = true,
      regular = $event.replace(/[^\d]/g, ''),
      unsettleAmount = null;
      if (type === 'system') {
          unsettleAmount = row.unsettleAmount
      } else {
          unsettleAmount = row.unSettledAmount
      }
      if ($event > unsettleAmount || !regular) {
          boolean = false;
      }
      if (boolean) {
          if (type === 'system') {
              this.settleSettlementPlatformMap[index].settleAmount = $event;
              this.dataList.settleSettlementPlatformMap[index].settleAmount = $event;
          } else {
              this.settleBankFlowingMap[index].settleAmount = $event;
              this.dataList.settleBankFlowingMap[index].settledAmount = $event;
          }
          row.checked = !row.checked;
          row.showInput = !row.showInput
      } else {
          // this.moneyMsg()
      }

    },
    moneyMsg() { //输入金额提示
      this.$message({
          showClose: true,
          message: '只能输入小于未对账金额的数字',
          type: 'warning'
      });
    },

    //对账
    checks: function() {
            this.receiveRetreatMoney();
    },
    //对账接口
    receiveRetreatMoney(){
      var systemArr = Object.keys(this.dataList.settleSettlementPlatformMap);
      var bankArr = Object.keys(this.dataList.settleBankFlowingMap);
      systemArr.forEach((value, index) => {
          this.dataList.settleSettlementPlatformMap[index] = this.dataList.settleSettlementPlatformMap[value];
          if (value > systemArr.length) {
              delete this.dataList.settleSettlementPlatformMap[value]
          }
      });
      bankArr.forEach((value, index) => {
          this.dataList.settleBankFlowingMap[index] = this.dataList.settleBankFlowingMap[value];
          if (value > bankArr.length) {
              delete this.dataList.settleBankFlowingMap[value]
          }
      })
      autobank(this.dataList).then(res=>{
        if (res.data.status === '200') {
          this.$message({message:res.data.msg  || "请求成功!",type: 'success',center:true});
                this.OrderIncome();
                this.streamLoad();
        } else {
          this.$message.error({message:res.data.msg  || "系统异常!",center:true});
        }
      })
    },

    handleSizeChangeOrder(val) { //选择条数
      if(this.valueData == ''){
        this.Order.pageSize = val;
      }else{
        this.valueData[0].pageSize = val;
      }

      this.systemPage()
    },
    handleCurrentChangeOrder(val) { //选中页码
        if(this.valueData ==''){
          this.Order.selectPageNumber = val;
          this.Order.pageNumber = val;
        }else{
          this.valueData[0].selectPageNumber = val;
          this.valueData[0].pageNumber = val;
        }
        this.systemPage()
    },
    handleSizeChangeBank(val) { //流水
        if(this.valueData1 == ''){
          this.stream.pageSize = val;
        }else{
          this.valueData1[0].pageSize = val;
        }
        this.bankPage();
        // this.streamLoad()
    },
    handleCurrentChangeBank(val) { //流水
        if(this.valueData1 ==''){
          this.stream.selectPageNumber = val;
          this.stream.pageNumber = val;
        }else{
          this.valueData1[0].selectPageNumber = val;
          this.valueData1[0].pageNumber = val;
        }
        this.bankPage()
    },
      //Duff装置
      duff(rows){
        console.log(rows);
        let iterations = Math.floor(rows.length /8);
        let leftover  = rows.length % 8;
        let i = 0;
        if(leftover > 0) {
          do {
            this.process(rows[i++]);
          }while(--leftover > 0);
        }
        do {
          this.process(rows[i++]);
          this.process(rows[i++]);
          this.process(rows[i++]);
          this.process(rows[i++]);
          this.process(rows[i++]);
          this.process(rows[i++]);
          this.process(rows[i++]);
          this.process(rows[i++]);
        }while(--iterations > 0);
      },
      process(row) {
        if(row.status === 'Audited'){
          row.status = 'Save'
        }
      },

        // clearTime(row) { //转换时间
        //   if(row){
        //     return (row.clearDate.split('T')[0]) || row.clearDate;
        //   }
        // },
        // transshi(row){
        //   if(row){
        //     return row.transTime.split('T')[0];
        //   }
        // },
        formatbyTypes(row) { //状态
            return (row.businessType === 'Collection' && '收入') || (row.businessType === 'Refund' && '支出');
        },
        formatStatus(row) { //单据状态
            return (row.status === 'Save' && '保存') || (row.status === 'Audited' && '审核');
        },
        formatSettleStatus(row) { //对账状态
            return (row.reconStatus === "UnSettled" && '未对账') || (row.reconStatus === "Part" && '部分对账') || (row.reconStatus === 'Completely' && '完全对账');
        },
        banksStatus(row) { //银行对账状态
            return (row.settleStatus === "UnSettled" && '未对账') || (row.settleStatus === "Part" && '部分对账') || (row.settleStatus === 'Completely' && '完全对账');
        },
        formatDifferenceProcessingStatus(row) { //差异处理状态
            return (row.differenceProcessingStatus === "Y" && '是') || (row.differenceProcessingStatus === "N" && '否');
        },
        formatReconStatus(row) { //退款状态
            return row.reconStatus = (row.reconStatus === 'UnSettled' && '未退款') || (row.reconStatus === 'Part' && '部分退款') || (row.reconStatus === 'Completely' && '完全退款')
        },

         //交易类型
        transTypeStatus(row) {
            return (row.transType === 'OrderGather' && '订单收款') || (row.transType === 'OrderRefund' && '订单退款') || (row.transType === 'ServiceCharge' && '手续费支出') || row.transType;
        },

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
  .head_title{
    margin: 8px 8px 8px 0;
  }
  .elInput{
    background: #f6f6f630;
    border: 1px solid transparent;
  }
</style>

