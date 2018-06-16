<template>
    <div class="verify-automate">
      <h3 class="head_title">自动对账</h3>
      <template>
        <el-row>
          <el-button size="mini" type="primary" @click="changeDisabled" :disabled="disabled">收款对账</el-button>
          <el-button size="mini" type="primary" @click="changeDisabled" :disabled="!disabled">退款对账</el-button>
        </el-row>
      </template>

      <template>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="box-card">
              <h5>参数选择</h5>
              <el-form >
                <el-row >
                  <el-col :md="24">
                    <el-form-item label="平台:">
                      <el-select size="mini" v-model="ruleValue" multiple collapse-tags placeholder="请选择">
                        <el-option
                          v-for="item in platData"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>

                  </el-col>
                  <el-col :md="24">
                    <el-form-item label="参与核销单据的业务日期小于等于:" >
                      <el-date-picker
                        size="small"
                        v-model="busineseDate"
                        placeholder="选择日期时间"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :md="24">
                    <el-form-item label="自动产生对账记录的对账日期为:" >
                      <el-date-picker
                        size="small"
                        v-model="reconDate"
                        placeholder="选择日期时间" value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <h5>规则选择</h5>
              <el-form >
                <el-row >
                  <el-button size="mini" type="primary">上移</el-button>
                  <el-button size="mini" type="primary">下移</el-button>
                </el-row>
              </el-form>
              <template>
                <el-table
                  border
                  ref="orderTable"
                  :data="ruleList"
                  highlight-current-row
                  max-height="164"
                  style="margin-top: 10px"
                  tooltip-effect="dark"
                  @row-click="rowClickPayment">
                      <el-table-column
                          type="index"
                          label="序号"
                          width="60">
                      </el-table-column>
                      <el-table-column
                          prop="name"
                          label="对账方案">
                      </el-table-column>
                      <el-table-column label="选中" width="136">
                          <template slot-scope="scope">
                              <el-radio class="radio" v-model="radio"  :label="scope.$index"  @change.native="getCurrentRow(scope.$index)" >&nbsp;</el-radio>
                          </template>
                      </el-table-column>
                </el-table>
              </template>
            </el-card>
          </el-col>
        </el-row>
      </template>
      <div class="execute-btn">
        <el-row>
          <el-button size="small" @click="clickAuto">执行对账</el-button>
          <el-button size="small" type="primary">退出</el-button>
        </el-row>
      </div>
      <template>
      <getWebSocket></getWebSocket>

      </template>
      <!-- <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="80" color="rgba(142, 113, 199, 0.7)"></el-progress>
        <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">关 闭</el-button>
  </span>
      </el-dialog> -->
    </div>
</template>

<script>
import {getPlatform,initRules,autoAjax} from "../../axios/api.js"
import{mapState} from 'vuex'
import getWebSocket from "../../components/getWebSocket/getWebSocket"
    export default {
        name: 'verifyAutomate',
        components:{
          getWebSocket
        },
        data () {
            return {
              disabled: true,//状态
              isRefundCilitaionType: 'collect', //收退款对账 collect收 retreat退
              radio: '1',
              dialogVisible: false,
              ruleList: [], //对账规则
              ruleValue: [], //对账规则值
              progressBar: false,
              socketSchedule: '', //socket
              socketStatus: '',
              socketDatatext: '',
              guanbi: false, //进度条关闭
              platData: [], //平台
              rulesId: '',
              busineseDate: '', // 业务日期
              reconDate: '', //对账日期
            }
        },
        mounted(){
          this.platfun();
          this.initrule();
        },
        methods:{
          //平台
          platfun(){
            var that = this;
            getPlatform().then(res=>{
              that.platData = res.data.obj;
            })
          },
          //点击事件
          rowClickPayment(row) {
            console.log(row.id)
            this.rulesId = row.id;
            this.$refs.orderTable.toggleRowSelection(row)
            this.radio = this.ruleList.indexOf(row);
        },
        //规则
        initrule(){
          var _this = this;
          initRules().then(res=>{
            if (res.data.obj) {
                _this.ruleList = res.data.obj;
            }
          })
        },
        //选中
        getCurrentRow(val) {
            console.log(val)
        },
        //执行对账
        clickAuto(){
          var _this = this;
          var that = this;
          var url1 = 'autoSettle';
          if (this.isRefundCilitaionType === 'retreat') {
              url1 = 'refundAutoSettle';
          }
          if (this.busineseDate === '') {
                this.$message.error({message:"请选择业务日期",center: true});
                return false
            }
            if (this.reconDate === '') {
                this.$message.error({message:"请选择对账日期",center: true});
                return false
            }
            if (this.rulesId === '') {
                this.$message.error({message:"请选择对账规则",center: true});
                return false;
            }
            this.$store.dispatch('dialoggetWebSocket')
            autoAjax(_this.ruleValue,_this.busineseDate,_this.reconDate,_this.rulesId,url1).then(res=>{
              console.log(res.data)
            })

        },
          changeDisabled(){
              // collect收 retreat 退
            if (this.isRefundCilitaionType === 'collect') {
                this.disabled = !this.disabled;
                this.isRefundCilitaionType = 'retreat';
            } else {
                this.disabled = !this.disabled;
                this.isRefundCilitaionType = 'collect';
            }
          },
          deleteRow(index){
            console.log(index);
          },
          handleClose(done) {
            this.$confirm('确认关闭？')
              .then(_ => {
                done();
              })
              .catch(_ => {});
          }
        }
    }
</script>
<style scoped>
  .container .el-row{
    margin-bottom: 0;
  }
  .container .el-row{
    height: auto;
  }
  h5{
    margin: 0;
  }
  .el-select{
    width: 220px;
  }

  .el-form-item{
    display: -webkit-box;
    display: flex;
  }
  .execute-btn{
    text-align: center;
    margin-top: 20px;
  }
  .el-dialog__body{
    height: auto;
  }
  h5{
    font-size: 12px;
}
</style>
