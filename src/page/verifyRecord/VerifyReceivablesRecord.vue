<template>
    <div class="hello">
      <div class="head_search">
        <h3 class="head_title" style="margin-top:10px;">收款对账记录</h3>
        <search @searchRecord="fliterRecord"></search>
      </div>
      <bulkObject @nodeEvent="Commits"></bulkObject>
      <getWebSocket @socketStatus="clickQu"></getWebSocket>
      <template>
        <el-row>
          <el-button type="primary" size="small" @click="reseted">反对账</el-button>
          <el-button type="primary" size="small" @click="bulkObjfun">批量反对账</el-button>
        </el-row>
      </template>
      <div class="container">
        <template>
                <el-table
                  border
                  v-loading="loading"
                  ref="OrderTable"
                  :data="getLocalDataList"
                  highlight-current-row
                  height="500"
                  @row-click="handleSelectedRow"
                  @selection-change="handleSelectionChange"
                  @select="handleSelectionSingle"
                  @select-all="handleSelectionAll">
                  <el-table-column
                          width="40"
                          type="selection">
                  </el-table-column>
                  <el-table-column
                          prop="companyName"
                          label="公司"
                          width="150">
                  </el-table-column>
                  <el-table-column
                          prop="settleNo"
                          label="对账编号"
                          width="180">
                  </el-table-column>

                  <el-table-column
                          prop="settleDate"
                          label="对账日期"
                          width="110"
                          :formatter="formatTime">
                  </el-table-column>
                  <el-table-column
                          label="平台名称"
                          width="140">
                          <el-table-column
                              label="渠道名称"
                              width="140"
                              prop="payChannelManageName">
                            </el-table-column>
                  </el-table-column>
                  <el-table-column
                          label="平台类型"
                          width="140">
                          <el-table-column
                          prop="payChannelName"
                          label="渠道类型"
                          width="140">
                  </el-table-column>
                  </el-table-column>
                  <el-table-column
                          prop="recordType"
                          label="单据类型"
                          width="120"
                          :formatter="formatStatus">
                  </el-table-column>
                  <el-table-column
                          prop="isException"
                          label="是否异常"
                          width="120"
                          :formatter="exceptionStatus">
                  </el-table-column>
                  <el-table-column
                          prop="recordNo"
                          label="来源订单号"
                          width="190">
                  </el-table-column>
                  <el-table-column
                          prop="billeNo"
                          label="单据编号"
                          width="230">
                  </el-table-column>
                  <el-table-column
                          prop="recordDate"
                          label="单据日期"
                          width="100"
                          :formatter="formatTimeRecord">
                  </el-table-column>
                  <el-table-column
                          prop="sourceAmount"
                          label="单据金额"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="settleAmount"
                          label="本次对账金额"
                          width="160">
                  </el-table-column>
                  <el-table-column
                          prop="creator"
                          label="对账人"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="settleType"
                          label="对账方式"
                          width="100"
                          :formatter="settleStatus">
                  </el-table-column>
                  <el-table-column
                          prop="businessType"
                          label="业务类型"
                          width="80"
                          :formatter="businessStatus">
                  </el-table-column>
                  <el-table-column
                          prop="settleRuleName"
                          label="对账规则"
                          width="120">
                  </el-table-column>
                  <el-table-column
                          prop="batchNo"
                          label="对账批次号"
                          width="160">
                  </el-table-column>
                </el-table>
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
  import {recordAjax,recordPage,deleteRecord,batchSettle,recordmand,recordmandPage} from '../../axios/api'
  import search from '../../components/search/Search'
  import bulkObject from '../../components/filterBox/bulkObject'
  import getWebSocket from "../../components/getWebSocket/getWebSocket"
  export default {
    name: 'HelloWorld',
    components:{
      search,//高级搜索
      bulkObject,
      getWebSocket
    },
    data () {
      return {
        loading: true,
        activeName: 'Whole',
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
          reconStatus: "UnSettled", //参数
          total: 1, //总页数
          selectPageNumber: 1, //选中的页数,
        },
        uuidList: [],
        valueData:[], //查询返回的数组
      }
    },
    computed: {
      ...mapState({
        verifyStatus:store=>store.verifyStatus
      })
    },
    mounted(){
      this.getLocalData()
    },
    methods:{
      //高级查询
      fliterRecord(value){
        console.log(value)
        this.valueData = value;
        this.loading = true;
        //查询
        recordmand(value).then(res=>{
          this.getLocalDataList = res.data.obj;
          this.loading = false;
        })
        //分页
        recordmandPage(value).then(res=>{
            this.business.total = res.data.obj[0].total;
            this.loading = false;
        })
      },
      demandonLoad(){
         //查询
         var value = this.valueData;
         this.loading = true;
        recordmand(value).then(res=>{
          this.getLocalDataList = res.data.obj;
          this.loading = false;
        })
        //分页
        recordmandPage(value).then(res=>{
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

      //子组件回传
      Commits(value){
        console.log(value)
        var form = value;
          let businessmodel = form.reconDate[0];
          let reconmodel= form.reconDate[1];

          let ordermodel = form.orderDate[0];
          let orderTime= form.orderDate[1];

          let flowModel = form.transTime[0];
          let flowtime= form.transTime[1];
          batchSettle(
            businessmodel,
            reconmodel,
            ordermodel,
            orderTime,
            flowModel,
            flowtime,
            form.reconMethod,
            form.ruleModel,
            form.businesstype,
            form.platformName,
            form.lotNumber,
            form.abnormalName
          ).then(res=>{

          })
          this.$store.dispatch('dialoggetWebSocket')
      },
      //点击进度条确定
      clickQu(val){
          this.getLocalData()
      },

      /*请求数据*/
      getLocalData(){
        var that = this;
        this.loading= true;
        //流水
        recordAjax(
          that.business.pageNumber,
          that.business.pageSize,
          that.business.reconStatus
        ).then(res=>{
        if(res.data.status === '200'){
          this.getLocalDataList = res.data.obj;
          this.loading = false;
        }
      })
      //分页
      recordPage(
        that.business.pageNumber,
        that.business.pageSize,
        that.business.reconStatus
      ).then(res=>{
        if(res.data.status === '200'){
          that.business.total = res.data.obj[0].total;
          this.loading = false;
        }
      })
      },
       handleSizeChangeOrder(val) {
      //选择条数
      if(this.valueData == ''){
        this.business.pageSize = val;
      }else{
        this.valueData[0].pageSize = val;
      }
      this.loading = true;
      this.pageOnclick();
    },
    handleCurrentChangeOrder(val) {
      //选中页码
      if(this.valueData == ''){
          this.business.selectPageNumber = val;
          this.business.pageNumber = val;
      }else{
        this.valueData[0].pageNumber = val;
        this.valueData[0].selectPageNumber = val;
      }
      this.loading = true;
      this.pageOnclick();
    },
    getUuid() { //获取uuid
      var newArr = [];
      this.getLocalDataList.forEach((value) => {
          if (value.checked) {
              this.uuidList.push(value.uuid)
          }
      });
      this.uuidList.forEach((value) => {
          if (newArr.indexOf(value) === -1) {
              newArr.push(value)
          }
      });
      this.uuidList = newArr;
    },
      //反对帐
      reseted(){
        this.getUuid();
        if(this.uuidList){
          deleteRecord(this.uuidList).then(res=>{
              if(res.data.status == '200'){
                this.$message({message:res.data.msg || "反对账成功",center:true});
                this.getLocalData()
              }else{
                this.$message.error({message:res.data.msg || "反对账失败",center:true});
              }
          })
        }else{
          this.$message.error({message:"请选择反对账行",center:true});
        }
      },
      //点击行
      handleSelectedRow(row){
         if (row) {
            var newId = row.settleNo;
            var selectArr = [];
            this.getLocalDataList.forEach((value) => {
                if (value.settleNo === newId) {
                    selectArr.push(value);
                    if (typeof value.checked === 'undefined') {
                        this.$set(value, 'checked', true)
                    } else {
                        value.checked = !value.checked;
                    }
                }

            });
            if (selectArr) {
                selectArr.forEach((value) => {
                    this.$refs.OrderTable.toggleRowSelection(value, value.checked);
                })
            }
        }
      },
      //当选择项发生变化时会触发该事件
      handleSelectionChange(rows){
        if (rows) {
          rows.forEach((value, index) => {
              if (this.uuidList.indexOf(value.id) === -1) {
                  this.uuidList.push(value.id)
              }
          })
        } else {
            this.uuidList = []
        }
      },
      handleSelectionAll() { //全选
      this.getLocalDataList.forEach((value) => {
          if (typeof value.checked === 'undefined') {
              this.$set(value, 'checked', true)
          } else {
              value.checked = !value.checked;
          }
        });
      },
      handleSelectionSingle(val) { //点击checkbox选中
        if (val.length > 0) {
            var listArr = [];
            var item = val[val.length - 1];
            var setNo = item.settleNo;
            this.getLocalDataList.forEach((value, index) => {
                if (value.settleNo === setNo) {
                    if (typeof value.checked === 'undefined') {
                        this.$set(value, 'checked', true);
                    } else {
                        value.checked = !value.checked;
                    }
                    listArr.push(value);
                }
            });
            console.log(listArr);
            listArr.forEach((value, index) => {
                this.$refs.OrderTable.toggleRowSelection(value, value.checked);
            })
        }
      },
      //批量反对账
      bulkObjfun(){
          this.$store.dispatch('dialogBulk');
      },

        formatTime(row) { //转换时间
            return row.settleDate.split('T')[0];
        },
        formatTimeRecord(row) { //转换时间 -单据日期
            return row.recordDate.split('T')[0];
        },
        formatStatus(row) { //单据类型
            return (row.recordType === 'OrderReceivable' && '订单应收') || (row.recordType === 'Transaction' && '交易流水') || (row.recordType === 'DifferenceProcessing' && '差异处理') || (row.recordType === 'Settlement' && '结算单') || (row.recordType === 'SettlementPlatForm' && '系统对账单') || row.recordType;
        },
        exceptionStatus(row) { //是否异常
            return (row.isException === true && '是') || (row.isException === false && '否');
        },
        settleStatus(row) { //对账方式
            return (row.settleType === 'handSettle' && '手工对账') || (row.settleType === 'autoSettle' && '匹配对账') || (row.settleType === 'differenceSettle' && '差异对账') || (row.settleType === 'refundsSettle' && '退款对账');
        },
        businessStatus(row) {
            return (row.businessType === 'Collection' && '收入') || (row.businessType === 'Refund' && '支出') || (row.businessType === 'ServiceCharge' && '服务费')
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


</style>
