/**
 * Created by 边城浪子刘三慢 on 2018/4/21.
 */
//分离vuex方便维护
// # 我们组装模块并导出 store 的地方
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './modules/actions'
import mutations from './modules/mutations'


Vue.use(Vuex);


const state = {//存储状态
  show: false,
  author: 'Wise Wrong',
  messages: 2,
  userInfo: null, //用户信息
  collapse: false,//折叠面板
  companyValue: null, //选中的厂商
  tags: null,//保存的orderListInfo
  company: null, //公司
  orderListUUid: null,//订单应收单条数据storeSelectData
  verifyStatus: 'Whole', //Tabs 切换的状态 默认是全部
  dialogFromAudit: false,//批量审核框
  dialogFromUnAudit: false,//批量反审核
  dialogDifferences: false,//差异对账
  dialogFromDifferences: false,//批量差异对帐
  dialogFromDelete: false,//批量删除
  dialogFromBill: false, //结算金额详情
  loadDisabled: false, //批量操作框请求时显示隐藏遮罩和disabled状态
  filterData: [],//批量弹出框数据
  dialogFromStatement: false,//报表通用弹出框
  orderReportData: [], //订单报表数据
  balanceSheetData: [], //余额表数据
  transReportData: [], //余额流水
  pageData: [], //余额分页
  dialogBulk: false, //批量反对账
  dialoggetWebSocket:false,
};



export default new Vuex.Store({
  state,
  actions,
  mutations
})
