<template>
    <div class="batch-Differences">
      <template>
        <el-dialog title="批量差异对帐" :visible.sync="dialogFromDifferences" :before-close="dialog_close">
          <el-form :model="form" v-loading="loadDisabled">

            <el-form-item label="单据类型" :label-width="formLabelWidth">
              <el-select size="small" v-model="form.orderType" placeholder="请选择活动区域">
                <el-option v-for="(item,index) in filterData.theTypeOfDocument" :key="index" :label="item.name" :value="item.index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="业务日期" :label-width="formLabelWidth">
              <div class="block">
                <el-date-picker
                  size="small"
                  v-model="tradeTime "
                  type="datetimerange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00']"
                  value-format="yyyy-MM-dd"
                  @change="getTradeTime">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="平台" :label-width="formLabelWidth">
              <el-select size="small" v-model="form.platform" placeholder="请选择活动区域">
                <el-option v-for="(item,index) in filterData.platform" :key="index" :label="item.platformName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="单据状态" :label-width="formLabelWidth">
              <el-select size="small" v-model="form.status" placeholder="请选择活动区域">
                <el-option v-for="(item,index) in filterData.theDocumentsState" :key="index" :label="item.name" :value="item.index"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="对账状态" :label-width="formLabelWidth">
              <el-select size="small" v-model="form.settleStatus" placeholder="请选择活动区域">
                <el-option v-for="(item,index) in filterData.checkTheState" :key="index" :label="item.name" :value="item.index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="交易日期" :label-width="formLabelWidth">
              <div class="block">
                <el-date-picker
                  size="small"
                  v-model="resTime"
                  type="datetime"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期时间"
                  @change="getRecTime">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="差异对帐原因" :label-width="formLabelWidth">
              <el-input size="small" v-model="form.remarks" placeholder="请输入差异对帐原因"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancel">取 消</el-button>
            <el-button size="mini" type="primary" @click="determine" :disabled="loadDisabled">确 定</el-button>
          </div>
        </el-dialog>
      </template>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: 'batchDifferences',
        data () {
            return {
              form: {
                settleStatus: '',//对账状态
                platform: '', //平台
                status: '',//单据状态
                businessDate: '',//开始日期
                businessDateEnd: '',//结束日期
                orderType: '',//单据类型
                remarks: '', //差异对帐原因
                settleDate: '',//对账日期
              },
              formLabelWidth: '100px',
              tradeTime: '',
              resTime: '',
            }
        },
      computed:{
          ...mapState({
            filterData: state => state.filterData,
            dialogFromDifferences:state=>state.dialogFromDifferences,
            loadDisabled: state => state.loadDisabled,
          })
        },
      methods:{
        cancel(){
          this.$store.dispatch('loadDisabled',false);
          this.$store.dispatch('dialogFromDifferences')
        },
        dialog_close(){
          this.$store.dispatch('loadDisabled',false);
          this.$store.dispatch('dialogFromDifferences')
        },
        determine() {
          let flag = this.form.businessDate && this.form.businessDateEnd && this.form.settleDate;
          if(flag) {
            this.$store.dispatch('loadDisabled',true);
            this.$emit('reqMethod',this.form);
          }else{
            this.$message.error('业务日期和交易日期必选');
          }
        },
        getTradeTime(date) { //交易日期
          this.form.businessDate = date[0];
          this.form.businessDateEnd = date[1];
        },
        getRecTime(date) {
          this.form.settleDate = date;
        }
      }
    }
</script>
<style scoped>

</style>
