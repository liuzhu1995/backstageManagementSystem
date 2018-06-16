/**
 * Created by 边城浪子刘三慢 on 2018/4/30.
 */
/*****
 * 获取数据get + 对应路由名称
 * 向后台传数据 store + 对应路由名称
 * 驼峰命名
 * *****/


import { fetch } from "./fetch"; //引用fetch.js
import api from './url'; //引用url.js


//查看用户
export const lookOption = (telphone, password, verifyCode) => fetch({ //lookOption是你要调用接口的名字，issuer,userId是传进来的参数
    //api.Hallowmas 引用url.js里面的数据
    contentType: "application/json; charset=utf-8",
    url: api.Hallowmas + '/user/login',
    method: 'post', //请求方法
    params: {
        telphone,
        password,
        verifyCode //参数
    }
});
//登录页获取验证码
export const verCode = () => fetch({
    method: 'get',
    url: api.Hallowmas + '/imgCode/getImage?' + (new Date()).getTime(),
    params: {}
});

//获取公司列表
export const getCompany = () => fetch({
    url: api.Hallowmas + '/orgUnit/getUserTopOrgunit',
    method: 'post',
    params: {}
});

export const selectCom = (orgUnitId) => fetch({
  url: api.Hallowmas +  '/orgUnit/optionTopOne',
  method: 'post',
  data: {
    companyOwning: orgUnitId
  }
})

//进入公司
export const enterCompany = (companyOwning) => fetch({
    url: api.Hallowmas + '/orgUnit/optionTopOne',

    method: 'post',
    params: {
        companyOwning
    }
});


/**************************************************订单应收******************************************************************/
//订单应收获取数据
export const getOrderReceivable = (customerName, pageNumber, pageSize, settleStatus, sortOrder) => fetch({
    url: api.Hallowmas + "/orderReceivable/find",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        customerName,
        pageNumber,
        pageSize,
        settleStatus,
        sortOrder
    }
});



//订单修改 获取对账计划数据
export const getPlanDate = (orderId) => fetch({
    url: api.Hallowmas + '/reconciliationPlan/getReconciliationPlans',
    method: 'post',
    params: { orderId }
});

//订单修改 获取订单详情数据
export const getOrderDetails = (uuid) => fetch({
    url: api.Hallowmas + '/orderReceivable/getOrderDetail',
    method: 'post',
    params: { uuid }
});

//订单修改 获取销售人员
export const getStaff = () => fetch({
    url: api.Hallowmas + '/user/getUserList',
    method: 'get',
    data: {}
});

//订单修改 保存
export const orderSave = (formData) => fetch({
    url: api.Hallowmas + '/orderReceivable/updateOrder',
    method: 'post',
    data: {
        formData
    }
});
//订单新增加
export const insertOrder = (fromData) => fetch({
  url: api.Hallowmas + '/orderReceivable/insertOrder',
  method: 'post',
  data:  fromData
});


//订单应收分页
export const getorderPage = (customerName, pageNumber, pageSize, settleStatus, sortOrder) => fetch({
    url: api.Hallowmas + "/pageCount/orderPage",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        customerName,
        pageNumber,
        pageSize,
        settleStatus,
        sortOrder
    }
});


//filterBox 获取批量弹出框数据
export const getAuditData = () => fetch({
    url: api.Hallowmas + '/orderReceivable/statusOptions',
    method: 'get',
    data: {}
});


//订单应收 审核audit 删除delete 反审核unAudit
export const Method = (name,url,data) =>fetch({
  url: api.Hallowmas + '/'+ name +'/' + url,
  method: 'post',
  data: data
});

//  订单应收 批量审核audit
export const orderAudit = (
    reconStatus,
    platform,
    status,
    businessDate,
    businessDateEnd,
    orderType,
    ) => fetch({
    url: api.Hallowmas + '/orderReceivable/batchReview',
    method: 'post',
    data: {
        settleStatus: reconStatus,
        platform: platform,
        status: status,
        businessDate: businessDate,
        businessDateEnd: businessDateEnd,
        orderType: orderType,
    }
});

//交易流水 批量审核audit
export const transAudit = (
    businessDate,
    businessDateEnd,
    orderType,
    platform,
    reconStatus,
    remarks,
    status,
) => fetch({
    url: api.Hallowmas + '/transaction/batchReview',
    method: 'post',
    data: {
        businessDate, //开始时间
        businessDateEnd, // 结束时间
        orderType, //订单类型
        platform, //平台
        reconStatus, //对账状态
        remarks, //差异处理原因
        status, //单据状态
    }
});

//订单应收 批量反审核
export const orderUnAudit = (
  businessDate,
  businessDateEnd,
  orderType,
  platform,
  settleStatus,
  status,
) =>fetch({
  url: api.Hallowmas + '/orderReceivable/batchCounteraudit',
  method: 'post',
  data: {
    businessDate,
    businessDateEnd,
    orderType,
    platform,
    settleStatus,
    status,
  }
});

//交易流水 批量反审核
export const transUnAudit = (
  businessDate,
  businessDateEnd,
  orderType,
  platform,
  reconStatus,
  status,
) => fetch({
  url: api.Hallowmas +  '/transaction/batchCounteraudit',
  method: 'post',
  data: {
    businessDate,
    businessDateEnd,
    orderType,
    platform,
    reconStatus,
    status,
  }
});

//订单 批量差异处理
export const orderDifferences = (
  settleStatus,
  platform,
  status,
  businessDate,
  businessDateEnd,
  orderType,
  remarks,
  settleDate,
) => fetch({
  url: api.Hallowmas + '/receivableReconciliation/batchDifferenceProcessing',
  method: 'post',
  data: {
    settleStatus,
    platform,
    status,
    businessDate,
    businessDateEnd,
    orderType,
    remarks,
    settleDate,
  }
});


//交易流水 批量差异处理
export const transDifferences = (
  settleStatus,
  platform,
  status,
  businessDate,
  businessDateEnd,
  orderType,
  remarks,
  settleDate,
) => fetch({
  url: api.Hallowmas + '/transaction/batchDifferenceProcessing',
  method: 'post',
  data: {
    settleStatus,
    platform,
    status,
    businessDate,
    businessDateEnd,
    orderType,
    remarks,
    settleDate,
  }
});
//单据查询差异处理
export const singleDif = (url,dataMore) => fetch({
  url: api.Hallowmas + '/'+ url +'/differenceProcessing',
  method: 'post',
  data: dataMore
});



// 订单批量删除
export const orderDeletes = (
  settleStatus,
  platform,
  status,
  businessDate,
  businessDateEnd,
  orderType,
) => fetch({
  url: api.Hallowmas + '/orderReceivable/batchRemove',
  method: 'post',
  data: {
    settleStatus,
    platform,
    status,
    businessDate,
    businessDateEnd,
    orderType,
  }
});

//交易流水删除
export const transDeletes = (
  settleStatus,
  platform,
  status,
  businessDate,
  businessDateEnd,
  orderType,
) => fetch({
  url: api.Hallowmas + '/transaction/batchRemove',
  method: 'post',
  data: {
    businessDate: businessDate,
    businessDateEnd: businessDateEnd,
    orderType: orderType,
    platform: platform,
    reconStatus: settleStatus,
    status: status
  }

});

//上传文件
export const uploadExcl = (url,fd) => fetch({
  url:  url,
  method: 'post',
  data: fd
});
export const uploadError = (url,fd) => fetch({
  url: url,
  method: 'post',
  data: fd
});

//系统对账单结算详情
export const billData = (uuid) => fetch({
  url: api.Hallowmas +  '/settlementPlatform/getDetail',
  method: 'post',
  params: {
    uuid
  },
});

//组织架构
export const getStructure = () => fetch({
  url: api.Hallowmas + '/menuPermission/getMenuTree',
  method: 'post',
  data: {}
});


//导入页面 请求平台
export const platform = (companyUrl) => fetch({
  url: api.Hallowmas + companyUrl,
  method: 'post',
  data: {}
});


//订单新增 修改 平台
export const orderPlatform = () => fetch({
  url: api.Hallowmas + '/platformManage/getAllPlatformManageList',
  method: 'post',
  data: {}
});

export const ordPlatformDele = (id) => fetch({
  url: api.Hallowmas +  '/platformManage/delPlatformManageById',
  method: 'post',
  params: {
    id
  }
});


/**************************************************交易流水******************************************************************/
//流水获取数据
export const transactionAjax = (platformName, pageNumber, pageSize, reconStatus) => fetch({
    url: api.Hallowmas + "/transaction/find",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        pageNumber,
        pageSize,
        platformName,
        reconStatus
    }
});

//流水分页
export const transactionPage = (platformName, pageNumber, pageSize, reconStatus) => fetch({
    url: api.Hallowmas + "/pageCount/transactionPage",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        pageNumber,
        pageSize,
        platformName,
        reconStatus
    }
});
/**************************************************系统对账单******************************************************************/
//系统对账单获取数据
export const settlementtCheckAjax = (commercialTenantName, commercialTenantNo, companyOwning, pageNumber, pageSize, platformName, reconStatus, status, transNo, ) => fetch({
    url: api.Hallowmas + "/settlementPlatform/findByKey",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        commercialTenantName,
        commercialTenantNo,
        companyOwning,
        pageNumber,
        pageSize,
        platformName,
        reconStatus,
        status,
        transNo,
    }
});

//系统对账单分页
export const settlementtCheckPage = (commercialTenantName, commercialTenantNo, companyOwning, pageNumber, pageSize, platformName, reconStatus, status, transNo, ) => fetch({
    url: api.Hallowmas + "/pageCount/settlementPlatformPage",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        commercialTenantName,
        commercialTenantNo,
        companyOwning,
        pageNumber,
        pageSize,
        platformName,
        reconStatus,
        status,
        transNo,
    }
});
/**************************************************银行流水******************************************************************/
export const bankStatementAjax = (platformName, pageNumber, pageSize, settleStatus) => fetch({
    url: api.Hallowmas + "/bankFlowing/findByParms",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        pageNumber,
        pageSize,
        platformName,
        settleStatus

    }
});

//银行流水分页
export const bankStatementPage = (platformName, pageNumber, pageSize, settleStatus) => fetch({
    url: api.Hallowmas + "/pageCount/bankFlowingPage",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        pageNumber,
        pageSize,
        platformName,
        settleStatus
    }
});
/**************************************************收款自动对账******************************************************************/
//选择平台
export const getPlatform = () => fetch({
    url: api.Hallowmas + "/platformManage/getPlatformManageList",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {}
});
//订单规则
export const initRules = () => fetch({
    url: api.Hallowmas + "/matchingRole/find",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    params: {
        type: 'ReceivableReconciliation'
    }
});
//执行对账
export const autoAjax = (platformIds, businessDate, recordDate, matchingRoleId, url1) => fetch({
    url: api.Hallowmas + "/receivableReconciliation/" + url1,
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        platformIds,
        businessDate,
        recordDate,
        matchingRoleId,
    }
});
/**************************************************收款手动对账******************************************************************/
//收款应收获取数据
export const receivingRecon = (pageNumber, pageSize, settleStatus, status, settlementStatus) => fetch({
    url: api.Hallowmas + "/orderReceivable/find",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        companyOwning: '',
        pageNumber,
        pageSize,
        settleStatus,
        status,
        settlementStatus
    }
});
//订单分页
export const ReconPageAjax = (pageNumber, pageSize, settleStatus, status, settlementStatus) => fetch({
    url: api.Hallowmas + "/pageCount/orderPage",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        companyOwning: '',
        pageNumber,
        pageSize,
        settleStatus,
        status,
        settlementStatus
    }
});
//订单应收加载子表
export const getOrderPlans = (orderId) => fetch({
    url: api.Hallowmas + "/reconciliationPlan/getReconciliationPlans",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    params: {
        orderId
    }
});
//收款流水获取数据
export const receivingtransAjax = (pageNumber, pageSize, reconStatus, status, businessType) => fetch({
    url: api.Hallowmas + "/transaction/find",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        companyOwning: '',
        pageNumber,
        pageSize,
        reconStatus,
        status,
        businessType
    }
});
//流水分页
export const transPageAjax = (pageNumber, pageSize, reconStatus, status, businessType) => fetch({
    url: api.Hallowmas + "/pageCount/transactionPage",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        companyOwning: '',
        pageNumber,
        pageSize,
        reconStatus,
        status,
        businessType
    }
});
//对账接口
export const autoMeney = (url, data) => fetch({
    url: api.Hallowmas + "/receivableReconciliation/" + url,
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: data
});
/**************************************************银行对账******************************************************************/
//收款系统对账单获取数据
export const statement = (pageNumber, pageSize, reconStatus, status) => fetch({
    url: api.Hallowmas + "/settlementPlatform/findByKey",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        companyOwning: '',
        pageNumber,
        pageSize,
        reconStatus,
        status
    }
});
// //对账单分页
export const statementPageAjax = (pageNumber, pageSize, reconStatus, status) => fetch({
    url: api.Hallowmas + "/pageCount/settlementPlatformPage",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        companyOwning: '',
        pageNumber,
        pageSize,
        reconStatus,
        status
    }
});

//银行对账获取数据
export const bankAjax = (pageNumber, pageSize, settleStatus, status) => fetch({
    url: api.Hallowmas + "/bankFlowing/findByParms",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        companyOwning: '',
        pageNumber,
        pageSize,
        settleStatus,
        status
    }
});
//银行分页
export const bankPageAjax = (pageNumber, pageSize, settleStatus, status) => fetch({
    url: api.Hallowmas + "/pageCount/bankFlowingPage",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        companyOwning: '',
        pageNumber,
        pageSize,
        settleStatus,
        status
    }
});
// //对账接口
export const autobank = (data) => fetch({
    url: api.Hallowmas + "/bankReconciliation/manualSettle",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: data
});
/**************************************************收款对账记录******************************************************************/
export const recordAjax = (pageNumber, pageSize, reconStatus) => fetch({
    url: api.Hallowmas + "/receivableReconciliation/findPageSup",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        pageNumber,
        pageSize,
        reconStatus
    }
});
//记录分页
export const recordPage = (pageNumber, pageSize, reconStatus) => fetch({
    url: api.Hallowmas + "/pageCount/receivableReconciliationPage",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        pageNumber,
        pageSize,
        reconStatus
    }
});
//批量反对账
export const batchSettle = (
    settleDateStart,
    settleDateEnd,
    orderDateStart,
    orderDateEnd,
    transactionDateStart,
    transactionDateEnd,
    settleType,
    settleRuleArry,
    businessType,
    platformArry,
    batchNo,
    exception
) => fetch({
    url: api.Hallowmas + "/receivableReconciliation/batchDelete",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        settleDateStart,
        settleDateEnd,
        orderDateStart,
        orderDateEnd,
        transactionDateStart,
        transactionDateEnd,
        settleType,
        settleRuleArry,
        businessType,
        platformArry,
        batchNo,
        exception
    }
})

//单个选择反对账
export const deleteRecord = (data) => fetch({
    url: api.Hallowmas + "/receivableReconciliation/delete",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: data
})
//批量反对账中的字段
export const checkpeople = () => fetch({
  url: api.Hallowmas + "/receivableReconciliation/checkForPeople",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post'
})
export const keyWays = () => fetch({
  url: api.Hallowmas + "/receivableReconciliation/checkForWays",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post'
})
export const bussineAjax = () => fetch({
  url: api.Hallowmas + "/receivableReconciliation/checkBusinessType",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post'
})
//平台类型
export const getPlatAjax = () => fetch({
  url: api.Hallowmas + "/platform/getAllPlatformList",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post'
})
export const getRulist=()=>fetch({
  url:api.Hallowmas+"/matchingRole/find",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  params:{
    type: 'ReceivableReconciliation'
  }
})


//展示失败反对账记录
export const showWriteBankError = (
        pageNumber,
        pageSize
    ) => fetch({
        url: api.Hallowmas + "/receivableReconciliation/showWriteBankErrorResult",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        method: 'post',
        data: {
            pageNumber,
            pageSiz
        }
    })
    //业务类型
export const businessTypeList = () => fetch({
    url: api.Hallowmas + "/receivableReconciliation/checkBusinessType",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post'
});

//对账方式
export const settleTypeList = () => fetch({
    url: api.Hallowmas + "/receivableReconciliation/checkForWays",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post'
});

//对账人
export const settleUsers = () => fetch({
    url: api.Hallowmas + "/receivableReconciliation/checkForPeople",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
});

//对账规则
export const matchRoles = () => fetch({
    url: api.Hallowmas + "/matchingRole/find",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        type: 'ReceivableReconciliation'
    }
});


/**************************************************银行对账记录******************************************************************/
export const bankRecordAjax = (pageNumber, pageSize, companyOwning, status) => fetch({
    url: api.Hallowmas + "/bankReconciliation/find",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        companyOwning,
        pageNumber,
        pageSize,
        status
    }
});
//记录分页
export const bankRecordPage = (pageNumber, pageSize, companyOwning, status) => fetch({
    url: api.Hallowmas + "/pageCount/bankReconciliationPage",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        companyOwning,
        pageNumber,
        pageSize,
        status
    }
});
//单个选择反对账
export const deletebank = (data) => fetch({
    url: api.Hallowmas + "/bankReconciliation/reverseSettle",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: data
});
/**************************************************订单报表******************************************************************/
export const orderReports = (
    pageNumber,
    pageSize,
    status,
    reconStatus,
    businessDateStart,
    businessDateEnd,
    settleStatus,
    differenceProcessingStatus,
    settlementStatus,
    platform,
    salesCompany
) => fetch({
    url: api.Hallowmas + "/orderReceivable/orderDetails",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        companyOwning: "",
        pageNumber,
        pageSize,
        status,
        reconStatus,
        businessDateStart,
        businessDateEnd,
        settleStatus,
        differenceProcessingStatus,
        settlementStatus,
        platform,
        salesCompany,
    }
});


//收款汇总表
export const balanceSheetAjax = (
    pageNumber,
    pageSize,
    pageNumberTwo,
    pageSizeTwo,
    status,
    reconStatus,
    businessDateStart,
    businessDateEnd,
    settleStatus,
    differenceProcessingStatus,
    settlementStatus,
    platform,
    salesCompany
) => fetch({
    url: api.Hallowmas + "/orderReceivable/balanceSheet",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    method: 'post',
    data: {
        // companyOwning: "",
        pageNumber,
        pageSize,
        pageNumberTwo,
        pageSizeTwo,
        status,
        reconStatus,
        businessDateStart,
        businessDateEnd,
        settleStatus,
        differenceProcessingStatus,
        settlementStatus,
        platform,
        salesCompany,
    }
});
/**************************************************高级查询接口******************************************************************/
//select下拉数据
export const selectUrl = (index) => fetch({
  url: api.Hallowmas + "/advanedQuery/advanedQuerylist",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: {
    index
  }
});
//方案列表
export const getListUrl = (index) => fetch({
  url: api.Hallowmas + "/scheme/finlName",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: {
    index
  }
});
//方案
export const taburl = (uuid,index) => fetch({
  url: api.Hallowmas + "/queryPlan/finl",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: {
    index,
    uuid
  }
});
//删除方案
export const deleteProgram = (queryplanname,schemeid,index) => fetch({
  url: api.Hallowmas + "/queryPlan/delete",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: {
    index,
    queryplanname,
    schemeid
  }
});
//保存方案
export const addSave = (data) => fetch({
  url: api.Hallowmas + "/queryPlan/add",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: data
});
//下拉的平台各种类型
//支付渠道
export const channelAjax = () => fetch({
  url: api.Hallowmas + "/payChannelManage/getPayChannelManageList",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post'
});
//支付渠道类型
export const channelType = () => fetch({
  url: api.Hallowmas + "/payChannel/getAllPayChannelList",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post'
});
//更新方案
export const updateSave = (data) => fetch({
  url: api.Hallowmas + "/queryPlan/updateQueryPlan",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: data
});
//重命名
export const getrenameAjax = (uuid,schemenaem,userid,index) => fetch({
  url: api.Hallowmas + "/queryPlan/rename",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: {
    index,
    uuid,
    schemenaem,
    userid
  }
});
//收款对账高级查询
export const recordmand = (data) => fetch({
  url: api.Hallowmas + "/advanedQuery/receivableReconciliationlist",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: data
});
//收款对账高级分页
export const recordmandPage = (data) => fetch({
  url: api.Hallowmas + "/pageCount/receivableReconciliationAdvancePage",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: data
});
//默认方案
export const defaultCheck = (uuid,display,schemenaem,index) => fetch({
  url: api.Hallowmas + "/scheme/updatenameone",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: {
    uuid,
    display,
    schemenaem,
    index
  }
});
//银行对账高级查询
export const bankSearchAjax = (data) => fetch({
  url: api.Hallowmas + "/advanedQuery/Querylist",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: data
});
//银行对账分页
export const bankSearchPage = (data) => fetch({
  url: api.Hallowmas + "/pageCount/bankReconciliationAdvancedPage",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: data
});
//订单应收高级查询
export const orderSearchAjax = (data) => fetch({
  url: api.Hallowmas + "/advanedQuery/orderReceivablelist",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: data
});
//订单应收对账分页
export const orderSearchPage = (data) => fetch({
  url: api.Hallowmas + "/pageCount/orderAdvancedPage",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: data
});
//银行高级查询
export const bankFlowAjax = (data) => fetch({
  url: api.Hallowmas + "/advanedQuery/bankFlowinglist",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: data
});
//银行对账分页
export const bankFlowPage = (data) => fetch({
  url: api.Hallowmas + "/pageCount/bankFlowingAdvancePage",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: data
});
//系统对账高级查询
export const systemStatementAjax = (data) => fetch({
  url: api.Hallowmas + "/advanedQuery/settlementPlatformlist",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: data
});
//系统对账分页
export const systemStatementPage = (data) => fetch({
  url: api.Hallowmas + "/pageCount/settlementPlatformAdvancedPage",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: data
});
//交易流水高级查询
export const transactionFlowAjax = (data) => fetch({
  url: api.Hallowmas + "/advanedQuery/transactionlist",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: data
});
//交易流水分页
export const transactionFlowPage = (data) => fetch({
  url: api.Hallowmas + "/advanedQuery/transactionPage",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: data
});
//判断是否默认
export const requirement = (index) => fetch({
  url: api.Hallowmas + "/scheme/nameone",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data: {
    index
  }
});
/*************************************************************系统设置********************************************************************/
//修改密码
export const updatePassWord=(oldpassword,password,repassword)=>fetch({
  url:api.Hallowmas + '/user/updatePassWord',
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  params:{
    oldpassword,
    password,
    repassword
  }
});

export const orderRukeList=(pageNumber,pageSize)=>fetch({
  url:api.Hallowmas + '/checketDetail/getChecketDetailPlatforms',
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  method: 'post',
  data:{
    type: 'Order',
    params:'',
    pageNumber,
    pageSize,
  }
});
//获取验证码
// export const getcaptchas = () => fetch('', {}, 'POST'); //简写

//有新接口的时候像上面那样再来一次
// //修改昵称接口
// export function userID(name){
//   return fetch({
//     url:api.myself_name,
//     method:"put",
//     data:{
//       nickname:name
//     }
//   })
// }
//
//
// //取消转发赞踩接口
// export function cancelForward(articleId,type){
//   return fetch({
//     url:api.detail_article+articleId+"/forwarded_impress",
//     method:"delete",
//     params:{
//       type:type
//     }
//   })
// }

//导入
export const leadingIn = () => fetch('', {}, 'POST');
