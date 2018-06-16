<template>
    <div class="batch-statement">
      <template>
        <el-dialog width="42%" style="min-height:100px;" title="提示" :close-on-click-modal="false" :show-close="false" :close-on-press-escape	="false" :visible.sync="dialoggetWebSocket" :before-close="dialog_close" :modal-append-to-body="false">
          <div class="progressClass">
              <el-progress :text-inside="true" status="socketStatus" :stroke-width="18" :percentage="socketSchedule"></el-progress>
          </div>
          <div style="margin-top:10px;height:15px;text-align:center">{{socketDatatext}}</div>
          <div slot="footer" class="dialog-footer">
            <el-button size="mini" type="primary" @click="determine" :disabled="guanbi">确 定</el-button>
            <el-button size="mini" @click="cancel" :disabled="guanbi">取 消</el-button>
          </div>
        </el-dialog>
      </template>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {orderReports,balanceSheetAjax} from '../../axios/api.js'
  import api from '../../axios/url.js'

    export default {
        name: 'getWebSocket',
        data () {
            return {
              socketDatatext:'',  //文字
              socketStatus:'', //状态
              guanbi:false,
              socketSchedule:"", //百分比
          }
        },
      computed:{
        ...mapState({
          dialoggetWebSocket:state=>state.dialoggetWebSocket
        })
      },
      mounted(){
        this.websockets()
      },
      methods: {

        websockets() {
            var that = this;
            // var rootPath = document.location.host;
            let websocket = new WebSocket(api.ws+ "/ws");
            // 打开时
            websocket.onopen = function(evnt) {
                console.log("  websocket.onopen  ");
            };
            websocket.onmessage = function(event) {

                var data = JSON.parse(event.data);
                that.socketSchedule = parseInt(JSON.parse(event.data).percentage);
                console.log(that.socketSchedule, 111111)
                that.socketStatus = JSON.parse(event.data).status;
                console.log(that.socketStatus, 3333333333)
                that.socketDatatext = JSON.parse(event.data).text;

                if (JSON.parse(event.data).status === 'Ongoing') {
                    that.guanbi = true;
                } else {
                    that.guanbi = false;
                }


            }
            websocket.onclose = function(evnt) {
                console.log("  websocket.onclose  ");
            };
        },
        shutDown(){

        },

        cancel(){ //取消
          this.$store.dispatch('dialoggetWebSocket')
        },

        determine(){ //确定
          this.$store.dispatch('dialoggetWebSocket')
          this.$emit('socketStatus',this.guanbi)
              //清空
              this.socketDatatext ='';  //文字
              this.socketStatus =''; //状态
              this.guanbi = false;
              this.socketSchedule =0;
        },
        dialog_close() {
          this.$store.dispatch('dialoggetWebSocket')
        },
      }
    }
</script>
<style scoped>
  .el-dialog .el-input{
    max-width: 300px;
  }
  .progressClass{
    margin: auto 40px;
  }

</style>
