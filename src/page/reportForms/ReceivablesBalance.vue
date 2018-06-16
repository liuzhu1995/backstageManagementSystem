<template>
    <div class="order-receivable">
      <h3 class="head_title">收款对账余额表</h3>
      <batchStatement @newNodeEvent="balanceClick"></batchStatement>
      <template>
        <el-row>
          <el-button size="mini" type="primary" @click="transformStatus">条件查询</el-button>
          <el-button size="mini" type="primary" @click="Export">导出</el-button>
        </el-row>
      </template>
      <template>
        <el-form :model="form">
          <el-row >
            <el-col  :md="9" >
              <el-form-item label="业务日期" :label-width="formLabelWidth">
                <div class="block">
                  <el-date-picker
                    size="mini"
                    v-model="pageData.getminTime"
                    type="daterange"
                    disabled
                    value-format="yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="box-card">
              <h5>订单应收未对账</h5>
              <el-form :model="form">
                <el-row >
                  <el-col  :md="12" >
                    <el-form-item label="期初余额:" :label-width="formLabelWidth">
                      <el-input size="mini" v-model="pageData.completely" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col  :md="12" >
                    <el-form-item label="本期总金额:" :label-width="formLabelWidth">
                      <el-input size="mini" v-model="pageData.unsettled" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col  :md="12" >
                    <el-form-item label="本期已对账:" :label-width="formLabelWidth">
                      <el-input size="mini" v-model="pageData.part" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col  :md="12" >
                    <el-form-item label="对后期末余额:" :label-width="formLabelWidth">
                      <el-input size="mini" v-model="pageData.pool" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <template>
                <h5>订单明细</h5>
                <el-table
                  border
                  v-loading="loading"
                  ref="OrderTable"
                  :data="balanceData"
                  highlight-current-row
                  height="300">
                  <el-table-column type="index" label="序号" width="60">
                  </el-table-column>
                  <el-table-column prop="businessDate" label="日期" width="100" :formatter="formatTime">
                  </el-table-column>
                  <el-table-column prop="customer.name" label="平台" width="160">
                  </el-table-column>
                  <el-table-column prop="orderNo" label="平台订单号" width="140">
                  </el-table-column>
                  <el-table-column prop="totalAmount" label="总金额" width="100">
                  </el-table-column>
                  <el-table-column prop="unsettleAmount" label="未对账金额" width="100">
                  </el-table-column>
                  <el-table-column prop="settleAmount" label="已对账金额" width="100">
                  </el-table-column>
                </el-table>
              </template>
              <div class="block">
                  <el-pagination @size-change="handleSizeChangeBank" @current-change="handleCurrentChangeBank" :current-page="stream.selectPageNumber" :page-sizes="[100, 200, 500, 1000,1500,20000]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="stream.total">
                  </el-pagination>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <h5>交易流水未对账</h5>
              <el-form :model="form">
                <el-row >
                  <el-col  :md="12" >
                    <el-form-item label="期初余额:" :label-width="formLabelWidth">
                      <el-input size="mini" v-model="pageData.completelytwo" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col  :md="12" >
                    <el-form-item label="本期总金额:" :label-width="formLabelWidth">
                      <el-input size="mini" v-model="pageData.unsettledtwo" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col  :md="12" >
                    <el-form-item label="本期已对账:" :label-width="formLabelWidth">
                      <el-input size="mini" v-model="pageData.parttwo" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col  :md="12" >
                    <el-form-item label="对后期末余额:" :label-width="formLabelWidth">
                      <el-input size="mini" v-model="pageData.pooltwo" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <template>
                <h5>流水明细</h5>
                <el-table
                  border
                  v-loading="loading"
                  ref="OrderTable"
                  :data="transReport"
                  highlight-current-row
                  height="300">
                  <el-table-column type="index" label="序号" width="60">
                  </el-table-column>
                  <el-table-column prop="transTime" label="日期" width="100" :formatter="formTime">
                  </el-table-column>
                  <el-table-column prop="platformName" label="平台" width="120">
                  </el-table-column>
                  <el-table-column prop="transNo" label="交易流水号" width="140">
                  </el-table-column>
                  <el-table-column prop="transAmount" label="交易金额" width="100">
                  </el-table-column>
                  <el-table-column prop="unsettleAmount" label="未对账金额" width="100">
                  </el-table-column>
                  <el-table-column prop="settleAmount" label="已对账金额" width="100">
                    </el-table-column>
                </el-table>
              </template>
              <div class="block">
                  <el-pagination @size-change="flowingWater" @current-change="flowingWaterCurrent" :current-page="streamTwo.selectPageNumber" :page-sizes="[100, 200, 500, 1000,1500,20000]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="streamTwo.totals">
                  </el-pagination>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </template>
    </div>
</template>

<script>
  import {getOrderReceivable,balanceSheetAjax} from '../../axios/api'
  import {mapState} from 'vuex'
  import api from '../../axios/url.js'
  import batchStatement from '../../components/filterBox/batchStatement'
    export default {
        name: 'orderReceivable',
        components: {
          batchStatement
        },
        data () {
            return {
              formLabelWidth: '120px',
              loading: false,
              form: {
                time: '',//时间
                documentsState: '',//单据状态
                checkState: '', //对账状态
                differenceStatus: '',//差异处理状态
                refundStatus: '',//退款状态
                platform: '',//平台
                company: '',//公司
              },
              balanceData:[],
              transReport:[],
              stream: {
                companyOwning: '',
                pageNumber: 1,
                pageSize: 100,
                selectPageNumber: 0,
                reconStatus: 'UnSettled,Part',
                settleStatus: 'UnSettled,Part',
                status: 'Audited',
                total: 0
            },
            streamTwo: {
                companyOwning: '',
                pageNumber: 1,
                pageSize: 100,
                selectPageNumber: 0,
                reconStatus: 'UnSettled,Part',
                settleStatus: 'UnSettled,Part',
                status: 'Audited',
                totals: 0
            },
             pageData:{
              total:'',
              totals:'',
              completely:'',
              completelytwo:'',
              part:'',
              parttwo:'',
              pool:'',
              pooltwo:'',
              unsettled:'',
              unsettledtwo:'',
              getminTime:'',
            },
            valueData:[],
            }
        },
        computed:{
          ...mapState({

          })
        },
        mounted(){
        },
        methods: {
          //导出
          Export: function() {
            let _this = this;
            var val = this.valueData;

            if (this.pageData.getminTime == '') {
                // toastr.warning('请条件查询后点击导出...');
                this.$message.error({message:"请条件查询后点击导出..",center:true})
            } else if (_this.getLocalDataList == [] || _this.getLocalDataList.length == 0) {
                this.$message.error({message:"没有可导出的数据..",center:true})
            } else {
              var startTime = val.getminTime[0];
              var endTime= val.getminTime[1];
                window.location.href = api.Hallowmas+"/SettlePlatform/orderReceivable/orderDetailsExcel?companyOwning=" + "" + "&status=" + val.invoiceVal + "&reconStatus=" + _this.stream.reconStatus + "&businessDateStart=" + startTime + "&businessDateEnd=" + endTime + "&settleStatus=" + val.ReconVal + "&differenceProcessingStatus=" + val.differenceVal + "&settlementStatus=" + val.RefundVal + "&platform=" + val.Source + "&salesCompany=" + val.salesCompany

            }
            // console.log('点击了下载', window.open = getRootPath() + "/orderReceivable/orderDetailsExcel?companyOwning=" + "" + "&status=" + _this.invoiceVal + "&reconStatus=" + _this.stream.reconStatus + "&businessDateStart=" + startTime + "&businessDateEnd=" + endTime + "&settleStatus=" + _this.ReconVal + "&differenceProcessingStatus=" + _this.differenceVal + "&settlementStatus=" + _this.RefundVal + "&platform=" + _this.Source + "&salesCompany=" + _this.salesCompany);
          },
          balanceClick(value){
            console.log(value)
            this.pageData.getminTime =value.getminTime;
              this.valueData = value;
              var startTime = value.getminTime[0];
              var endTime= value.getminTime[1];
              this.loading = true;
             balanceSheetAjax(
              this.stream.pageNumber,
              this.stream.pageSize,
              this.streamTwo.pageNumber,
              this.streamTwo.pageSize,
              this.invoiceVal,
              this.stream.reconStatus,
              startTime,
              endTime,
              value.ReconVal,
              value.differenceVal,
              value.RefundVal,
              value.Source,
              value.salesCompany
            ).then(res=>{
              if(res.status === 200){
                this.balanceData = res.data.rows;
                this.transReport = res.data.rowsTwo;
                this.stream.total = res.data.total;
                this.streamTwo.totals =res.data.totals;
                this.pageData.completely=res.data.completely;
                this.pageData.completelytwo=res.data.completelytwo;
                this.pageData.part=res.data.part;
                this.pageData.parttwo=res.data.parttwo;
                this.pageData.pool=res.data.pool;
                this.pageData.pooltwo=res.data.pooltwo;
                this.pageData.unsettled=res.data.unsettled;
                this.pageData.unsettledtwo =res.data.unsettledtwo;
                console.log(this.pageData)
                this.loading = false;
              }

            })
          },

          getAjax(){
            var value = this.valueData;
            this.pageData.getminTime =value.getminTime;
              var startTime = value.getminTime[0];
              var endTime= value.getminTime[1];
              this.loading = true;
            balanceSheetAjax(
              this.stream.pageNumber,
              this.stream.pageSize,
              this.streamTwo.pageNumber,
              this.streamTwo.pageSize,
              this.invoiceVal,
              this.stream.reconStatus,
              startTime,
              endTime,
              value.ReconVal,
              value.differenceVal,
              value.RefundVal,
              value.Source,
              value.salesCompany
            ).then(res=>{
              if(res.status === 200){
                this.balanceData = res.data.rows;
                this.transReport = res.data.rowsTwo;
                this.stream.total = res.data.total;
                this.streamTwo.totals =res.data.totals;
                this.pageData.completely=res.data.completely;
                this.pageData.completelytwo=res.data.completelytwo;
                this.pageData.part=res.data.part;
                this.pageData.parttwo=res.data.parttwo;
                this.pageData.pool=res.data.pool;
                this.pageData.pooltwo=res.data.pooltwo;
                this.pageData.unsettled=res.data.unsettled;
                this.pageData.unsettledtwo =res.data.unsettledtwo;
                console.log(this.pageData)
                this.loading = false;
              }

            })
          },

          transformStatus(){
            this.$store.dispatch('dialogFromStatement')
          },
          handleSizeChangeBank(val) {
            this.stream.pageSize = val;
            this.getAjax()
        },
        handleCurrentChangeBank(val) {
            this.stream.selectPageNumber = val;
            this.stream.pageNumber = val;
            this.getAjax()
        },

        //流水
        flowingWater(val) {
            this.streamTwo.pageSize = val;
            this.getAjax()
        },
        flowingWaterCurrent(val) {
            this.streamTwo.selectPageNumber = val;
            this.streamTwo.pageNumber = val;
            this.getAjax()
        },

          //数格式转换
          formatTime(row) { //转换时间
            return row.businessDate.split('T')[0];
          },
          //日期
          formTime(row){
            return row.transTime.split('T')[0];
          },
        }
    }
</script>
<style scoped>
  .el-row .el-date-editor,.el-input,.el-select{
    width: 100%;
    max-width: 300px;
  }
  .el-form-item{
  margin-bottom:0;
}
  .container .el-row{
    height:auto;
  }
  .el-row{
    margin-bottom: 0;
  }
  h5{
    margin: 0;
  }
  .el-table{
    margin-top: 8px;
  }
  .el-input__inner{
    color: #333!important;
  }
  table .cell{
    display: block;
  }
</style>
