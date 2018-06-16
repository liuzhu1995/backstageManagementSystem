<template>
    <div class="batch-statement">
      <template>
        <el-dialog width="64%" :modal="true" title="条件查询" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="dialogFromStatement" :before-close="dialog_close" :modal-append-to-body="false">
          <el-form >
            <el-form-item label="业务日期" :label-width="formLabelWidth">
              <div class="block">
                <el-date-picker
                v-model="orderReport.getminTime"
                type="daterange"
                size="mini"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="单据状态" :label-width="formLabelWidth">
              <el-select size="mini" v-model="orderReport.invoiceVal" placeholder="请选择单据状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="保存" value="Save"></el-option>
                <el-option label="审核" value="Audited"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对账状态" :label-width="formLabelWidth">
              <el-select size="mini" v-model="orderReport.ReconVal" placeholder="请选择对账状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="未对账" value="UnSettled"></el-option>
                <el-option label="部份对账" value="Part"></el-option>
                <el-option label="全部对账" value="Completely"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否差异处理" :label-width="formLabelWidth">
              <el-select size="mini" v-model="orderReport.differenceVal" placeholder="请选择是否差异处理">
                <el-option label="全部" value=""></el-option>
                <el-option label="是" value="Y"></el-option>
                <el-option label="否" value="N"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="退款状态" :label-width="formLabelWidth">
              <el-select size="mini" v-model="orderReport.RefundVal" placeholder="请选择退款状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="未退款" value="UnSettled"></el-option>
                <el-option label="部分退款" value="Part"></el-option>
                <el-option label="全部退款" value="Completely"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="来源平台" :label-width="formLabelWidth">
              <el-input size="mini" v-model="orderReport.Source" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="销售公司" :label-width="formLabelWidth">
              <el-input size="mini" v-model="orderReport.salesCompany" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="mini" type="primary" @click="determine">确 定</el-button>
            <el-button size="mini" @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </template>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {orderReports,balanceSheetAjax} from '../../axios/api.js'

    export default {
        name: 'batchStatement',
        data () {
            return {
              formLabelWidth: '140px',
              orderReport:{
                salesCompany: '',
                Source: '',
                ReconVal: '',
                invoiceVal: '',
                differenceVal: '',
                RefundVal: '',
                getminTime: '', // 时间
              }

          }
        },
      computed:{
        ...mapState({
          dialogFromStatement:state=>state.dialogFromStatement
        })
      },
      methods: {
        // ...mapActions(["orderReportsData", "getLocalData"]),//简写
        cancel(){ //取消
          this.$store.dispatch('dialogFromStatement')
        },

        // getLocalData(){
        //   // console.log(this.getminTime,"shijian")
        //   this.startTime = this.getminTime[0],
        //   this.endTime= this.getminTime[1];
        //   this.orderpageData.getminTime = this.getminTime;
        //   this.pageObj.getminTime = this.getminTime;
        //     var _this = this;
        //     if(this.$route.fullPath =='/OrderSummary'){
        //       orderReports(
        //       _this.stream.pageNumber,
        //       _this.stream.pageSize,
        //       _this.invoiceVal,
        //       _this.stream.reconStatus,
        //       _this.startTime,
        //       _this.endTime,
        //       _this.ReconVal,
        //       _this.differenceVal,
        //       _this.RefundVal,
        //       _this.Source,
        //       _this.salesCompany
        //     ).then(res=>{
        //       console.log(123);
        //       if(res.status === 200){
        //         this.getLocalDataList = res.data.rows;
        //         //汇总
        //         let ThisData = [];
        //         res.data.rowsTwo.forEach((value, index) => {
        //             ThisData.push({ 'differenceProcessingAmount': value.differenceProcessingAmount });
        //         });
        //         console.log(ThisData, '点击了一次')
        //         this.orderpageData.chayi = ThisData[0].differenceProcessingAmount;
        //         this.orderpageData.orderMonery = ThisData[2].differenceProcessingAmount;
        //         this.orderpageData.orderNum = ThisData[5].differenceProcessingAmount;
        //         this.orderpageData.RefundMonery = ThisData[1].differenceProcessingAmount;
        //         this.orderpageData.RefundNum = ThisData[3].differenceProcessingAmount;
        //         this.orderpageData.chayiNum = ThisData[4].differenceProcessingAmount;
        //         this.loading = false;
        //         this.dialog_close();
        //       }

        //     })
        //    this.$store.dispatch('orderReports',this.getLocalDataList)
        //    this.$store.dispatch('reportPage',this.orderpageData)
        //   }else if(this.$route.fullPath == '/ReceivablesBalance'){
        //       balanceSheetAjax(
        //       _this.stream.pageNumber,
        //       _this.stream.pageSize,
        //       _this.invoiceVal,
        //       _this.stream.reconStatus,
        //       _this.startTime,
        //       _this.endTime,
        //       _this.ReconVal,
        //       _this.differenceVal,
        //       _this.RefundVal,
        //       _this.Source,
        //       _this.salesCompany
        //     ).then(res=>{
        //       if(res.status === 200){
        //         this.balanceData = res.data.rows;
        //         this.transReport = res.data.rowsTwo;
        //         this.pageObj.total = res.data.total;
        //         this.pageObj.totals =res.data.totals;
        //         this.pageObj.completely=res.data.completely;
        //         this.pageObj.completelytwo=res.data.completelytwo;
        //         this.pageObj.part=res.data.part;
        //         this.pageObj.parttwo=res.data.parttwo;
        //         this.pageObj.pool=res.data.pool;
        //         this.pageObj.pooltwo=res.data.pooltwo;
        //         this.pageObj.unsettled=res.data.unsettled;
        //         this.pageObj.unsettledtwo =res.data.unsettledtwo;
        //         console.log(this.pageObj)
        //         this.loading = false;
        //         this.dialog_close();
        //       }

        //     })
        //     this.$store.dispatch('balanceSheet',this.balanceData)
        //     this.$store.dispatch('transRepots',this.transReport)
        //     this.$store.dispatch('pagedefult',this.pageObj)
        //   }

        //   },
        determine(){ //确定
          // this.getLocalData();
          if(this.orderReport.getminTime == ''){
                 this.$message.error({center:true,message:"请选择查询日期"});
                 return false;
              }
          this.$emit('newNodeEvent', this.orderReport)
          this.$store.dispatch('dialogFromStatement')
        },
        dialog_close() {
          this.$store.dispatch('dialogFromStatement')
        },
      }
    }
</script>
<style scoped>
  .el-dialog .el-input{
    max-width: 300px;
  }


</style>
