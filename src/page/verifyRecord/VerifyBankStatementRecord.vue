<template>
    <div class="hello">
      <div class="head_search">
        <h3 class="head_title">银行对账记录</h3>
        <search @searchbank="bankSearch"></search>
      </div>
      <template>
        <el-row>
          <el-button type="primary" size="small" @click="deleterecord">反对账</el-button>
          <!-- <el-button type="primary" size="small" @click="bulkObj">批量反对账</el-button> -->
        </el-row>
      </template>
      <!-- <bulkObject></bulkObject> -->
      <div class="container">
        <template>
                <el-table
                  border
                  v-loading="loading"
                  ref="OrderTable"
                  :data="getDataList"
                  highlight-current-row
                  height="410"
                  @row-click="handleSelectedRow"
                  @selection-change="handleSelectionChange"
                  @select="handleSelectionSingle"
                  @select-all="handleSelectionAll">
                  <el-table-column
                          width="40"
                          type="selection">
                  </el-table-column>
                  <el-table-column
                          prop="companyOwning"
                          label="公司"
                          width="150">
                  </el-table-column>
                  <el-table-column
                          prop="settleNo"
                          label="对账编号"
                          width="180">
                  </el-table-column>

                  <el-table-column
                          prop="createTime"
                          label="对账日期"
                          width="110"
                          :formatter="formatStatus"
                          >
                  </el-table-column>
                  <el-table-column
                          prop="recordType"
                          label="单据类型"
                          width="140">
                  </el-table-column>
                  <el-table-column
                          prop="recordNo"
                          label="单据编号"
                          width="200">
                  </el-table-column>
                  <el-table-column
                          prop="recordDate"
                          label="单据日期"
                          width="120"
                          :formatter="formatTime">
                  </el-table-column>
                  <el-table-column
                          prop="amount"
                          label="单据金额"
                          width="120">
                  </el-table-column>
                  <el-table-column
                          prop="settleTotalAmount"
                          label="本次对账金额"
                          width="190">
                  </el-table-column>
                  <el-table-column
                          prop="creator"
                          label="对账人"
                          width="190">
                  </el-table-column>
                  <el-table-column
                          prop="settleType"
                          label="对账方式"
                          width="90">
                  </el-table-column>
                </el-table>
              </template>
      </div>
      <template>
       <div class="block" v-show="pagination">
            <el-pagination @size-change="handleSizeChangeOrder" @current-change="handleCurrentChangeOrder" :current-page="bank.selectPageNumber" :page-sizes="[100, 200, 500, 1000,20000]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="bank.total">
            </el-pagination>
        </div>
      </template>
    </div>
</template>

<script>
import {mapState} from 'vuex'
  import {bankRecordAjax,bankRecordPage,deletebank,bankSearchAjax,bankSearchPage} from '../../axios/api'
  import tabs from '../../components/tabs/Tabs'
  import search from '../../components/search/Search'
  // import bulkObject from '../../components/filterBox/bulkObject'
  export default {
    name: 'HelloWorld',
    components:{
      search,//高级搜索
      // bulkObject
    },
    data () {
      return {
        loading: true,
        activeName: 'Whole',
        handSelectDataList:[],//选中的数据
        pagination:true,  //分页显示
        btnInfo:[],
        message: '',
        currentPage4: 4,
        bank: { //分页
            companyOwning: "",
            pageNumber: 1,
            pageSize: 100,
            status: "",
            total: 1,
            selectPageNumber: 1,
        },
        getDataList:[],
        uuidList: [],
        valueData:[], //子组件传回来的
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
      /********************************************************高级查询*******************************************************************/
      bankSearch(value){
        console.log(value);
        this.valueData = value;
        this.loading = true;
        bankSearchAjax(value).then(res=>{
          this.getBankDataList = res.data.obj;
          this.getDataList = [];
          for (var i = 0; i < this.getBankDataList.length; i++) {
                for (var j = 0; j < this.getBankDataList[i].bankReconciliationSupList.length; j++) {
                    var settleType = null;
                    if (this.getBankDataList[i].bankReconciliationSupList[j].settleType === 'handSettle') {
                        settleType = '手工对账'
                    } else if (this.getBankDataList[i].bankReconciliationSupList[j].settleType === 'autoSettle') {
                        settleType = '匹配对账'
                    } else {
                        settleType = '差异对账'
                    }
                    var recordType = null;
                    if (this.getBankDataList[i].bankReconciliationSupList[j].recordType === 'BankFlowing') {
                        recordType = '银行流水'
                    } else if (this.getBankDataList[i].bankReconciliationSupList[j].recordType === 'SettlementPlatForm') {
                        recordType = '系统对账单'
                    } else if (this.getBankDataList[i].bankReconciliationSupList[j].recordType === 'Settlement') {
                        recordType = '结算单'
                    } else if (this.getBankDataList[i].bankReconciliationSupList[j].recordType === 'DifferenceProcessing') {
                        recordType = '差异处理'
                    } else {
                        recordType = '银行流水'
                    }

                    var differenceProcessingStatus = null;
                    if (this.getBankDataList[i].differenceProcessingStatus === 'Y') {
                        differenceProcessingStatus = '是'
                    } else {
                        differenceProcessingStatus = '否'
                    }
                    var name;
                    if (this.getBankDataList[i].bankReconciliationSupList[j].customer) {
                        name = this.getBankDataList[i].bankReconciliationSupList[j].customer.name;
                    }
                    this.getDataList.push({
                        //表头
                        "uuid": this.getBankDataList[i].uuid,
                        "companyOwning": this.getBankDataList[i].companyOwning, //公司
                        "settleNo": this.getBankDataList[i].reconNo, //对账编号
                        "createTime": this.getBankDataList[i].createTime, //对账日期
                        "recordDate": this.getBankDataList[i].bankReconciliationSupList[j].businessDate, //单据日期
                        "settleTotalAmount": this.getBankDataList[i].bankReconciliationSupList[j].settleAmount, //本次对账总金额
                        //表体
                        "commercialTenantName": this.getBankDataList[i].commercialTenantName, //客户name
                        "recordNo": this.getBankDataList[i].bankReconciliationSupList[j].recordNo, //单据编号
                        "amount": this.getBankDataList[i].bankReconciliationSupList[j].transAmount, //单据金额
                        "creator": this.getBankDataList[i].creator, //人员
                        "settleType": settleType, //对账方式
                        "recordType": recordType, //单据类型
                        "differenceProcessingStatus": differenceProcessingStatus,
                        "status": this.getBankDataList[i].status, //单据状态
                        "settleStatus": this.getBankDataList[i].settleStatus, //对账状态
                    })

                }
            }
          this.loading = false;
          if(res.data.status =='200'){
            bankSearchPage(value).then(res=>{
              this.bank.total = res.data.obj[0].total;
            })
          }
        })
      },
      bankonLoad(){
         //查询
         var value = this.valueData;
         this.loading = true;
        bankSearchAjax(value).then(res=>{
          this.getBankDataList = res.data.obj;
          this.loading = false;
          if(res.data.status =='200'){
            bankSearchPage(value).then(res=>{
              this.bank.total = res.data.obj[0].total;
            })
          }
        })
      },
      pageOnclick(){
        if(this.valueData == ''){
          this.getLocalData();
        }else{
          this.bankonLoad();
        }
      },
      /********************************************************高级查询*******************************************************************/
      /*请求数据*/
      getLocalData(){
        var that = this;
        //流水
        bankRecordAjax(
          that.bank.pageNumber,
          that.bank.pageSize,
          that.bank.status
        ).then(res=>{
          console.log(res);
        if(res.data.status === '200'){
          this.getBankDataList = res.data.obj;
          this.getDataList = [];
          for (var i = 0; i < this.getBankDataList.length; i++) {
                for (var j = 0; j < this.getBankDataList[i].bankReconciliationSupList.length; j++) {
                    var settleType = null;
                    if (this.getBankDataList[i].bankReconciliationSupList[j].settleType === 'handSettle') {
                        settleType = '手工对账'
                    } else if (this.getBankDataList[i].bankReconciliationSupList[j].settleType === 'autoSettle') {
                        settleType = '匹配对账'
                    } else {
                        settleType = '差异对账'
                    }
                    var recordType = null;
                    if (this.getBankDataList[i].bankReconciliationSupList[j].recordType === 'BankFlowing') {
                        recordType = '银行流水'
                    } else if (this.getBankDataList[i].bankReconciliationSupList[j].recordType === 'SettlementPlatForm') {
                        recordType = '系统对账单'
                    } else if (this.getBankDataList[i].bankReconciliationSupList[j].recordType === 'Settlement') {
                        recordType = '结算单'
                    } else if (this.getBankDataList[i].bankReconciliationSupList[j].recordType === 'DifferenceProcessing') {
                        recordType = '差异处理'
                    } else {
                        recordType = '银行流水'
                    }

                    var differenceProcessingStatus = null;
                    if (this.getBankDataList[i].differenceProcessingStatus === 'Y') {
                        differenceProcessingStatus = '是'
                    } else {
                        differenceProcessingStatus = '否'
                    }
                    var name;
                    if (this.getBankDataList[i].bankReconciliationSupList[j].customer) {
                        name = this.getBankDataList[i].bankReconciliationSupList[j].customer.name;
                    }
                    this.getDataList.push({
                        //表头
                        "uuid": this.getBankDataList[i].uuid,
                        "companyOwning": this.getBankDataList[i].companyOwning, //公司
                        "settleNo": this.getBankDataList[i].reconNo, //对账编号
                        "createTime": this.getBankDataList[i].createTime, //对账日期
                        "recordDate": this.getBankDataList[i].bankReconciliationSupList[j].businessDate, //单据日期
                        "settleTotalAmount": this.getBankDataList[i].bankReconciliationSupList[j].settleAmount, //本次对账总金额
                        //表体
                        "commercialTenantName": this.getBankDataList[i].commercialTenantName, //客户name
                        "recordNo": this.getBankDataList[i].bankReconciliationSupList[j].recordNo, //单据编号
                        "amount": this.getBankDataList[i].bankReconciliationSupList[j].transAmount, //单据金额
                        "creator": this.getBankDataList[i].creator, //人员
                        "settleType": settleType, //对账方式
                        "recordType": recordType, //单据类型
                        "differenceProcessingStatus": differenceProcessingStatus,
                        "status": this.getBankDataList[i].status, //单据状态
                        "settleStatus": this.getBankDataList[i].settleStatus, //对账状态
                    })

                }
            }
          this.loading = false;
        }
      })
      //分页
      bankRecordPage(
        that.bank.pageNumber,
        that.bank.pageSize,
        that.bank.status
      ).then(res=>{
          console.log(res);
        if(res.data.status === '200'){
          that.bank.total = res.data.obj[0].total;
          this.loading = false;
        }
      })
      },
       handleSizeChangeOrder(val) {
      //选择条数

      if(this.valueData == ''){
        this.bank.pageSize = val;
      }else{
        this.valueData[0].pageSize = val;
      }
      this.loading = true;
      this.pageOnclick();
    },
    handleCurrentChangeOrder(val) {
      //选中页码

      if(this.valueData == ''){
        this.bank.selectPageNumber = val;
        this.bank.pageNumber = val;
      }else{
        this.valueData[0].selectPageNumber = val;
        this.valueData[0].pageNumber = val;
      }
      this.loading = true;
      this.pageOnclick();
    },
     getUuid() { //获取uuid
      var newArr = [];
      this.getDataList.forEach((value) => {
          if (value.checked) {
              this.uuidList.push(value.uuid)
          }
      });
      console.log(this.uuidList);
      this.uuidList.forEach((value) => {
          if(typeof(value) != 'undefined'){
            if (newArr.indexOf(value) === -1) {
              newArr.push(value)
            }
          }

      });
      this.uuidList = newArr;
    },
    deleterecord(){
      this.getUuid();
      if (this.uuidList) {
        deletebank(this.uuidList).then(res=>{
          if(res.data.status == '200'){
                this.$message({message:res.data.msg || "反对账成功",center:true});
                this.getLocalData()
                this.uuidList = [];
              }else{
                this.$message.error({message:res.data.msg || "反对账失败",center:true});
                this.uuidList = [];
              }
          })
        } else {
            this.$message.error({message:"请选择反对账行",center:true});
        }
    },
      //点击行
      handleSelectedRow(row){
        // this.$refs.OrderTable.toggleRowSelection(row);
        if (row) {
            var newId = row.settleNo;
            var selectArr = [];
            this.getDataList.forEach((value) => {
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
      this.getDataList.forEach((value) => {
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
            this.getDataList.forEach((value, index) => {
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
      bulkObj(){
        // this.$store.dispatch('dialogBulk');
      },

        formatTime(row) { //转换时间
            if(row.recordDate !=null){
              return row.recordDate.split('T')[0];
            }
        },
        formatStatus(row) { //单据日期
          if(row.createTime !=null){
             return row.createTime.split('T')[0];
          }
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

