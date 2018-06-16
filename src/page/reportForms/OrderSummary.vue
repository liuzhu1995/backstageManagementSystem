<template>
    <div class="orderSummary">
      <h3 class="head_title">订单执行汇总表</h3>
      <batchStatement @newNodeEvent="parentLisen"></batchStatement>
      <!-- <div>{{orderReportData}}</div> -->
      <template>
        <el-row>
          <el-button size="small" type="primary" @click="transformStatus">条件查询</el-button>
          <el-button size="small" type="primary" @click="Export">导出</el-button>
        </el-row>
      </template>
      <template>
        <el-card class="box-card">
          <el-form >
            <el-row>
              <el-col :md="12" >
                <el-form-item label="业务日期" :label-width="formLabelWidth">
                    <div class="block">
                      <el-date-picker
                        size="mini"
                        value-format="yyyy-MM-dd"
                        v-model="orderReportPage.getminTime"
                        :disabled="true"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </div>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row class="left">
              <el-col  :md="8" >
                <el-form-item label="订单汇总金额" :label-width="formLabelWidth">
                  <el-input
                    size="mini"
                    v-model="orderReportPage.orderMonery"
                    :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col  :md="8" >
                <el-form-item label="差异汇总金额" :label-width="formLabelWidth">
                  <el-input
                    size="mini"
                    v-model="orderReportPage.chayi"
                    :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :md="8">
                <el-form-item label="退款总笔数" :label-width="formLabelWidth">
                  <el-input
                    size="mini"
                    v-model="orderReportPage.RefundNum"
                    :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="left">
              <el-col :md="8">
                <el-form-item label="订单总笔数" :label-width="formLabelWidth">
                  <el-input
                    size="mini"
                    v-model="orderReportPage.orderNum"
                    :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :md="8">
                <el-form-item label="差异总笔数" :label-width="formLabelWidth">
                  <el-input
                    size="mini"
                    v-model="orderReportPage.chayiNum"
                    :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :md="8">
                <el-form-item label="退款汇总金额" :label-width="formLabelWidth">
                  <el-input
                    size="mini"
                    v-model="orderReportPage.RefundMonery"
                    :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </template>
      <template>
        <el-table
          border
          :data="getLocalDataList"
          highlight-current-row
          height="300">
          <el-table-column type="index" label="序号" width="60">
          </el-table-column>
          <el-table-column prop="businessDate" label="业务日期" width="100" :formatter="formatTime">
          </el-table-column>
          <el-table-column prop="billNo" label="单据编号" width="160">
          </el-table-column>
          <el-table-column prop="customer.name" label="来源平台" width="120">
          </el-table-column>
          <el-table-column prop="orderNo" label="来源订单号" width="180">
          </el-table-column>
          <el-table-column prop="salesCompany" label="销售公司" width="160">
          </el-table-column>
          <el-table-column prop="salesDepartment" label="销售部门" width="100">
          </el-table-column>
          <el-table-column prop="status" label="单据状态" :formatter="formatStatus" width="90">
          </el-table-column>
          <el-table-column prop="totalAmount" label="总金额" width="90">
          </el-table-column>
          <el-table-column prop="settleStatus" label="对账状态" width="100" :formatter="formatSettleStatus">
          </el-table-column>
          <el-table-column prop="settleAmount" label="已对账金额" width="100">
          </el-table-column>
          <el-table-column prop="unsettleAmount" label="未对账金额" width="100">
          </el-table-column>
          <el-table-column prop="differenceProcessingStatus" :formatter="formatDifferenceProcessingStatus" label="是否差异处理" width="120">
          </el-table-column>
          <el-table-column prop="differenceProcessingAmount" label="差异处理金额" width="120">
          </el-table-column>
          <el-table-column prop="differenceProcessingRamarks" label="差异处理原因" width="140">
          </el-table-column>
          <el-table-column prop="reconStatus" :formatter="formatReconStatus" label="退款状态" width="80">
          </el-table-column>
          <el-table-column prop="settlementMoney" label="已退款金额" width="100">
          </el-table-column>
          <el-table-column prop="unsettlementMoney" label="未退款金额" width="100">
          </el-table-column>
        </el-table>
      </template>
      <template>
        <div class="block">
            <el-pagination @size-change="handleSizeChangeBank" @current-change="handleCurrentChangeBank" :current-page="stream.selectPageNumber" :page-sizes="[100, 200, 500, 1000,1500]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="stream.total">
            </el-pagination>
        </div>
      </template>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {orderReports} from '../../axios/api'
  import api from '../../axios/url.js'
  import batchStatement from '../../components/filterBox/batchStatement'
    export default {
        name: 'orderSummary',
        components: {
          batchStatement
        },
        data () {
            return {
              formLabelWidth: '120px',
              form: {
                time: '',//时间
                documentsState: '',//单据状态
                checkState: '', //对账状态
                differenceStatus: '',//差异处理状态
                refundStatus: '',//退款状态
                platform: '',//平台
                company: '',//公司
              },
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
            orderReportPage:{
              chayi:'',
              orderMonery:'',
              orderNum:'',
              RefundMonery:'',
              RefundNum:'',
              chayiNum:'',
              getminTime:[],
            },
            getminTime:[],
            input1:'',
            disabled:true,
              loading: true,
              getLocalDataList: [],//请求的数据
              valueDis:[],

            }
        },
        computed: {
          ...mapState({
            // orderReportData: state=>state.orderReportData
          })

        },
        mounted() {
          // this.getLocalData()

        },
        methods: {
          //导出
        Export: function() {
            let _this = this;
            var val = this.valueDis;

            if (this.orderReportPage.getminTime == '') {
                this.$message.error({message:"请条件查询后点击导出..",center:true})
            } else if (_this.getLocalDataList == [] || _this.getLocalDataList.length == 0) {
                this.$message.error({message:"没有可导出的数据..",center:true})
            } else {
              var startTime = val.getminTime[0];
              var endTime= val.getminTime[1];
                window.location.href = api.Hallowmas + "/orderReceivable/orderDetailsExcel?companyOwning=" + "" + "&status=" + val.invoiceVal + "&reconStatus=" + _this.stream.reconStatus + "&businessDateStart=" + startTime + "&businessDateEnd=" + endTime + "&settleStatus=" + val.ReconVal + "&differenceProcessingStatus=" + val.differenceVal + "&settlementStatus=" + val.RefundVal + "&platform=" + val.Source + "&salesCompany=" + val.salesCompany

            }
        },
          parentLisen(val){
            console.log(val);
              this.valueDis = val;
              this.getminTime =val.getminTime;
              var startTime = val.getminTime[0];
              var endTime= val.getminTime[1];
              this.orderReportPage.getminTime = val.getminTime;
              this.loading = true;
              orderReports(
              this.stream.pageNumber,
              this.stream.pageSize,
              val.invoiceVal,
              this.stream.reconStatus,
              startTime,
              endTime,
              val.ReconVal,
              val.differenceVal,
              val.RefundVal,
              val.Source,
              val.salesCompany
            ).then(res=>{
              if(res.status === 200){
                this.getLocalDataList = res.data.rows;
                this.stream.total = res.data.total;
                //汇总
                let ThisData = [];
                res.data.rowsTwo.forEach((value, index) => {
                    ThisData.push({ 'differenceProcessingAmount': value.differenceProcessingAmount });
                });
                // console.log(ThisData, '点击了一次')
                this.orderReportPage.chayi = ThisData[0].differenceProcessingAmount;
                this.orderReportPage.orderMonery = ThisData[2].differenceProcessingAmount;
                this.orderReportPage.orderNum = ThisData[5].differenceProcessingAmount;
                this.orderReportPage.RefundMonery = ThisData[1].differenceProcessingAmount;
                this.orderReportPage.RefundNum = ThisData[3].differenceProcessingAmount;
                this.orderReportPage.chayiNum = ThisData[4].differenceProcessingAmount;
                this.loading = false;
                // this.dialog_close();
              }

            })
          },
          getOrderBefore(){
              var val = this.valueDis;
              var startTime = val.getminTime[0];
              var endTime= val.getminTime[1];
              this.loading = true;
              this.orderReportPage.getminTime = val.getminTime;
              orderReports(
              this.stream.pageNumber,
              this.stream.pageSize,
              val.invoiceVal,
              this.stream.reconStatus,
              startTime,
              endTime,
              val.ReconVal,
              val.differenceVal,
              val.RefundVal,
              val.Source,
              val.salesCompany
            ).then(res=>{
              if(res.status === 200){
                this.getLocalDataList = res.data.rows;
                this.stream.total = res.data.total;
                //汇总
                let ThisData = [];
                res.data.rowsTwo.forEach((value, index) => {
                    ThisData.push({ 'differenceProcessingAmount': value.differenceProcessingAmount });
                });
                this.orderReportPage.chayi = ThisData[0].differenceProcessingAmount;
                this.orderReportPage.orderMonery = ThisData[2].differenceProcessingAmount;
                this.orderReportPage.orderNum = ThisData[5].differenceProcessingAmount;
                this.orderReportPage.RefundMonery = ThisData[1].differenceProcessingAmount;
                this.orderReportPage.RefundNum = ThisData[3].differenceProcessingAmount;
                this.orderReportPage.chayiNum = ThisData[4].differenceProcessingAmount;
                this.loading = false;
              }

            })
          },
          transformStatus(){
            this.$store.dispatch('dialogFromStatement')
            console.log(this.$route)
          },

          handleSizeChangeBank(val) {
            this.stream.pageSize = val;
            this.getOrderBefore();
        },
        handleCurrentChangeBank(val) {
            this.stream.selectPageNumber = val;
            this.stream.pageNumber = val;
            this.getOrderBefore()
        },
          //数格式转换
          formatTime(row) { //转换时间
            return row.businessDate.split('T')[0];
          },
          formatStatus(row) { //单据状态
            return (row.status === 'Save' && '保存') || (row.status === 'Audited' && '审核')|| (row.status === 'HandClose' && '手工关闭') || (row.status === 'AutoClose' && '自动关闭');
          },
          formatSettleStatus(row) { //对账状态
            return (row.settleStatus === "UnSettled" && '未对账') || (row.settleStatus === "Part" && '部分对账') || (row.settleStatus === 'Completely' && '完全对账');
          },
          formatDifferenceProcessingStatus(row) { //差异处理状态
            return (row.differenceProcessingStatus === "Y" && '是') || (row.differenceProcessingStatus === "N" && '否');
          },
          formatReconStatus(row) { //退款状态
            return (row.reconStatus === 'UnSettled' && '未退款') || (row.reconStatus === 'Part' && '部分退款') || (row.reconStatus === 'Completely' && '完全退款')
          },
          formatOrderType(row) { //退款状态
            return (row.orderType === '0' && '平台订单') || (row.orderType === '1' && '手工订单')
          },
        }
    }
</script>
<style scoped>
  .el-row .el-date-editor,.el-input,.el-select{
    width: 100%;
    max-width: 220px;
  }
  .box-card .el-row{
    margin-bottom: 10px;
  }
  .el-form-item{
    margin-bottom: 10px;
  }
  .box-card{
    margin-bottom: 20px;
    padding-bottom: 0;
  }
  .left{
    float: left;
  }
</style>
