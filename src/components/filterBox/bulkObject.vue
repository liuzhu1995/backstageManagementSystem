<template>
    <div class="batch-UnAudit">
      <template>
        <el-dialog width="58%" title="批量反对账" :visible.sync="dialogBulk" :before-close="dialog_close">
          <el-form :model="form">
            <el-form-item label="对账日期"  :label-width="formLabelWidth">
              <div class="block">
                <el-date-picker
                  size="mini"
                  v-model="form.reconDate"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="订单日期" :label-width="formLabelWidth">
              <div class="block">
                <el-date-picker
                  size="mini"
                 v-model="form.orderDate"
                 value-format="yyyy-MM-dd"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="流水日期" :label-width="formLabelWidth">
              <div class="block">
                <el-date-picker
                  size="mini"
                  value-format="yyyy-MM-dd"
                  v-model="form.transTime"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="对账人" :label-width="formLabelWidth">
              <el-select size="mini" v-model="form.reconciler" placeholder="请选择">
                <el-option v-for="item in checkForPeople" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对账方式" :label-width="formLabelWidth">
              <el-select size="mini" v-model="form.reconMethod" placeholder="请选择">
                <el-option v-for="item in checkForWays" :label="item.name" :value="item.index" :key="item.index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="业务类型" :label-width="formLabelWidth">
              <el-select size="mini" v-model="form.businesstype" placeholder="请选择">
                <el-option  v-for="item in checkBusinessType" :label="item.name" :value="item.index" :key="item.index"></el-option>
              </el-select>

            </el-form-item>
           <el-form-item label="对账批次号"  :label-width="formLabelWidth">
              <el-input size="mini" v-model="form.lotNumber"></el-input>
            </el-form-item>
            <el-form-item label="是否异常" :label-width="formLabelWidth">
              <el-select size="mini" v-model="form.abnormalName" placeholder="请选择">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="平台" :label-width="formLabelWidth">
              <el-select size="mini" multiple collapse-tags v-model="form.platformName" placeholder="请选择">
                <el-option v-for="item in platData" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对账规则" :label-width="formLabelWidth">
              <el-select size="mini" multiple collapse-tags v-model="form.ruleModel" placeholder="请选择">
                <el-option v-for="item in ruliList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancel">取 消</el-button>
            <el-button size="mini" type="primary" @click="determine">确 定</el-button>
          </div>
        </el-dialog>
      </template>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {batchSettle,bussineAjax,keyWays,checkpeople,getPlatAjax,getRulist} from '../../axios/api.js'
    export default {
        name: 'bulkObject',
        data () {
            return {
              form: {
                reconDate: '',//对账日期
                orderDate: '',//订单日期
                transTime: '',//流水日期
                reconciler: '',//对账人
                reconMethod: '',//对账方式,
                businesstype:'', //业务类型
                ruleModel:[],//对账规则
                lotNumber:'',//批次号
                platformName:[], //平台
                abnormalName:'', //异常
              },
              formLabelWidth: '100px',
              checkBusinessType:[], //业务类型下拉
              checkForWays:[],  //对账方式
              checkForPeople:[],
              platData:[],  //平台
              ruliList:[],  //对账规则
            }
        },
      computed:{
        ...mapState({
          dialogBulk:state=>state.dialogBulk
        })
      },
      mounted(){
        this.getAjax()
      },
      methods:{
        cancel() {
            this.$store.dispatch('dialogBulk')
        },
        getAjax(){
         bussineAjax().then(res=>{
            this.checkBusinessType = res.data.obj;

          })
          keyWays().then(res=>{
            this.checkForWays = res.data.obj;
          })
          checkpeople().then(res=>{
            this.checkForPeople = res.data.obj;
          })
          getPlatAjax().then(res=>{
            this.platData= JSON.parse(res.data.obj)
          })
          getRulist().then(res=>{
            this.ruliList = res.data.obj;
          })
      },
        dialog_close() {
          this.$store.dispatch('dialogBulk')
        },
        determine(){

          this.$emit('nodeEvent',this.form);
          this.dialog_close();
          //清空
          this.form = {
                reconDate: '',//对账日期
                orderDate: '',//订单日期
                transTime: '',//流水日期
                reconciler: '',//对账人
                reconMethod: '',//对账方式,
                businesstype:'', //业务类型
                ruleModel:[],//对账规则
                lotNumber:'',//批次号
                platformName:[], //平台
                abnormalName:'', //异常
              };
        }
      }
    }
</script>
<style scoped>
  .el-dialog{
    width: 58%!important;
  }

</style>
