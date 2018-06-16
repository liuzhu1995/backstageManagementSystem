<template>
    <div class="search">
     <div>
       <!-- 单一查询 -->
        <div style="float: left;padding:10px;">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width:450px;float: left;">
                <tbody class="el-table--scrollable-y" id="test">
                    <tr class="el-table__row" v-for="(list,index) in reconDanyiIquireList" :key="index">
                        <td width="80">
                            <div>
                                <template>
                                <el-select v-model="list.selected" @change='getMore(index)' filterable  size="mini" placeholder="请选择">
                                    <el-option
                                            v-for="item in optionData"
                                            :label="item.name"
                                            :value="item.name"
                                            :key="item.name">
                                    </el-option>
                                </el-select>
                            </template>
                            </div>
                        </td>
                        <td width="80">
                            <div style="margin-left:4px;">
                                <template>
                                <el-select v-model="list.comparing" @change="comparval" filterable size="mini" placeholder="请选择">
                                    <el-option
                                            v-for="item in compareJsonlist"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name">
                                    </el-option>
                                </el-select>
                            </template>
                          </div>
                        </td>
                        <td width="80">

                            <div style="margin-left:4px;">
                                <template>
                                <el-select v-show="list.logsSelect" v-model="list.valSelect" filterable  size="mini"  placeholder="请选择">
                                    <el-option
                                            v-for="item in ValData"
                                            :label="item.name"
                                            :value="item.name"
                                            :key="item.name">
                                    </el-option>
                                </el-select>
                                    <el-select v-show="list.pyType" v-model="list.platId"
                                                filterable size="mini" placeholder="请选择">
                                        <el-option
                                                v-for="item in platData"
                                                :label="item.name"
                                                :value="item.id"
                                                :key="item.id">
                                        </el-option>
                                    </el-select>
                                </template>
                                <template>
                                  <el-date-picker
                                  style="width:150px;"
                                  size="mini"
                                    v-show="list.logsDate"
                                    :disabled="disdate"
                                    v-model="list.valDate"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                                  </el-date-picker>
                                </template>
                            </div>
                            <el-input v-model="list.valText" v-show="list.logsText" size="mini" placeholder="请输入"></el-input>
                        </td>
                    </tr>
                </tbody>
            </table>
            <el-button type="primary" style="margin-left:5px;" @click="singleInCon" size="mini">查询</el-button>
        </div>
       <el-button type="text" @click="openfilter"><i class="el-icon-search"></i>高级搜索</el-button>
       <div class="search-body">
         <template>
           <el-dialog width="69%"  title="高级搜索" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
             <!--</el-form-item>-->
             <div class="search-contain">
               <div class="left-search-body">
                 <template>
                   <el-row>
                     <el-button size="small" @click="savelist">保存</el-button>
                     <el-button size="small" @click="asSave" >另存</el-button>
                     <el-button size="small"  @click="rename($event)">重命名</el-button>
                     <el-button size="small" @click="deleteKis">删除</el-button>
                   </el-row>
                 </template>
                 <div class="guolvList">
                  <ul>
                      <li v-for="(item,index) in Listdata" :class="{active1:index == num}" :key="index" @click="tabName(item,index)">
                          {{item.schemenaem}}
                      </li>
                  </ul>
                  </div>
              </div>
               <div class="right-search-body">
                 <template>
                   <el-row>
                     <el-button size="small" type="primary" @click="addTr">新增行</el-button>
                     <el-button size="small" type="success" @click="deleteTr">删除行</el-button>
                     <el-button size="small" type="danger" @click="AlldeleteTr">全部删除</el-button>
                     <el-button size="small" type="warning" @click="insertTr">插入行</el-button>
                   </el-row>
                     <div class="el-table el-table--fit el-table--border el-table--scrollable-x el-table--scrollable-y el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%; height: 280px;">
                        <div class="el-table__header-wrapper">
                            <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width:100%;">
                                <thead class="has-gutter">
                                    <tr class="">

                                        <th colspan="1" rowspan="1" width="140">
                                            <div class="cell">
                                                字段
                                            </div>
                                        </th>
                                        <th colspan="1" rowspan="1" width="140">
                                            <div class="cell">
                                                比较
                                            </div>
                                        </th>
                                        <th colspan="1" rowspan="1" width="140">
                                            <div class="cell">
                                                值
                                            </div>
                                        </th>
                                        <th colspan="1" rowspan="1" width="140">
                                            <div class="cell">
                                                逻辑
                                            </div>
                                        </th>

                                    </tr>
                                </thead>
                                <tbody class="el-table--scrollable-y" id="test">
                                    <tr class="el-table__row" v-for="(list,index) in reconciliationPlanInfoList" :key="index">

                                        <td width="140">
                                            <div>
                                                <template>
                                                <el-select v-model="list.selected" @change='getValue(index)' filterable  size="mini" placeholder="请选择">
                                                    <el-option
                                                            v-for="item in optionData"
                                                            :label="item.name"
                                                            :value="item.name"
                                                            :key="item.name">
                                                    </el-option>
                                                </el-select>
                                            </template>

                                            </div>
                                        </td>
                                        <td width="140">
                                            <div>
                                                <template>
                                                <el-select v-model="list.comparing" @change="comparval" filterable size="mini" placeholder="请选择">
                                                    <el-option
                                                            v-for="item in compareJsonlist"
                                                            :key="item.name"
                                                            :label="item.name"
                                                            :value="item.name">
                                                    </el-option>
                                                </el-select>
                                            </template>

                                            </div>

                                        </td>
                                        <td width="140">
                                            <div>
                                              <template>
                                                <el-select v-show="list.logsSelect" v-model="list.valSelect" filterable  size="mini"  placeholder="请选择">
                                                    <el-option
                                                            v-for="item in ValData"
                                                            :label="item.name"
                                                            :value="item.name"
                                                            :key="item.name">
                                                    </el-option>
                                                </el-select>
                                                <el-select v-show="list.pyType" v-model="list.platId" filterable size="mini" placeholder="请选择">
                                                    <el-option
                                                            v-for="item in platData"
                                                            :label="item.name"
                                                            :value="item.id"
                                                            :key="item.id">
                                                    </el-option>
                                                </el-select>
                                            </template>
                                              <template>
                                                <el-date-picker
                                                size="mini"
                                                  v-show="list.logsDate"
                                                  :disabled="disdate"
                                                  v-model="list.valDate"
                                                  type="date"
                                                  value-format="yyyy-MM-dd"
                                                  placeholder="选择日期">
                                                </el-date-picker>
                                              </template>
                                              <el-input v-model="list.valText" v-show="list.logsText" size="mini" placeholder="请输入"></el-input>
                                            </div>
                                        </td>
                                        <td width="140">
                                            <div style="width:130px;">
                                                <template>
                                                <el-select v-model="list.logic" filterable  size="mini" placeholder="请选择">
                                                    <el-option
                                                            v-for="item in logsgetData"
                                                            :label="item.text"
                                                            :key="item.text"
                                                            :value="item.text">
                                                    </el-option>
                                                </el-select>
                                            </template>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div style="line-height:25px;height:30px;margin:10px auto;">
                            <div class="statusBottom">
                                <label class=" col-md-4">对账状态:</label>
                                <div class="col-md-8">
                                    <template>
                                    <el-select v-model="reconModel" filterable size="mini"
                                                placeholder="请选择">
                                        <el-option
                                                v-for="item in reconData"
                                                :label="item.name"
                                                :value="item.value"
                                                :key="item.value">
                                        </el-option>
                                    </el-select>
                                </template>

                                </div>
                            </div>
                            <div class="statusBottom">
                                <label class=" col-md-4">单据状态:</label>
                                <div class="col-md-8">
                                    <template>
                                    <el-select v-model="statusinqu" filterable size="mini"
                                                placeholder="请选择">
                                        <el-option
                                                v-for="item in statusData"
                                                :label="item.name"
                                                :value="item.value"
                                                :key="item.value">
                                        </el-option>
                                    </el-select>
                                </template>

                                </div>
                            </div>
                        </div>

                        <div style="line-height:25px;height:30px;margin:10px auto;">
                            <div class="statusBottom">
                                <label class=" col-md-4">退款状态:</label>
                                <div class="col-md-8">
                                    <template>
                                    <el-select v-model="refuncomm" filterable size="mini" placeholder="请选择">
                                        <el-option
                                                v-for="item in refundData"
                                                :label="item.name"
                                                :value="item.value"
                                                :key="item.value">
                                        </el-option>
                                    </el-select>
                                </template>

                                </div>
                            </div>
                            <div class="statusBottom">
                                <label class=" col-md-4">差异状态:</label>
                                <div class="col-md-8">
                                    <template>
                                    <el-select v-model="chayiD" filterable size="mini" placeholder="请选择">
                                        <el-option
                                                v-for="item in chayiData"
                                                :label="item.name"
                                                :value="item.value"
                                                :key="item.value">
                                        </el-option>
                                    </el-select>
                                </template>

                                </div>
                            </div>
                        </div>
                    </div>

                 </template>
               </div>
             </div>
             <div slot="footer" class="dialog-footer">
               <div style="float: left;">
                      <template>
                          <el-checkbox v-model="defaultScheme" v-show="moren" @change="checkClick">默认方案</el-checkbox>
                      </template>
                  </div>
               <el-button  size="small" @click="queryCancel">取 消</el-button>
               <el-button type="primary" size="small" @click="determine">确 定</el-button>
             </div>
           </el-dialog>
           <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
              <el-dialog
                title="保存方案"
                :visible.sync="dialogSave"
                width="30%">
                <div style="margin:0 18%;">
                  <label>输入方案名:</label>
                  <el-input size="mini" v-model="savename" @change="projectName($event)"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="saveCacel">取 消</el-button>
                  <el-button type="primary" @click="saveQu">确 定</el-button>
                </span>
              </el-dialog>
         </template>
       </div>
     </div>
    </div>
</template>

<script>
import {selectUrl,getListUrl,taburl,deleteProgram,addSave,getPlatform,getPlatAjax,
channelAjax,channelType,updateSave,getrenameAjax,defaultCheck} from "../../axios/api.js"

export default {
  name: 'search',
  data () {
      return {
        dialogSave:false,//方案模态
        dialogFormVisible: false,//高级查询模态
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        //高级查询
        reconciliationPlanInfoList: [{
          'selected': '',
          'comparing': '',
          'logic': '',
          logsSelect: false, // 值下拉
          logsText: true, //值输入
          logsDate: false, //日期
          pyType: false,
          'valDate': '',
          'valSelect': '',
          'valText': '',
          'platId': '', //活的
          advancedName: '',
          queryType: '',
          'reconStatus': '',
          'invoiceStatus': '',
          'differenseStatus': '',
          'refundStatus': '',
          'saveName': '',
          'mark': '',
          'uuid': '',
          'pageNumber': 1, //第几页
          'pageSize': 100, //每页展示数
          'selectPageNumber': ''
      }],
      //单一
      reconDanyiIquireList: [{
          'selected': '',
          'comparing': '',
          'logic': '',
          logsSelect: false, // 值下拉
          logsText: true, //值输入
          logsDate: false, //日期
          pyType: false,
          'valDate': '',
          'valSelect': '',
          'valText': '',
          'platId': '', //活的
          advancedName: '',
          queryType: '',
          'reconStatus': '',
          'invoiceStatus': '',
          'differenseStatus': '',
          'refundStatus': '',
          'saveName': '',
          'mark': '6',
          'uuid': '',
          'pageNumber': 1, //第几页
          'pageSize': 100, //每页展示数
          'selectPageNumber': ''
      }],
      logsgetData: [{
          text: '并且'
      }, {
          text: '或者'
      }],
      //重写model
      chayiD: '',
      refuncomm: '',
      statusinqu: '',
      reconModel: '',

      chayiData: [{
              value: '',
              name: '全部'
          },
          {
              value: 'Y',
              name: '是'
          },
          {
              value: 'N',
              name: '否'
          },
      ],
      refundData: [{
              value: '',
              name: '全部'
          },
          {
              value: 'UnRefund',
              name: '未退款'
          },
          {
              value: 'PartRefund',
              name: '部分退款'
          },
          {
              value: 'CompleteRefund',
              name: '完全退款'
          },
          {
              value: 'RefundException',
              name: '退款异常'
          },
      ],

      statusData: [{
              value: '',
              name: '全部'
          },
          {
              value: 'Save',
              name: '保存'
          },
          {
              value: 'Audited',
              name: '审核'
          },
          {
              value: 'HandClose',
              name: '手工关闭'
          },
          {
              value: 'AtuoClose',
              name: '自动关闭'
          },
      ],
      reconData: [{
              value: '',
              name: '全部'
          },
          {
              value: 'UnSettled',
              name: '未对账'
          },
          {
              value: 'Part',
              name: '部分对账'
          },
          {
              value: 'Completely',
              name: '完全对账'
          },
          {
              value: 'Exception',
              name: '异常'
          },
      ],
      selected: '',
      optionData:[],//一级data
      compareJsonlist: [], //二级
      ValData: [], //三级
      platData:[], //四级
      startText: '',
      saveTitle: false, //模态
      saveTitle1: false, //模态
      pagination: true, //分页
      paginations: false, //高级分页
      savename: '', //保存的名字
      disdate: false,
      Listdata: [], //保存列表
      num: -1,
      proname: '', //方案名
      renId: '', //方案uuid
      userId: '', //方案userid
      renamedele: '',
      idenName:'', //重命名标识
      savename1: '',
      defaultScheme: false, //默认方案
      indexme: '', //这是查询列表index
      indexnum:null, //接口index
      moren:true, //默认方案显示隐藏
      }
    },
    mounted() {
        this.getSelect()
        this.leftList()
    },
    methods: {

      //单一查询
      singleInCon(){
        this.$emit('searchRecord',this.reconDanyiIquireList);
        this.$emit('searchbank',this.reconDanyiIquireList)
        this.$emit('orderSearchs', this.reconDanyiIquireList);
        this.$emit('bankFlow', this.reconDanyiIquireList);
        this.$emit('system', this.reconDanyiIquireList);
        this.$emit('transactionFlow', this.reconDanyiIquireList);
        // this.$emit("reconSearch", this.reconDanyiIquireList);
        this.$emit("transSearch", this.reconDanyiIquireList);
        this.$emit("systemSearch", this.reconDanyiIquireList); //银行对账系统对账单
        this.dayiclear();
      },
      //打开查询页面
      openfilter() {
        this.dialogFormVisible = true;
        if (this.$route.fullPath === "/verifyReceivables") {
          this.moren = false;
        }
        if (this.$route.fullPath === "/verifyBankStatement") {
          this.moren = false;
        }
      },
      //查询确定
      determine() {
        if (this.reconciliationPlanInfoList.length == 0) {
          this.addRow();
        }
        this.reconciliationPlanInfoList[0].differenseStatus = this.chayiD;
        this.reconciliationPlanInfoList[0].reconStatus = this.reconModel;
        this.reconciliationPlanInfoList[0].refundStatus = this.refuncomm;
        this.reconciliationPlanInfoList[0].invoiceStatus = this.statusinqu;
        var data = this.reconciliationPlanInfoList;
        this.$emit("searchRecord", data);
        this.$emit('searchbank', data);
        this.$emit('orderSearchs', data);
        this.$emit('bankFlow', data);
        this.$emit('system', data);
        this.$emit('transactionFlow', data); //流水查询
        // this.$emit("reconSearch", data);
        this.$emit("transSearch", data);
        this.$emit('systemSearch',data);//银行对账--系统对账单

        this.addRow();
        this.dialogFormVisible = false;
      },
      //查询取消
      queryCancel() {
        this.dialogFormVisible = false;
      },
      //根据url判断
      judgment() {
        var router = this.$route.fullPath;
        console.log(router, "router")
        // console.log(this.$route, "router")
        if (router === "/verifyReceivablesRecord") {
          this.indexnum = 6;
        }
        if (router === "/verifyBankStatementRecord") {
          this.indexnum = 1;
        }
        if (router === "/orderReceivable") {
          this.indexnum =2;
        }
        if (router === "/bankFlow") {
          this.indexnum = 4;
        }
        if (router === "/systemStatement") {
          this.indexnum = 5;
        }
        if (router === "/transactionFlow") {
          this.indexnum = 3;
        }
        if (router === "/verifyReceivables") {
          this.indexnum = 3;
        }
        if (router === "/verifyBankStatement") {
          this.indexnum = 5;
        }


  },
  //高级过滤
  getSelect: function() {
    this.judgment()
    selectUrl(this.indexnum).then(res=>{
      this.optionData = res.data.obj;
      // console.log(this.optionData)
    })
  },
  //一级获取二级列表
  getValue(index) {
      var that = this;
      var ind = index;
      // console.log(this.selected)

      var data = that.reconciliationPlanInfoList[index];
      var selected = data.selected;
      this.optionData.forEach((value, index) => {
              if (value.name === selected) {
                  that.compareJsonlist = value.compareJsonlist;
                  that.ValData = value.valuelist;
                  that.reconciliationPlanInfoList[ind].advancedName = value.advancedName;
                  that.reconciliationPlanInfoList[ind].queryType = value.queryType;
                  //判断select
                  if (value.queryType === '1') {
                      that.reconciliationPlanInfoList[ind].logsDate = true;
                      that.reconciliationPlanInfoList[ind].logsSelect = false;
                      that.reconciliationPlanInfoList[ind].logsText = false;
                      that.reconciliationPlanInfoList[ind].pyType = false;
                  }
                  if (value.queryType === '2') {
                      that.reconciliationPlanInfoList[ind].logsDate = false;
                      that.reconciliationPlanInfoList[ind].logsSelect = true;
                      that.reconciliationPlanInfoList[ind].logsText = false;
                      that.reconciliationPlanInfoList[ind].pyType = false;
                  }
                  if (value.queryType === '3') {
                      that.reconciliationPlanInfoList[ind].logsDate = false;
                      that.reconciliationPlanInfoList[ind].logsSelect = false;
                      that.reconciliationPlanInfoList[ind].logsText = true;
                      that.reconciliationPlanInfoList[ind].pyType = false;
                  }
                  if (value.queryType === '4') {
                      that.reconciliationPlanInfoList[ind].logsDate = false;
                      that.reconciliationPlanInfoList[ind].logsSelect = false;
                      that.reconciliationPlanInfoList[ind].logsText = false;
                      that.reconciliationPlanInfoList[ind].pyType = true;
                      //平台类型
                      if (value.name == '平台') {
                        getPlatform().then(res=>{
                          that.platData = res.data.obj;
                        })
                      }
                      //平台类型
                      if (value.name == '平台类型') {
                          getPlatAjax().then(res=>{
                            this.platData = JSON.parse(res.data.obj);
                          })
                      }

                      //平台类型
                      if (value.name == '支付渠道') {
                          channelAjax().then(res=>{
                            this.platData = res.data.obj;
                          })
                      }
                      //平台类型
                      if (value.name == '支付渠道类型') {
                        channelType().then(res=>{
                          this.platData = JSON.parse(res.data.obj);
                        })
                      }
                  }
              }

          })
          //清空
      that.reconciliationPlanInfoList[ind].logic = '';
      that.reconciliationPlanInfoList[ind].comparing = '';
      that.reconciliationPlanInfoList[ind].valDate = '';
      that.reconciliationPlanInfoList[ind].valSelect = '';
      that.reconciliationPlanInfoList[ind].valText = '';
      that.reconciliationPlanInfoList[ind].platId = '';
  },
  //单一查询
  getMore(index) {
      var that = this;
      var ind = index;
      // console.log(this.selected)

      var data = that.reconDanyiIquireList[index];
      var selected = data.selected;
      this.optionData.forEach((value, index) => {
              if (value.name === selected) {
                  that.compareJsonlist = value.compareJsonlist;
                  that.ValData = value.valuelist;
                  that.reconDanyiIquireList[ind].advancedName = value.advancedName;
                  that.reconDanyiIquireList[ind].queryType = value.queryType;
                  //判断select
                  if (value.queryType === '1') {
                      that.reconDanyiIquireList[ind].logsDate = true;
                      that.reconDanyiIquireList[ind].logsSelect = false;
                      that.reconDanyiIquireList[ind].logsText = false;
                      that.reconDanyiIquireList[ind].pyType = false;
                  }
                  if (value.queryType === '2') {
                      that.reconDanyiIquireList[ind].logsDate = false;
                      that.reconDanyiIquireList[ind].logsSelect = true;
                      that.reconDanyiIquireList[ind].logsText = false;
                      that.reconDanyiIquireList[ind].pyType = false;
                  }
                  if (value.queryType === '3') {
                      that.reconDanyiIquireList[ind].logsDate = false;
                      that.reconDanyiIquireList[ind].logsSelect = false;
                      that.reconDanyiIquireList[ind].logsText = true;
                      that.reconDanyiIquireList[ind].pyType = false;
                  }
                  if (value.queryType === '4') {
                      that.reconDanyiIquireList[ind].logsDate = false;
                      that.reconDanyiIquireList[ind].logsSelect = false;
                      that.reconDanyiIquireList[ind].logsText = false;
                      that.reconDanyiIquireList[ind].pyType = true;
                      //平台类型
                      if (value.name == '平台') {
                        getPlatform().then(res=>{
                          that.platData = res.data.obj;
                        })
                      }
                      //平台类型
                      if (value.name == '平台类型') {
                          getPlatAjax().then(res=>{
                            this.platData = JSON.parse(res.data.obj);
                          })
                      }

                      //平台类型
                      if (value.name == '支付渠道') {
                          channelAjax().then(res=>{
                            this.platData = res.data.obj;
                          })
                      }
                      //平台类型
                      if (value.name == '支付渠道类型') {
                        channelType().then(res=>{
                          this.platData = JSON.parse(res.data.obj);
                        })
                      }
                  }

              }

          })
          //清空
      that.reconDanyiIquireList[ind].logic = '';
      that.reconDanyiIquireList[ind].comparing = '';
      that.reconDanyiIquireList[ind].valDate = '';
      that.reconDanyiIquireList[ind].valSelect = '';
      that.reconDanyiIquireList[ind].valText = '';
      that.reconDanyiIquireList[ind].platId = '';

  },
   //单一清空
  dayiclear() {
      this.reconDanyiIquireList = [{
          'selected': '',
          'comparing': '',
          'logic': '',
          logsSelect: false, // 值下拉
          logsText: true, //值输入
          logsDate: false, //日期
          pyType: false,
          'valDate': '',
          'valSelect': '',
          'valText': '',
          'platId': '', //活的
          advancedName: '',
          queryType: '',
          'reconStatus': '',
          'invoiceStatus': '',
          'differenseStatus': '',
          'refundStatus': '',
          'saveName': '',
          'mark': '',
          'uuid': '',
          'pageNumber': 1, //第几页
          'pageSize': 100, //每页展示数
          'selectPageNumber': ''
      }];
  },
  //当全部删除行的时候
  addRow: function() {
        this.reconciliationPlanInfoList = [{
          'selected': '',
          'comparing': '',
          'logic': '',
          logsSelect: false, // 值下拉
          logsText: true, //值输入
          logsDate: false, //日期
          pyType: false,
          'valDate': '',
          'valSelect': '',
          'valText': '',
          'platId': '', //活的
          advancedName: '',
          queryType: '',
          'reconStatus': '',
          'invoiceStatus': '',
          'differenseStatus': '',
          'refundStatus': '',
          'saveName': '',
          'mark': '',
          'uuid': ''
      }]
  },
  //判断时间
  comparval: function(e) {
      var targetVal = e;
      if (targetVal === "本周") {
          this.disdate = true;
      } else if (targetVal === "上个月") {
          this.disdate = true;
      } else if (targetVal === "上周") {
          this.disdate = true;
      } else if (targetVal === "本月") {
          this.disdate = true;
      } else if (targetVal === "下周") {
          this.disdate = true;
      } else if (targetVal === "今天") {
          this.disdate = true;
      } else if (targetVal === "明天") {
          this.disdate = true;
      } else if (targetVal === "昨天") {
          this.disdate = true;
      } else if (targetVal === "下个月") {
          this.disdate = true;
      } else {
          this.disdate = false;
      }
  },
  //新增行
  addTr: function() {
      // console.log('新增')
      var newIndex = this.reconciliationPlanInfoList.length;
      var tr = {
        index: newIndex,
        'selected': '',
        'comparing': '',
        'logic': '',
        logsSelect: false, // 值下拉
        logsText: true, //值输入
        logsDate: false, //日期
        pyType: false,
        'valDate': '',
        'valSelect': '',
        'valText': '',
        'platId': '', //活的
        advancedName: '',
        queryType: '',
        'saveName': '',
        'mark': '',
        'pageNumber': 1, //第几页
        'pageSize': 100, //每页展示数
      };
      this.reconciliationPlanInfoList.push(tr);
  },
  //插入
  insertTr: function() {
      var tr = {
        'selected': '',
        'comparing': '',
        'valDate': '',
        'valSelect': '',
        'valText': '',
        'platId': '', //活的
        logsSelect: false, // 值下拉
        logsText: true, //值输入
        logsDate: false,
        pyType: false,
        'logic': '',
        advancedName: '',
        queryType: '',
        'saveName': '',
        'mark': '',
        'pageNumber': 1, //第几页
        'pageSize': 100, //每页展示数
      };
      this.reconciliationPlanInfoList.push(tr);
  },
  //删除行
  deleteTr: function(index) {
      this.reconciliationPlanInfoList.splice(index, 1);
  },
  //全部删除
  AlldeleteTr: function(index) {
      this.reconciliationPlanInfoList.splice(index);
  },
    //方案列表
  leftList: function() {
      this.judgment()
      getListUrl(this.indexnum).then(res=>{
          this.Listdata = res.data.obj;
      })
  },
  //方案加载
  tabName(item,index){
    var that = this;
      this.num = index;
      var name = item.schemenaem;
      this.proname = item.schemenaem;
      var uuid = item.uuid;
      console.log(uuid,"uuid")
      this.renId = item.uuid;
      this.userId = item.userid;
      this.indexme = item.index;
      if (item.display == false) {
          that.defaultScheme = false;
      } else {
          that.defaultScheme = true;
      }
      this.judgment()
      taburl(uuid,this.indexnum).then(res=>{
        res.data.obj.forEach((value, index) => {
              var typeman = value.queryType;
              this.reconciliationPlanInfoList.splice(index);
              console.log(typeman, "type")

              if(typeman == '4'){
                var tr = {
                  // index: newIndex,
                  'selected': value.name,
                  'comparing': value.value,
                  'logic': value.logic,
                  logsSelect: false, // 值下拉
                  logsText: false, //值输入
                  logsDate: false, //日期
                  pyType: true,
                  'valDate': value.text,
                  'valSelect': value.text,
                  'valText': value.text,
                  'platId':value.text, //活的
                  'advancedName': value.advancedName,
                  queryType: value.queryType,
                  'saveName': '',
                  'mark': '',
                  'pageNumber': 1, //第几页
                  'pageSize': 100, //每页展示数
              };
            }else if(typeman == '2'){
              var tr = {
                  // index: newIndex,
                  'selected': value.name,
                  'comparing': value.value,
                  'logic': value.logic,
                  logsSelect: true, // 值下拉
                  logsText: false, //值输入
                  logsDate: false, //日期
                  pyType: false,
                  'valDate': value.text,
                  'valSelect': value.text,
                  'valText': value.text,
                  'platId':'', //活的
                  'advancedName': value.advancedName,
                  queryType: value.queryType,
                  'saveName': '',
                  'mark': '',
                  'pageNumber': 1, //第几页
                  'pageSize': 100, //每页展示数
              };
            }else if(typeman == '1'){
               var tr = {
                  // index: newIndex,
                  'selected': value.name,
                  'comparing': value.value,
                  'logic': value.logic,
                  logsSelect: false, // 值下拉
                  logsText: false, //值输入
                  logsDate: true, //日期
                  pyType: false,
                  'valDate': value.text,
                  'valSelect': value.text,
                  'valText': value.text,
                  'platId':'', //活的
                  'advancedName': value.advancedName,
                  queryType: value.queryType,
                  'saveName': '',
                  'mark': '',
                  'pageNumber': 1, //第几页
                  'pageSize': 100, //每页展示数
              };
            }else{
               var tr = {
                  // index: newIndex,
                  'selected': value.name,
                  'comparing': value.value,
                  'logic': value.logic,
                  logsSelect: false, // 值下拉
                  logsText: true, //值输入
                  logsDate: false, //日期
                  pyType: false,
                  'valDate': value.text,
                  'valSelect': value.text,
                  'valText': value.text,
                  'platId':'', //活的
                  'advancedName': value.advancedName,
                  queryType: value.queryType,
                  'saveName': '',
                  'mark': '',
                  'pageNumber': 1, //第几页
                  'pageSize': 100, //每页展示数
              };
            }
              this.reconciliationPlanInfoList.push(tr);
          })
      })
  },

  //另存
  asSave(){
    this.dialogSave = true;
  },
  //重命名
  rename(e){
    this.idenName = e.target.innerText;
    this.dialogSave = true;
  },
  //保存方案确定
  saveQu(){
    if (this.savename == "") {
        this.$message({
          center:true,
          message: '方案名不能为空！',
          type: 'warning'
        });
        return false;
    }
    //重命名
    if(this.idenName == '重命名'){
        this.judgment()
        getrenameAjax(this.renId,this.savename,this.userId,this.indexnum).then(res=>{
          this.leftList()
          this.$message({
          center:true,
          message: res.data.msg || "保存成功！",
          type: 'success'
          });
        })
      this.dialogSave = false;
      this.idenName = '';
      this.savename = '';
      return false;
    }
    //保存 另存
    this.reconciliationPlanInfoList[0].mark =this.indexnum;
    var data = this.reconciliationPlanInfoList;
    addSave(data).then(res=>{
      this.leftList()
        this.$message({
          center:true,
          message: '保存成功！',
          type: 'success'
        });
    })
    this.savename = '';
    this.dialogSave = false;
  },
  //方案取消保存
  saveCacel(){
    this.dialogSave = false;
    this.savename = '';
    this.idenName = '';
  },
  //open
  savelist(){
    if(this.renId){
      this.reconciliationPlanInfoList[0].uuid = this.renId;
      this.reconciliationPlanInfoList[0].saveName = this.proname;
      updateSave(this.reconciliationPlanInfoList).then(res=>{
        this.leftList();
        this.$message({
          center:true,
          message: res.data.msg || "保存成功！",
          type: 'success'
        });
      })
    }else{
      this.dialogSave = true;
    }
  },
  //删除
  deleteKis: function(index) {
    this.judgment()
    deleteProgram(this.proname,this.renId,this.indexnum).then(res=>{
      this.leftList();
      this.reconciliationPlanInfoList.splice(index);
      this.$message({
          center:true,
          message: res.data.msg,
          type: 'success'
        });
    })
  },
  projectName(e){
    this.reconciliationPlanInfoList[0].saveName = e;
  },
  //勾选默认方案
  checkClick(){
     console.log(this.defaultScheme, "这是chexkbox")
      if (this.renId) {
        defaultCheck(this.renId,this.defaultScheme,this.proname,this.indexme).then(res=>{
          this.leftList();
          this.$message({
            center:true,
            message: res.data.msg,
            type: 'success'
          });
        })
      } else {
          this.defaultScheme = false;
          this.$message({
            center:true,
            message: "请选中方案！",
            type: 'warning'
          });
      }
  },

}
}
</script>
<style>
.el-dialog__body{
  padding: 10px;
}
.el-dialog .el-input{
  width: 140px;
}
.statusBottom{
  width: 50%;
  float: left;
}
.col-md-4{
  width: 33.333%;
  float: left;
}
.col-md-8{
  width: 66.66%;
  float: left;
}
.guolvList {
  clear: both;
}

.guolvList ul {
  padding: 0;
}

.guolvList ul li {
  padding-left: 20px;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  list-style: none;
}
.active1 {
  background: #f5f5f5;
  color: #2EAEF0;
}
.el-dialog__footer{
  padding: 10px 20px;
}
</style>
