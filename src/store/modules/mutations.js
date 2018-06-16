/**
 * Created by 边城浪子刘三慢 on 2018/5/2.
 */
import {
  COLLAPSE, //左侧边栏隐藏状态
  COMPANY,//公司
  VERIFY_STATUS,
  DIALOG_FROM_AUDIT, //批量审核框
  DIALOG_FROM_UN_AUDIT,//批量反审核框
  DIALOG_DIFFERENCES,//差异对账
  DIALOG_FROM_DIFFERENCES,//批量差异对帐
  DIALOG_FROM_DELETE, //批量删除
  DIALOG_FROM_STATEMENT, //报表通用弹出层
  DIALOG_FROM_BILL,//结算金额详情框
  LOAD_DISABLED, //批量操作框请求时显示隐藏遮罩和disabled状态
  ORDER_REPORTS,//报表数据
  STORE_FILTER_DATA, //请求的批量操作框数据
  DIALOG_BULK
} from './mutation-type'

export default {
    //侧边栏
    ['COLLAPSE'](state) {
        state.collapse = !state.collapse
    },
    //将选择的公司
    ['COMPANY'](state, obj) {
        state.companyValue = obj;
    },
    ['VERIFY_STATUS'](state, obj) {
        state.verifyStatus = obj;
    },
    ['ORDER_LIST_INFO'](state, obj) {
        state.orderListUUid = obj;
    },
    ['DIALOG_FROM_AUDIT'](state) {
        state.dialogFromAudit = !state.dialogFromAudit;
    },
    ['DIALOG_FROM_UN_AUDIT'](state) {
        state.dialogFromUnAudit = !state.dialogFromUnAudit
    },
    ['DIALOG_DIFFERENCES'](state) {
      state.dialogDifferences = !state.dialogDifferences
    },
    ['DIALOG_FROM_DIFFERENCES'](state) {
        state.dialogFromDifferences = !state.dialogFromDifferences
    },
    ['DIALOG_FROM_DELETE'](state) {
        state.dialogFromDelete = !state.dialogFromDelete
    },
    ['DIALOG_FROM_BILL'](state) {
      state.dialogFromBill = !state.dialogFromBill
    },
    ['STORE_FILTER_DATA'](state,obj) {
      state.filterData = obj;
    },

    ['LOAD_DISABLED'](state,obj) {
      state.loadDisabled = obj
    },
    ['DIALOG_FROM_STATEMENT'](state) {
        state.dialogFromStatement = !state.dialogFromStatement;
    },
    ['ORDER_REPORTS'](state, obj) {
        state.orderReportData = obj;
    },
    ['BALANCE_SHEET'](state, obj) {
        state.balanceSheetData = obj;
    },
    ['TRANSREPORTS'](state, obj) {
        state.transReportData = obj;
    },
    ['PAGEDEFULT'](state, obj) {
        state.pageData = obj;
    },
    ['REPORTPAGE'](state, obj) {
        state.orderReportPage = obj;
    },
    ['DIALOG_BULK'](state) {
        state.dialogBulk = !state.dialogBulk
    },
    ['DIALOGGET_WEB_SOCKET'](state) {
      state.dialoggetWebSocket = !state.dialoggetWebSocket;
  },

}
