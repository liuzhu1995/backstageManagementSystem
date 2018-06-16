<template>
    <div class="batch-delete">
      <template>
        <el-dialog title="批量删除" :visible.sync="dialogFromDelete" :before-close="dialog_close">
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
                  v-model="time"
                  type="datetimerange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00']"
                  value-format="yyyy-MM-dd"
                  @change="getTime">
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
        name: 'batchDelete',
        data () {
            return {
              time: '',//时间
              form: {
                settleStatus: '', //对账状态
                platform: '', //平台
                status: '',//单据状态
                businessDate: '',//开始日期
                businessDateEnd: '',//结束日期
                orderType: '',//单据类型
              },
              formLabelWidth: '100px'
            }
        },
        computed: {
          ...mapState({
            dialogFromDelete:state=>state.dialogFromDelete,
            filterData: state => state.filterData,
            loadDisabled: state => state.loadDisabled,
          })
        },
        methods: {
          cancel(){//取消
            this.$store.dispatch('loadDisabled',false);
            this.$store.dispatch('dialogFromDelete')
          },
          dialog_close(){ //右上角退出
            this.$store.dispatch('loadDisabled',false);
            this.$store.dispatch('dialogFromDelete')
          },
          determine() { //确定
            console.log(this.form);
            let flag = this.form.businessDate && this.form.businessDateEnd;
            if(flag) {
              this.$store.dispatch('loadDisabled',true);
              this.$emit('reqMethod',this.form);
            }else{
              this.$message.error('业务日期为必选');
            }

          },
          getTime(date) {  //获取日期
            this.form.businessDate = date[0];
            this.form.businessDateEnd = date[1];
          }
        }
    }
</script>
<style scoped>

</style>
