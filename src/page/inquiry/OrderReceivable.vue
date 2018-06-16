<template>
    <div class="bill">
      <div class="head_search">
        <h3 class="head_title">订单应收</h3>
        <search @orderSearchs="fliterOrder"></search>

        <batchAudit @reqMethod="orderAudit"></batchAudit>
        <batchUnAudit @reqMethod="orderUnAudit"></batchUnAudit>
        <singleDifferences :selectData="handSelectDataList" @reqMethod="orderSingleDif"></singleDifferences>
        <batchDifferences @reqMethod="orderDifferences"></batchDifferences>
        <batchDelete @reqMethod="orderDelete"></batchDelete>
      </div>
      <div class="container">
        <template>
          <el-tabs type="border-card" v-model="activeName"  @tab-click="handleClick">
            <!--按钮-->
            <el-row>
              <dropDown>
                <template slot="nameOne">订单导入</template>
                <template slot="nameTwo">订单导出</template>
              </dropDown>
              <dropDown @reqParent="request">
                <template slot="nameOne">审核</template>
                <template slot="nameTwo">批量审核</template>
              </dropDown>
              <dropDown @reqParent="request">
                <template slot="nameOne">反审核</template>
                <template slot="nameTwo">批量反审核</template>
              </dropDown>
              <dropDown>
                <template slot="nameOne">差异对账</template>
                <template slot="nameTwo">批量差异对账</template>
              </dropDown>
              <el-btn>新增</el-btn>
              <dropDown @reqParent="request">
                <template slot="nameOne">删除</template>
                <template slot="nameTwo">批量删除</template>
              </dropDown>
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
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="getRowInfo(scope.row)"
                      type="text"
                      size="small">
                      {{scope.row.billNo}}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="orderNo"
                  label="平台订单号"
                  width="190">
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
                <el-table-column
                  prop="settleStatus"
                  label="对账状态"
                  width="100"
                  :formatter="formatSettleStatus">
                </el-table-column>
                <el-table-column
                  prop="totalAmount"
                  label="对账总金额"
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
                  width="90"
                  :formatter="formatStatus">
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
                  prop="settlementStatus"
                  label="退款状态"
                  width="100"
                  :formatter="formatSettlementStatus">
                </el-table-column>
                <el-table-column
                  prop="unsettlementMoney"
                  label="未退款金额"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="settlementMoney"
                  label="已退款金额"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="orderType"
                  label="单据类型"
                  width="100"
                  :formatter="formatOrderType">
                </el-table-column>
                <el-table-column
                  prop="businessDate"
                  label="业务日期"
                  width="100"
                  :formatter="formatTime">
                </el-table-column>
                <el-table-column
                  prop="orderTotalAmount"
                  label="订单总金额"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="commission"
                  label="佣金"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="integral"
                  label="积分"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="platformCoupon"
                  label="平台优惠卷"
                  width="110">
                </el-table-column>
                <el-table-column
                  prop="companyCoupon"
                  label="公司优惠卷"
                  width="110">
                </el-table-column>
                <el-table-column
                  prop="insurance"
                  label="保险"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="freight"
                  label="运费"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="sellerPayment"
                  label="买家支付金额"
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
            :total="Order.total">
          </el-pagination>
        </div>
      </template>

    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {
    getOrderReceivable,
    getorderPage,
    getAuditData,
    getPlatform,
    orderDeletes,
    orderAudit,
    orderUnAudit,
    orderDifferences,
    singleDif,
    Method,
    orderSearchAjax,
    orderSearchPage
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
    name: 'bill',
    components: {
      search,//高级搜索
      batchAudit,//批量审核框
      batchUnAudit,//批量反审核框
      singleDifferences, //差异对账
      batchDifferences,//批量差异对帐
      batchDelete,//批量删除
      'el-btn': button,
       dropDown,
    },
    data () {
      return {
        diffName: 'receivableReconciliation',//差异对账接口url
        loading: true,
        activeName: 'UnSettled,Part,Completely,Exception',
        getLocalDataList:[],//请求的数据
        handSelectDataList:[],//选中的数据
        filterData: {}, //批量框数据
        btnInfo:[],
        message: '',
        currentPage4: 1,
        Order: { //订单应收查询条件
          customerName: "",
          pageNumber: 1,
          pageSize: 100,
          settleStatus: "UnSettled,Part,Completely,Exception",
          sortOrder: "asc",
          total: 0,
        },

        valueData:[], //查询返回的数组
      }
    },
    watch: {
      $route(to,from) {
        this.getLocalData()
      }
    },
    computed: {
      ...mapState({
        verifyStatus:store=>store.verifyStatus,
      })
    },
    mounted(){
      this.getLocalData();
      // this.getPagination();
      this.getParaData();
    },
    methods:{
      //高级查询
      fliterOrder(value){
        this.valueData = value;
        this.loading = true;
        //查询
        orderSearchAjax(value).then(res=>{
          this.getLocalDataList = res.data.obj;
          this.loading = false;
        })
        //分页
        orderSearchPage(value).then(res=>{
          this.Order.total = res.data.obj[0].total;
          this.loading = false;
        })
      },

      demandonLoad(){
        //查询
        let value = this.valueData;
        this.loading = true;
        orderSearchAjax(value).then(res=>{
          this.getLocalDataList = res.data.obj;
          this.loading = false;
        })
        //分页
        orderSearchPage(value).then(res=>{
          console.log(res);
          this.Order.total = res.data.obj[0].total;
          this.loading = false;
        })
      },
      pageOnclick(){
        if(!this.valueData.length){
          this.getLocalData();
        }else{
          this.demandonLoad();
        }
      },

      getParaData(){ //请求所有弹出框数据和平台
        getAuditData().then(res =>{
          if(res.status === 200){
            this.filterData = res.data;
            this.getPlatform();
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
      handleSizeChange(val) { // 选择请求每页页数
        console.log(`每页 ${val} 条`);
        if(!this.valueData.length){
          this.Order.pageSize = val;
        }else{
          this.valueData[0].pageSize = val;
        }
        this.pageOnclick()
        // this.getLocalData();
        // this.getPagination();
      },
      handleCurrentChange(val) { //翻页
        if(!this.valueData.length){
          this.Order.pageNumber = val;
        }else{
          this.valueData[0].pageNumber = val;
        }
        // this.getLocalData();
        this.pageOnclick()
        // this.getPagination();
        // console.log(`当前页: ${val}`);
      },
      handleClick() {
        this.loading = true;
        this.Order.settleStatus = this.activeName;
        this.getLocalData();
        this.getPagination();
      },

      getLocalData(){/*请求数据*/
        let that = this;
        getOrderReceivable(
          that.Order.customerName,
          that.Order.pageNumber,
          that.Order.pageSize,
          that.Order.settleStatus,
          that.Order.sortOrder
        ).then(res=>{
          that.loading = false;
          if(res.data.status === '200'){
            that.getLocalDataList = res.data.obj;
          }
        });
        getorderPage(
          this.Order.customerName,
          this.Order.pageNumber,
          this.Order.pageSize,
          this.Order.settleStatus,
          this.Order.sortOrder
        ).then(res=>{
          if(res.data.status === '200') {
            this.Order.total = res.data.obj[0].total;
          }
        })
      },
      getPagination() {//请求分页

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
        console.log(row);
      },
      getRowInfo(row){//获取点击的信息然后跳转
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
      orderAudit(form) {//批量审核
        orderAudit(
          form.settleStatus,
          form.platform,
          form.status,
          form.businessDate,
          form.businessDateEnd,
          form.orderType,
          form.remarks,
        ).then(res =>{
          if(res.data.status === '200') {
            this.$store.dispatch('loadDisabled',false);
            this.$message.success(res.data.obj.success);
            this.$store.dispatch('dialogFromAudit');
            // this.getLocalData();
            this.pageOnclick()
            // this.getPagination();
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      orderUnAudit(form) {
        console.log(form);
        orderUnAudit( //批量反审核
          form.businessDate,
          form.businessDateEnd,
          form.orderType,
          form.platform,
          form.reconStatus,
          form.status,
        ).then(res =>{
          console.log(res);
          if(res.data.status === '200') {
            this.$store.dispatch('loadDisabled',false);
            this.$message.success(res.data.obj.success);
            this.$store.dispatch('dialogFromUnAudit');
            // this.getLocalData();
            this.pageOnclick()
            // this.getPagination();
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      orderSingleDif(dataMore) { //差异处理
        singleDif(this.diffName,dataMore).then(res => {
          this.$store.dispatch('loadDisabled',false);
          if(res.data.status === '200') {
            this.$store.dispatch('dialogDifferences');
            // this.getLocalData();
            this.pageOnclick();
            this.$message.success(res.data.msg);
          }else{
            this.$message.error(res.data.msg);
          }

        })
      },
      orderDifferences(form) { //批量差异处理
        orderDifferences(
          form.settleStatus,
          form.platform,
          form.status,
          form.businessDate,
          form.businessDateEnd,
          form.orderType,
          form.remarks,
          form.settleDate,
      ).then(res => {
          this.$store.dispatch('loadDisabled',false);
          if(res.data.status === '200') {
            this.$message.success(res.data.msg);
            this.$store.dispatch('dialogFromDifferences');
            // this.getLocalData();
            this.pageOnclick()
            // this.getPagination();
          }else{
            this.$message.error('批量差异对账失败');
          }
        })
      },
      orderDelete(form) { //批量删除
        orderDeletes(
          form.settleStatus,
          form.platform,
          form.status,
          form.businessDate,
          form.businessDateEnd,
          form.orderType,
        ).then(res=>{
          this.$store.dispatch('loadDisabled',false);
          if(res.data.status === '200') {
            this.$message.success(res.data.obj.success);
            this.$store.dispatch('dialogFromDelete');
            // this.getLocalData();
            this.pageOnclick()
            // this.getPagination();
          }else{
            this.$message.error(res.data.obj.failure);
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
        let name = 'orderReceivable';
        let message = (str === 'audit' && '审核') ||
          (str === 'unAudit' && '反审核') ||
          (str === 'delete' && '删除');
        let data = this.getId(str);
        if(data.length) {
          Method(name,str,data).then(res=>{
            console.log(res);
            if(res.data.status == 200) {
              this.$message.success(res.data.msg);
              // this.getLocalData();
              this.pageOnclick()
              // this.getPagination();
            }else{
              this.$message.error(res.data.msg);
            }
          })
        }else {
          let status = this.status(str);
          console.log(status);
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

    //数格式转换
    formatTime(row) {
      //转换时间
      if(row.businessDate){
        return row.businessDate.split('T')[0];
      }
    },
    formatStatus(row) {
      // //单据状态
      return (
        (row.status === "Save" && "保存") ||
        (row.status === "Audited" && "审核") ||
        (row.status === "AutoClose" && "自动关闭")||
        (row.status === 'HandClose' && '手工关闭')
      );
    },
    formatSettleStatus(row) {
      //对账状态
      return (
        (row.settleStatus === "Exception" && "异常") ||
        (row.settleStatus === "UnSettled" && "未对账") ||
        (row.settleStatus === "Part" && "部分对账") ||
        (row.settleStatus === "Completely" && "完全对账")
      );
    },
    formatDifferenceProcessingStatus(row) {
      //差异处理状态
      return (
        (row.differenceProcessingStatus === "Y" && "是") ||
        (row.differenceProcessingStatus === "N" && "否")
      );
    },
    formatReconStatus(row) {
      //退款状态
      return (
        (row.reconStatus === "RefundException" && "退款异常") ||
        (row.reconStatus === "UnSettled" && "未退款") ||
        (row.reconStatus === "Part" && "部分退款") ||
        (row.reconStatus === "Completely" && "完全退款")
      );
    },
    formatSettlementStatus(row) { //退款状态
      return (row.settlementStatus === 'UnRefund' && '未退款') ||
      (row.settlementStatus === 'PartRefund' && '部分退款') ||
      (row.settlementStatus === 'CompleteRefund' && '完全退款') ||
      (row.settlementStatus === 'RefundException' && '退款异常')
    },
    formatOrderType(row) {
      //退款状态
      return (
        (row.orderType === "platformOrders" && "平台订单") ||
        (row.orderType === "manualOrders" && "手工订单")
      );
    }
  }
};
</script>
<style scoped>

</style>
