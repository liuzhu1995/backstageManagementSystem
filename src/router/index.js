import Vue from 'vue'
import Router from 'vue-router'

const Login = resolve => require(['../page/login/login'], resolve)
const Home = resolve => require(['../page/home/home'], resolve)
const Chart = resolve => require(['../page/chart/chart'], resolve)
const OrderReceivable = resolve => require(['../page/inquiry/OrderReceivable'], resolve)
const TransactionFlow =  resolve => require(['../page/inquiry/TransactionFlow'], resolve)
const SystemStatement = resolve => require(['../page/inquiry/SystemStatement'], resolve)
const orderDetail = resolve => require(['../page/inquiry/children/orderDetail'],resolve)
const orderAdd = resolve => require(['../page/inquiry/children/orderAdd'],resolve)
const BankFlow = resolve => require(['../page/inquiry/BankFlow'], resolve)
const VerifyReceivables = resolve => require(['../page/verifyPlatform/VerifyReceivables'], resolve)
const VerifyBankStatement = resolve => require(['../page/verifyPlatform/VerifyBankStatement'], resolve)
const VerifyReceivablesRecord = resolve => require(['../page/verifyRecord/VerifyReceivablesRecord'], resolve)
const VerifyBankStatementRecord = resolve => require(['../page/verifyRecord/VerifyBankStatementRecord'], resolve)
const OrderSummary =  resolve => require(['../page/reportForms/OrderSummary'], resolve)
const ReceivablesBalance = resolve => require(['../page/reportForms/ReceivablesBalance'], resolve)
const OrderUpload = resolve => require(['../page/upload/orderUpload'], resolve)
const TransUpload = resolve => require(['../page/upload/transUpload'], resolve)
const Structure = resolve => require(['../page/systemSetup/structure'], resolve)
const VerifyAutomate = resolve => require(['../page/verifyPlatform/verifyAutomate'], resolve)
const SelectCompany = resolve => require(['../page/selectCompany/selectCompany'],resolve)
const PlatformSetup = resolve => require(['../page/initialValue/platformSetup'],resolve)
const PayChannel = resolve => require(['../page/initialValue/payChannel'],resolve)
const UpdatePWD = resolve => require(['../page/systemSetup/updatePWD'],resolve)
const OrderRuleList = resolve => require(['../page/ruleSetup/orderRuleList'],resolve)


Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path:'/home',
      component: Home,
      meta: { title: '自述文件' },
      children: [
        { //我的账户
          path: '/chart',
          component: Chart,
          meta: { title: '我的账户' }
        },
        /**
         * inquiry 单据查询
         * **/
        {//订单应收
          path: '/orderReceivable',
          component: OrderReceivable,
          meta: {
            title: '订单应收',
            keepAlive: false
          },
        },
        {//交易流水
          path: '/transactionFlow',
          component: TransactionFlow,
          meta: {
            title: '交易流水',
            keepAlive: false
          }
        },
        {//系统对账单
          path: '/systemStatement',
          component: SystemStatement,
          meta: {
            title: '系统对账单',
            keepAlive: false
          }
        },
        {//银行流水
          path: '/bankFlow',
          component: BankFlow,
          meta: {
            title: '银行流水',
            keepAlive: false
          }
        },
        {
          path: '/orderDetail/:id',
          component: orderDetail,
          name: 'orderDetail',
          meta: { title: '订单详情' }
        },
        {
          path: '/orderAdd',
          component: orderAdd,
          meta: { title: '订单新增' }
        },
        /**
         * verifyPlatform 对账平台
         * **/
        {
          path: '/verifyAutomate',
          component: VerifyAutomate,
          meta: { title: '收款自动对账' }
        },
        {//对账平台
          path: '/verifyReceivables',
          component: VerifyReceivables,
          meta: { title: '收款手动对账' }
        },
        {//银行对账
          path: '/verifyBankStatement',
          component: VerifyBankStatement,
          meta: { title: '银行对账' }
        },

        /**
         * verifyRecord 对账记录
         * **/
        {//银行对账单记录
          path: '/verifyReceivablesRecord',
          component: VerifyReceivablesRecord,
          meta: { title: '收款对账单记录' }
        },
        {//银行对账单记录
          path: '/verifyBankStatementRecord',
          component: VerifyBankStatementRecord,
          meta: { title: '银行对账单记录' }
        },
        /**
         * reportForms报表
         * **/
        {//订单执行汇总表
          path: '/orderSummary',
          component: OrderSummary,
          meta: { title: '订单执行汇总表' }
        },
        {//收款对账余额表
          path: '/receivablesBalance',
          component: ReceivablesBalance,
          meta: { title: '收款对账余额表' }
        },
        {
          path: '/orderUpload',
          component: OrderUpload,
          meta: {title: '订单导入'}
        },
        {
          path: '/transUpload',
          component: TransUpload,
          meta: {title: '流水导入'}
        },
        /**
        * 系统设置
        * */
        {
          path: '/structure',
          component: Structure,
          meta: { title: '组织架构'}
        },
        {
          path: '/updatePWD',
          component: UpdatePWD,
          meta: { title: '修改密码'}
        },
        /**
         *基础资料
         * **/
        {
          path: '/platformSetup',
          component: PlatformSetup,
          meta: { title: '平台管理'}
        },
        {
          path: '/payChannel',
          component: PayChannel,
          meta: { title: '支付渠道管理'}
        },
        /**
         * 规则配置
         * ***/
        {
          path: '/orderRuleList',
          component: OrderRuleList,
          meta: { title: '订单导入规则'}
        }
      ]
    },
    {
      path: '/login',
      component: Login,
      meta: { title: '登陆' }
    },
    {
      path: '/SelectCompany',
      component: SelectCompany,
      meta: {title: '选择公司'}
    },

  ]


})
