<template>
  <div class="bill">
    <template>
      <el-dialog
      title="结算详情"
      :visible.sync="dialogFromBill"
      :before-close="dialog_close">
        <div class="details-box">
          <ul class="names">
            <li></li>
            <li v-for="(item,index) in name" :key="index">{{item.name}}</li>
          </ul>
          <ul>
            <li>平台对账单</li>
            <li v-for="(item,index) in platform" :key="index">{{item}}</li>
          </ul>
          <ul>
            <li>系统对账单</li>
            <li v-for="(item,index) in system" :key="index">{{item}}</li>
          </ul>
          <ul>
            <li>已对账金额</li>
            <li v-for="(item,index) in verify" :key="index">{{item}}</li>
          </ul>
          <ul>
            <li>差异金额</li>
            <li v-for="(item,index) in difference" :key="index">{{item}}</li>
          </ul>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
  import {billData} from '../../axios/api'
    import {mapState} from 'vuex'
    export default {
      name: "bill",
      props: ['selectedData'],
      data() {
        return {
          name: [
            {name: '销售额',type: 'totalAmount'},
            {name: '退款金额',type: 'refundAmount'},
            {name: '技术服务费',type: 'serviceAmount'},
            {name: '赔款金额',type: 'indemnityAmount'},
            {name: '运费补偿',type: 'freightAmount'},
            {name: '贵就赔',type: 'indemnityHighAmount'},
            {name: '佣金支付净额',type: 'commissionAmount'},
            {name: '扣款',type: 'chargebackAmount'},
            {name: '返现金额',type: 'cashBackAmount'},
            {name: '保证金',type: 'depositAmount'},
            {name: '推手佣金',type: 'commissionPushedAmount'},
            {name: '贝店店主佣金',type: 'commissionShopkeeperAmount'},
            {name: '贝贝高佣返现',type: 'commissionDepositAmount'},
            {name: '订单贷技术服务费',type: 'serviceOrderLoanAmount'},
            {name: '本金还贷金额',type: 'repaymentAmount'},
            {name: '贝店品牌合作人扣款',type: 'chargebackPartnerAmount'},
            {name: '本地结算金额',type: 'settlementAmount'}
          ],
          platform:[],
          system: [],
          verify: [],
          difference: [],
          transactionInfoList: [],
        }
      },
      watch: {
        dialogFromBill(newValue) {
          if(newValue) {
            this.getDetail();
          }
        }
      },
      computed: {
        ...mapState({
          dialogFromBill: state => state.dialogFromBill
        })
      },
      methods: {
        dialog_close() {
          this.$store.dispatch('dialogFromBill')
        },
        sort(data) {
          console.log(data);
          let i;
          let arr = [];
          let length = this.name.length;
          for(i = 0;i < length;i+=1) {
            console.log(data[this.name[i].type]);
            arr.push(data[this.name[i].type])
          }
          return arr;
        },
        filterData() {
          let i;
          let length = this.transactionInfoList.length;
          for(i = 0;i < length;i += 1) {
            let name = this.transactionInfoList[i].name;
            switch (name) {
              case '平台对账单':
                this.platform = this.sort(this.transactionInfoList[i]);
                break;
              case '系统对账单':
                this.system = this.sort(this.transactionInfoList[i]);
                break;
              case '已对账金额':
                this.verify = this.sort(this.transactionInfoList[i]);

                break;
              case '差异金额':
                this.difference = this.sort(this.transactionInfoList[i]);
                break;
            }
          }
        },
        getDetail() {
          let uuid = this.selectedData.uuid;
          billData(uuid).then(res=>{
            if(res.data.status === '200') {
              this.transactionInfoList = res.data.obj;
              this.filterData()
            }
          });
        }
      }
    }
</script>

<style scoped>
  .el-dialog{
    width: 60%;
  }
  .details-box {
    border: 1px solid #ebeef5;
    display: -webkit-box;
    display: flex;
  }
  .details-box ul {
    flex: 1;
    border-right: 1px solid #ebeef5;
  }
  .details-box li {
    border-bottom: 1px solid #ebeef5;
    color: #606266;
    height: 24px;
    list-style: none;
    padding-right: 10px;
    padding-left: 10px;
  }
</style>
