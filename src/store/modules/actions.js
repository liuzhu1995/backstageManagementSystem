/**
 * Created by 边城浪子刘三慢 on 2018/5/2.
 */
import {
  COLLAPSE,
  COMPANY,
  VERIFY_STATUS,
  DIALOG_FROM_AUDIT,
  DIALOG_FROM_UN_AUDIT,
  DIALOG_DIFFERENCES,
  DIALOG_FROM_DIFFERENCES,
  DIALOG_FROM_DELETE,
  DIALOG_FROM_BILL,
  STORE_FILTER_DATA,
  ORDER_REPORTS,
  LOAD_DISABLED,
} from './mutation-type'

export default {
  getCollapse({commit}){
    commit('COLLAPSE');
  },
  getCompanyValue({commit},companyValue) { // 提交到mutations中处理
    commit('COMPANY',companyValue)
  },
  getVerifyStatus({commit},verifyStatus){ //获取
    commit('VERIFY_STATUS',verifyStatus)
  },
  dialogFromAudit({commit}){ //批量审核
    commit('DIALOG_FROM_AUDIT')
  },
  dialogFromUnAudit({commit}){ //批量反审核
    commit('DIALOG_FROM_UN_AUDIT')
  },
  dialogDifferences({commit}){
    commit('DIALOG_DIFFERENCES')
  },
  dialogFromDifferences({commit}){ //批量差异对帐
    commit('DIALOG_FROM_DIFFERENCES')
  },
  dialogFromDelete({commit}){ //批量删除
    commit('DIALOG_FROM_DELETE')
  },
  dialogFromBill({commit}){ //结算金额详情框
    commit('DIALOG_FROM_BILL')
  },
  storeFilterData({commit},filterData){ //请求的批量操作框数据
    commit('STORE_FILTER_DATA',filterData)
   },
  loadDisabled({commit},status) {
    commit('LOAD_DISABLED',status)
  },
  // store
  dialogFromStatement({commit}){//报表通用弹出层
    commit('DIALOG_FROM_STATEMENT')
  },
  orderReports({ commit }, orderReportData) { //报表数据
    commit('ORDER_REPORTS', orderReportData)
  },
  balanceSheet({ commit }, balanceSheetData) { //余额表数据
    commit('BALANCE_SHEET', balanceSheetData)
  },
  transRepots({ commit }, transReportData) { //余额表流水数据
    commit('TRANSREPORTS', transReportData)
  },
  pagedefult({ commit }, pageData) { //余额表流水分页
    commit('PAGEDEFULT', pageData)
  },
  reportPage({ commit }, orderReportPage) { //订单表input
    commit('REPORTPAGE', orderReportPage)
  },
  dialogBulk({ commit }) { //批量反对账
    commit('DIALOG_BULK')
  },
  dialoggetWebSocket({commit}){//报表通用弹出层
    commit('DIALOGGET_WEB_SOCKET')
  },
}
