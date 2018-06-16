<template>
    <div class="hello">
      <div class="head_search">
        <h3 class="head_title">收款手动对账</h3>
      </div>
      <template>
        <el-form >
      <!--    <el-form-item label="对账规则:" style="float:left;width:225px;">
            <el-select style="width:140px;" size="mini" v-model="ruleValue" multiple collapse-tags placeholder="请选择">
              <el-option
                v-for="item in ruleList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="对账日期:" style="float:left;width:225px;">
            <el-date-picker
              style="width:140px;"
              size="small"
            v-model="dataList.settleDate"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <el-row style="float:left;">
          <el-button size="mini" type="primary" @click="isRefundCilitaion" :disabled="isRefundCilitaionStatus">收款对账</el-button>
          <el-button size="mini" type="primary" @click="isRefundCilitaion" :disabled="!isRefundCilitaionStatus">退款对账</el-button>
        </el-row>
      </template>
      <div style="clear:both;">
        <div class="head_search">
          <h3 class="head_title">订单应收</h3>
          <searchOrder @reconSearch="fliterRecon"></searchOrder>
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
                  @row-click="rowClickOrder">
                  <el-table-column
                          type="index"
                          label="序号"
                          width="60">
                  </el-table-column>
                  <el-table-column
                          prop="billNo"
                          label="单据编号"
                          width="180">
                  </el-table-column>
                  <el-table-column
                          prop="orderNo"
                          label="平台订单号"
                          width="180">
                  </el-table-column>
                  <el-table-column
                          :prop="drawback.settleAmount"
                          :label="drawback.setName">
                  </el-table-column>
                  <el-table-column
                          :prop="drawback.unsettleAmount"
                          :label="drawback.unSetName">
                  </el-table-column>
                  <el-table-column
                          prop="totalAmount"
                          label="订单总金额">
                  </el-table-column>
                  <el-table-column
                          prop="platformManageName"
                          label="平台"
                          width="120">
                  </el-table-column>
                  <el-table-column
                          prop="platformName"
                          label="平台类型"
                          width="120">
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

    <template v-if="isRefundCilitaionStatus">
        <el-table
            border
            ref="paymentTable"
            :data="paymentDetail"
            highlight-current-row
            max-height="160"
            style="margin-top: 10px"
            tooltip-effect="dark"
            @row-click="rowClickPayment"
            @selection-change="handleSelectionPayment"
            @select-all="handleSelectionPaymentAll">
          <el-table-column
                  type="selection"
                  width="60">
          </el-table-column>
          <el-table-column
            width="120"
            label="本次对账金额">
		        <template slot-scope="scope">
		            <el-button class="elInput" v-if="scope.row.checked" size="mini" @click.native.prevent="handleEdit(scope.row,scope.$index,'system')">{{settleReconciliationPlanMap[scope.$index].settleAmount}}</el-button>
		            <el-input v-if="scope.row.showInput" placeholder="请输入金额" size="mini " @change="reviseVal( scope.row,$event,scope.$index,'system')" :value="dataList.settleReconciliationPlanMap[scope.$index].settleAmount"></el-input>
		        </template>
            </el-table-column>
            <el-table-column prop="billNo" label="单据编号" width="200">
            </el-table-column>
            <el-table-column prop="settleAmount" label="已对账金额">
            </el-table-column>
            <el-table-column prop="unsettleAmount" label="未对账金额">
            </el-table-column>
            <el-table-column prop="money" label="订单总金额">
            </el-table-column>
    	</el-table>
    </template>
    <template v-if="!isRefundCilitaionStatus">
        <el-table
          border
          ref="paymentTable"
          :data="paymentDetail"
          highlight-current-row
          max-height="160"
          style="margin-top: 10px"
          tooltip-effect="dark"
          @row-click="rowClickPayment"
          @selection-change="handleSelectionPayment"
          @select-all="handleSelectionPaymentAll">
        <el-table-column
                type="selection"
                width="60">
        </el-table-column>
        <el-table-column
                width="120"
                label="本次退款金额">
        <template slot-scope="scope">
            <el-button class="elInput" v-if="scope.row.checked" size="mini" @click.native.prevent="handleEdit(scope.row,scope.$index,'system')">{{settleReconciliationPlanMap[scope.$index].settleAmount}}</el-button>
            <el-input v-if="scope.row.showInput" placeholder="请输入金额" size="mini " @change="reviseVal( scope.row,$event,scope.$index,'system')" :value="dataList.settleReconciliationPlanMap[scope.$index].settleAmount"></el-input>
        </template>
        </el-table-column>
        <el-table-column prop="billNo" label="单据编号" width="200">
        </el-table-column>
        <el-table-column prop="settlementMoney" label="已退款金额">
        </el-table-column>
        <el-table-column prop="unsettlementMoney" label="未退款金额">
        </el-table-column>
        <el-table-column prop="money" label="退款总金额">
        </el-table-column>
        </el-table>
      </template>

      <div>
        <div class="head_search">
          <h3 class="head_title">交易流水</h3>
          <search @transSearch="transFliter"></search>
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
              :label="drawback.reviseName"
              width="120">
		        <template slot-scope="scope" >
		            <el-button class="elInput" v-if="scope.row.checked" size="mini" @click.native.prevent="handleEdit(scope.row,scope.$index,'bank')">{{settleTransactionMap[scope.$index].settleAmount}}</el-button>
		            <el-input v-if="scope.row.showInput" placeholder="请输入金额" size="mini " @change="reviseVal(scope.row,$event,scope.$index,'bank')" v-model="dataList.settleTransactionMap[scope.$index].settleAmount" ></el-input>
		        </template>
			  </el-table-column>
			  <el-table-column prop="billNo" label="单据编号" width="200">
			  </el-table-column>
			  <el-table-column prop="settleAmount" label="已对账金额" width="100">
			  </el-table-column>
			  <el-table-column prop="unSettleAmount" label="未对账金额" width="100">
			  </el-table-column>
			  <el-table-column prop="transAmount" label="交易金额" width="100">
			  </el-table-column>
			  <el-table-column prop="reconStatus" label="对账状态" width="80" :formatter="formatSettleStatus">
			  </el-table-column>
			  <el-table-column prop="payChannelManageName" label="支付渠道" width="120">
			  </el-table-column>
			  <el-table-column prop="payChannelName" label="支付渠道类型" width="120">
			  </el-table-column>
			  <el-table-column prop="orderNo" label="平台订单号" width="190">
			  </el-table-column>
			  <el-table-column prop="transTime" label="交易时间" width="100" :formatter="transshi">
			  </el-table-column>
			  <el-table-column prop="transType" label="交易类型" width="100" :formatter="transTypeStatus">
			  </el-table-column>
			  <el-table-column prop="businessType" label="业务类型" width="80" :formatter="formatbyTypes">
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
  import {initRules,receivingRecon,ReconPageAjax,getOrderPlans,receivingtransAjax,transPageAjax,autoMeney,orderSearchAjax,orderSearchPage,transactionFlowPage,transactionFlowAjax} from '../../axios/api'
  import search from '../../components/search/Search'
  import searchOrder from '../../components/search/autosearch/searchOrder'
  import batchAudit from '../../components/filterBox/batchAudit'
  import batchUnAudit from '../../components/filterBox/batchUnAudit'
  import batchDifferences from '../../components/filterBox/batchDifferences'
  import batchDelete from '../../components/filterBox/batchDelete'
  export default {
    name: 'HelloWorld',
    components:{
      search,//高级搜索
      searchOrder, //订单
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
        dataList: { 'orderUUID': '', 'settleDate': '', settleReconciliationPlanMap: {}, settleTransactionMap: {} },
        settleReconciliationPlanMap: [],
        settleTransactionMap: [],
        ind: 0, //交易流水点击金额修改时保存对应的下标
        getDataList: [], //获取的交易流水数据
        orderDataList: [],
        isSelectedOwn: false,
        stream: { //交易流水
            companyOwning: '',
            pageNumber: 1,
            pageSize: 100,
            selectPageNumber: 0,
            reconStatus: 'UnSettled,Part',
            businessType: 'Collection',
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
            settleStatus: 'UnSettled,Part',
            status: 'Audited',
            total: 0,
            selectPageNumbers: 0,
        },
        selectedOrder: Number,
        isRefundCilitaionType: 'collect', //收退款对账 collect收 retreat退
        isRefundCilitaionStatus: true,
        drawback: { //收退款对账状态
            settleAmount: 'settleAmount',
            unsettleAmount: 'unsettleAmount',
            setName: '已对账金额',
            unSetName: '未对账金额',
            reviseName: '本次对账金额'
        },
        valueData:[],
        valueData1:[],//流水
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
/************************************************************高级查询*************************************************************************/
      //对账订单高级查询
      fliterRecon(value){
         console.log(value)
        this.valueData = value;
        this.loading = true;
        //查询
        orderSearchAjax(value).then(res=>{
          this.orderDataList = res.data.obj;
          this.loading = false;
        })
        //分页
        orderSearchPage(value).then(res=>{
            this.Order.total = res.data.obj[0].total;
            this.loading = false;
        })
      },
      reconOnLoad(){
         //查询
         var value = this.valueData;
         this.loading = true;
        orderSearchAjax(value).then(res=>{
          this.orderDataList = res.data.obj;
          this.loading = false;
        })
        //分页
        orderSearchPage(value).then(res=>{
            this.Order.total = res.data.obj[0].total;
            this.loading = false;
        })
      },
      pageOnclick(){
        if(this.valueData == ''){
          this.OrderIncome();
        }else{
          this.reconOnLoad();
        }
      },
      //对账流水高级查询
      transFliter(value){
         console.log(value)
        this.valueData1 = value;
        this.loading = true;
        //查询
        transactionFlowAjax(value).then(res=>{
          this.getDataList = res.data.obj;
          this.loading = false;
        })
        //分页
        transactionFlowPage(value).then(res=>{
            this.stream.total = res.data.obj[0].total;
            this.loading = false;
        })
      },
      transtionOnLoad(){
         //查询
         var value = this.valueData1;
         this.loading = true;
        transactionFlowAjax(value).then(res=>{
          this.getDataList = res.data.obj;
          this.loading = false;
        })
        //分页
        transactionFlowPage(value).then(res=>{
            this.stream.total = res.data.obj[0].total;
            this.loading = false;
        })
      },
      transPage(){
        if(this.valueData1 == ''){
          this.streamLoad();
        }else{
          this.transtionOnLoad();
        }
      },
/************************************************************高级查询*************************************************************************/
      //订单规则
      beforeInit(){
        initRules().then(res=>{
          if (res.data.obj) {
              this.ruleList = res.data.obj;
          }
        })
      },
  isRefundCilitaion() {
        // collect收 retreat 退
        if (this.isRefundCilitaionType === 'collect') {
            this.Order.settleStatus = 'Completely,Part,Exception';
            this.stream.businessType = 'Refund';
            this.Order.settlementStatus = 'UnRefund,PartRefund';
            this.isRefundCilitaionStatus = !this.isRefundCilitaionStatus;
            this.buttonText = '收款对账';
            this.isRefundCilitaionType = 'retreat';
            this.drawback.settleAmount = 'settlementMoney';
            this.drawback.unsettleAmount = 'unsettlementMoney';
            this.drawback.setName = '已退款金额';
            this.drawback.unSetName = '未退款金额';
            this.drawback.reviseName = '本次退款金额';
            this.paymentDetail = [];
        } else {
            this.Order.settleStatus = 'UnSettled,Part';
            this.stream.businessType = 'Collection';
            this.isRefundCilitaionStatus = !this.isRefundCilitaionStatus;
            this.buttonText = '退款对账';
            this.isRefundCilitaionType = 'collect';
            this.drawback.settleAmount = 'settleAmount';
            this.drawback.unsettleAmount = 'unsettleAmount';
            this.drawback.setName = '已对账金额';
            this.drawback.unSetName = '未对账金额';
            this.drawback.reviseName = '本次对账金额';
            this.paymentDetail = [];
        }
        this.OrderIncome();
        this.streamLoad();
    },

  /*请求数据*/
  //订单
  OrderIncome:function(){
    //数据
    receivingRecon(
      this.Order.pageNumber,
      this.Order.pageSize,
      this.Order.settleStatus,
      this.Order.status,
      this.Order.settlementStatus
    ).then(res=>{
      if(res.data.obj){
        this.orderDataList = res.data.obj;
      }
    })
    this.loading = false;
    //分页
    ReconPageAjax(
      this.Order.pageNumber,
      this.Order.pageSize,
      this.Order.settleStatus,
      this.Order.status,
      this.Order.settlementStatus
    ).then(res=>{
      if(res.data.obj){
        this.Order.total = res.data.obj[0].total;
      }
    })
  },
  //流水查询
  streamLoad:function(){
    //数据
    receivingtransAjax(
      this.stream.pageNumber,
      this.stream.pageSize,
      this.stream.reconStatus,
      this.stream.status,
      this.stream.businessType
    ).then(res=>{
      if(res.data.obj){
        this.settleTransactionMap = [];
        this.getDataList = res.data.obj;
        for (var i = 0; i < res.data.obj.length; i++) {
            this.settleTransactionMap.push({ 'uuid': res.data.obj[i].uuid, 'settleAmount': res.data.obj[i].unSettleAmount })
        }
      }
    })
    this.loadings = false;
    //分页
    transPageAjax(
      this.stream.pageNumber,
      this.stream.pageSize,
      this.stream.reconStatus,
      this.stream.status,
      this.stream.businessType
    ).then(res=>{
      if(res.data.obj){
        this.stream.total = res.data.obj[0].total;
      }
    })
  },
  rowClickOrder(row, event) { //订单应收点击行选中加载子表数据
        var _this = this,
            newId = row.uuid;
        this.dataList.orderUUID = newId;
        if (row) {
          getOrderPlans(newId).then(res=>{
            if (res.data.obj) {
                this.settleReconciliationPlanMap = [];
                this.paymentDetail = res.data.obj;
                if (this.isRefundCilitaionType === 'collect') {
                    res.data.obj.forEach((value, index) => {
                        this.settleReconciliationPlanMap.push({ 'uuid': value.uuid, 'settleAmount': value.unsettleAmount });
                    });
                } else {
                    res.data.obj.forEach((value, index) => {
                        this.settleReconciliationPlanMap.push({ 'uuid': value.uuid, 'settleAmount': value.unsettlementMoney });
                    });
                }

              }
          })

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
        this.dataList.settleReconciliationPlanMap = {};
        if (val.length === 0) {
            this.paymentDetail.forEach((value, index) => {
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
            this.settleReconciliationPlanMap.forEach((value, index) => {
                val.forEach((val, ind) => {
                    if (val.uuid === value.uuid) {
                        this.dataList.settleReconciliationPlanMap[index] = { planId: value.uuid, 'settleAmount': value.settleAmount };
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
            })
            this.paymentDetail.forEach((value, index) => {
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
        this.dataList.settleTransactionMap = {};
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
            this.settleTransactionMap.forEach((value, index) => {
                val.forEach((val, ind) => {
                    if (val.uuid === value.uuid) {
                        this.dataList.settleTransactionMap[index] = { transId: value.uuid, settleAmount: value.settleAmount };
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
        this.paymentDetail.forEach((value, index) => {
            if (typeof value.checked === 'undefined') {
                this.$set(value, 'checked', true);
            }
            if (this.isRefundCilitaionType === 'collect') {
                this.dataList.settleReconciliationPlanMap[index] = { 'planId': value.uuid, 'settleAmount': value.unsettleAmount };
            } else {
                this.dataList.settleReconciliationPlanMap[index] = { 'uuid': value.uuid, 'settleAmount': value.unsettlementMoney };
            }

        })
    },
    handleSelectionBankAll() { //流水
        this.getDataList.forEach((value, index) => {
            if (typeof value.checked === 'undefined') {
                this.$set(value, 'checked', true);
            }
            this.dataList.settleTransactionMap[index] = { transId: value.uuid, 'settleAmount': value.unSettleAmount };

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
            unsettleAmount = row.unSettleAmount || row.unsettlementMoney;
        console.log($event, unsettleAmount);
        if ($event > unsettleAmount || !regular) {
            boolean = false;
        }
        if (boolean) {
            if (type === 'system') {
                this.settleReconciliationPlanMap[index].settleAmount = $event;
                this.dataList.settleReconciliationPlanMap[index].settleAmount = $event;
            } else {
                this.settleTransactionMap[index].settleAmount = $event;
                this.dataList.settleTransactionMap[index].settleAmount = $event;
            }
            row.checked = !row.checked;
            row.showInput = !row.showInput
        } else {
            this.moneyMsg()
        }

    },
    rowClickPayment(row, event) {//子表点击事件
        if (event.target.nodeName === 'DIV' || event.target.nodeName === 'TD') {
            var newId = row.uuid;
            if (row) {
                this.paymentDetail.forEach((value) => {
                    if (value.uuid === newId) {
                        this.$refs.paymentTable.toggleRowSelection(row);
                        value.showInput = false;
                    }
                });
            }
        }
    },
    //对账
    checks: function() {
        if (this.dataList.settleDate == '') {
            // toastr.warning("请选择对账日期...");
            this.$message.error("请选择对账日期!");
            return false;
        }
        if (this.balanceAccountUrl !== 'refundAutoSettle') {
            this.receiveRetreatMoney();
        }
    },
    //对账接口
    receiveRetreatMoney(){
      var url = 'settle';
      var streamArr = Object.keys(this.dataList.settleReconciliationPlanMap);
      var bankArr = Object.keys(this.dataList.settleTransactionMap);
      bankArr.forEach((value, index) => {
          this.dataList.settleTransactionMap[index] = this.dataList.settleTransactionMap[value];
          if (value >= bankArr.length) {
              delete this.dataList.settleTransactionMap[value]
          }
      });
      streamArr.forEach((value, index) => {
          this.dataList.settleReconciliationPlanMap[index] = this.dataList.settleReconciliationPlanMap[value];
          if (value >= streamArr.length) {
              delete this.dataList.settleReconciliationPlanMap[value]
          }
      });
      if (this.isRefundCilitaionType === 'retreat') {
          url = 'handsettle'
      }
      autoMeney(url,this.dataList).then(res=>{
        if (res.data.status === '200') {
          this.$message({message:res.data.msg  || "请求成功!",type: 'success',center:true});
                this.paymentDetail = [];
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
      this.pageOnclick();
    },
    handleCurrentChangeOrder(val) { //选中页码

        if(this.valueData ==''){
          this.Order.selectPageNumber = val;
          this.Order.pageNumber = val;
        }else{
          this.valueData[0].selectPageNumber = val;
          this.valueData[0].pageNumber = val;
        }
        // this.OrderIncome()
        this.pageOnclick();
    },
    handleSizeChangeBank(val) { //流水

        if(this.valueData1 == ''){
          this.stream.pageSize = val;
        }else{
          this.valueData1[0].pageSize = val;
        }
        this.transPage();
    },
    handleCurrentChangeBank(val) { //流水

        if(this.valueData1 ==''){
          this.stream.selectPageNumber = val;
          this.stream.pageNumber = val;
        }else{
          this.valueData1[0].selectPageNumber = val;
          this.valueData1[0].pageNumber = val;
        }
        this.transPage();
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

      getRowInfo(row){//获取点击的信息然后跳转
        //let index = this.getLocalDataList.indexOf(row);
        this.$store.dispatch('storeOrderListUUid',row.uuid);
        this.$refs.OrderTable.toggleRowSelection(row);
        this.$router.push({
          name: 'orderDetail',
          params: {id: row.uuid}
        })
      },

        clearTime(row) { //转换时间
          if(row.clearDate){
            return row.clearDate.split('T')[0];
          }
        },
        transshi(row){
          if(row.transTime){
            return row.transTime.split('T')[0];
          }
        },
        formatbyTypes(row) { //状态
            return (row.businessType === 'Collection' && '收入') || (row.businessType === 'Refund' && '支出');
        },
        formatStatus(row) { //单据状态
            return (row.status === 'Save' && '保存') || (row.status === 'Audited' && '审核')||(row.status === "AutoClose" && "自动关闭")|| (row.status === 'HandClose' && '手工关闭') ;
        },
        formatSettleStatus(row) { //对账状态
            return (row.reconStatus === "UnSettled" && '未对账') || (row.reconStatus === "Part" && '部分对账') || (row.reconStatus === 'Completely' && '完全对账')|| (row.reconStatus === 'Exception' && '异常');
        },
        formatDifferenceProcessingStatus(row) { //差异处理状态
            return (row.differenceProcessingStatus === "Y" && '是') || (row.differenceProcessingStatus === "N" && '否');
        },
        formatReconStatus(row) { //退款状态
            return row.reconStatus = (row.reconStatus === 'UnSettled' && '未退款') || (row.reconStatus === 'Part' && '部分退款') || (row.reconStatus === 'Completely' && '完全退款')||(row.reconStatus === 'RefundException' && '退款异常')
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
  .cell{
    text-align: center;
  }
</style>

