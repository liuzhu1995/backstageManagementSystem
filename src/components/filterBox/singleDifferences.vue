<template>
  <div class="single-differences">
    <el-dialog title="差异对账" :visible.sync="dialogDifferences" :before-close="dialog_close">
      <el-row>
        <div class="batch-modify">
          <el-input type="text" size="mini" v-model="inputValue">
            <el-button size="mini" type="primary" slot="append" @click="batchModify">批量修改</el-button>
          </el-input>
        </div>
        <el-button size="mini" type="danger" plain @click="selectDelete">删除</el-button>
        <div class="time-box">
          <span class="demonstration">对账日期：</span>
          <el-date-picker
            size="mini"
            v-model="dataMore.settleDate"
            type="datetime"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间"
            @change="getTime">
          </el-date-picker>
        </div>
      </el-row>
      <el-table
        v-loading="loadDisabled"
        border
        ref="diffTable"
        :summary-method="getSummaries"
        show-summary
        :data="tableData"
        :empty-text="empty"
        height="300"
        @cell-click="handleSelectedCeil"
        @select-all="handleSelectedAll"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="billNo" label="订单编号" width="200"></el-table-column>
        <el-table-column prop="customer" label="来源平台" width="200"></el-table-column>
        <el-table-column prop="businessDate" label="业务日期" width="100" :formatter="formatTime"></el-table-column>
        <el-table-column prop="totalAmount" label="总金额" width="150" :formatter="totalAmount"></el-table-column>
        <el-table-column prop="settleAmount" label="已对账金额" width="150"></el-table-column>
        <el-table-column prop="unSettleAmount" label="未对账金额" width="150" :formatter="formatAmount"></el-table-column>
        <el-table-column prop="unSettleAmount" label="差异处理金额" width="150" :formatter="formatAmount"></el-table-column>
        <el-table-column  prop="differenceProcessingRamarks" label="差异处理原因" width="200">
          <template slot-scope="scope">
            <span v-show="!scope.row.checked">{{scope.row.differenceProcessingRamarks}}</span>
            <el-input v-show="scope.row.checked" size="mini" v-model="scope.row.differenceProcessingRamarks" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel">取 消</el-button>
        <el-button size="mini" type="primary" @click="determine" :disabled="loadDisabled">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
      name: "singleDifferences",
      props: {
        'selectData': Array,
      },
      data() {
        return {
          tableData: [],//差异对账数据
          selectedData: [],//选中的数据
          inputValue: '',//批量修改的值
          empty:'单据状态为保存、完全对账，对账状态为异常的数据不能差异对账',
          dataMore: {
            settleDate: '',//对账日期
            dataList: []
          }
        }
      },
      watch: {
        dialogDifferences(newValue) {
          if(newValue){
           this.tableData = this.filterData();
          }
        }
      },
      computed: {
        ...mapState({
          dialogDifferences: state => state.dialogDifferences,
          loadDisabled: state => state.loadDisabled,
        })
      },
      methods: {
        cancel(){ //取消
          this.$store.dispatch('loadDisabled',false);

          this.$store.dispatch('dialogDifferences')
        },
        dialog_close() { //右上角关闭
          this.$store.dispatch('loadDisabled',false);
          this.$store.dispatch('dialogDifferences')
        },
        determine() { //确认
          if(this.dataMore.settleDate) {
            let i;
            let length = this.selectedData.length;
            for(i = 0;i < length;i++) {
              console.log(this.selectedData[i]);
              this.dataMore.dataList.push({
                uuid: this.selectedData[i].uuid,
                differenceProcessingAmount: this.selectedData[i].unSettleAmount || this.selectedData[i].unsettleAmount,
                differenceProcessingRamarks: this.selectedData[i].differenceProcessingRamarks})
            }
            this.$store.dispatch('loadDisabled',true);
            this.$emit('reqMethod',this.dataMore);
          }else {
            this.$message.error('请选择对账日期');
          }

        },
        getTime(date) {//获取正确格式时间
          this.dataMore.settleDate = date;
        },
        filterData() { //过滤出符合条件的数据
          let selectData = JSON.stringify(this.selectData); //防止影响父元素数据
          selectData = JSON.parse(selectData);
          if(selectData.length) {
            let i;
            let arr = [];
            let length = selectData.length;
            for(i = 0;i < length;i++) {
              let value = selectData[i];
              if(value.status === 'Audited' &&
                value.settleStatus !== 'Completely' &&
                value.settleStatus !== 'Exception') {
                arr.push(value)
              }
            }
            return arr;
          }
        },
        totalAmount(row) {
          if(row.totalAmount || row.transAmount) {
            return row.totalAmount || row.transAmount
          }
        },
        formatAmount(row) {
          if(row.unSettleAmount || row.unsettleAmount) {
            return row.unSettleAmount || row.unsettleAmount;
          }
        },
        formatTime(row) { //转换时间
          if(row.businessDate || row.clearDate){
            let time = row.clearDate || row.businessDate;
            return time.split('T')[0];
          }
        },
        getSummaries(param) { //总值
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => { //将符合的条件的列的值设置为空
            if (index === 0 || index === 1 || index === 2 || index === 3 || index === columns.length-1) {
              sums[index] = '';
              return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return (prev * 1000 + curr * 1000) / 1000;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] += ' 元';
            } else {
              sums[index] = 'N/A';
            }
          });

          return sums;
        },

        handleSelectedCeil(row,even){//点击行
          if(even.label !== '差异处理原因') {
            this.$refs.diffTable.toggleRowSelection(row);
            this.singleSelected(row)
          }
        },
        handleSelectedAll() {//全选
          let i;
          let length =  this.tableData.length;
          for(i = 0;i < length;i += 1) {
            this.singleSelected(this.tableData[i]);
          }
        },
        handleSelectionChange(val){ //获取所有选中的数据
          this.selectedData = val;
        },
        singleSelected(row) { //显示隐藏修改框
          if (typeof row.checked === 'undefined') {
            this.$set(row, 'checked', true);
          } else {
            row.checked = !row.checked
          }
        },
        batchModify() { //批量修改
          let i;
          let length = this.selectedData.length;
          for(i = 0;i < length;i++){
            this.selectedData[i].differenceProcessingRamarks = this.inputValue;
          }
          this.inputValue = '';
        },
        selectDelete() { //删除
          if(this.tableData) {
            let i;
            let length = this.selectedData.length;
            for(i = 0;i < length; i += 1) {
              let index = this.tableData.indexOf(this.selectedData[i]);
              if(index !== -1){
                this.tableData.splice(index,1);
              }
            }
          }
        }

      }
    }
</script>

<style scoped>
  .el-table{
    overflow-y: auto;
  }
  .el-dialog{
    width: 86%;
  }
  .el-row{
    display: -webkit-box;
    display: flex;
    justify-content: center;
    margin-bottom: 0;
  }
  .batch-modify{
    display: -webkit-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
  }
  .el-dialog .el-input{
    width: 250px;
  }
  .time-box{
    flex: 1;
    justify-content: flex-end;
    display: flex;
  }
  .time-box .el-input{
    width: 200px;
  }
  .demonstration{
    color: #909399;
    font-weight: 600;
  }
</style>
