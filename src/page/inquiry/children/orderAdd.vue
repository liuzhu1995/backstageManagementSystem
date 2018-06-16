<template>
  <div class="order-add">
    <div class="head_search">
      <h2>订单新增</h2>
    </div>
    <template>
      <el-tabs v-model="activeNameOne">
        <!--基本信息-->
        <!--基本信息-->
        <el-tab-pane label="基本信息" name="basicInfo">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content">
                <span>单据类型:</span>
                <el-select v-model="fromData.orderType" size="small" placeholder="单据类型" >
                  <el-option
                    v-for="item in orderTypeSelect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>单据编号:</span>
                <el-input
                  placeholder="单据编号"
                  size="small"
                  v-model="fromData.billNo"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>平台:</span>
                <el-select v-model="fromData.platform" size="small" placeholder="平台" >
                  <el-option
                    v-for="item in orderPlatformData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>销售公司:</span>
                <el-input
                  placeholder="销售公司"
                  size="small"
                  v-model="fromData.salesCompany"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content">
                <span>业务日期:</span>
                <el-date-picker
                  v-model="fromData.businessDate"
                  size="small"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>对账金额:</span>
                <el-input
                  placeholder="请输入内容"
                  size="small"
                  v-model="fromData.totalAmount"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>平台订单号:</span>
                <el-input
                  placeholder="请输入内容"
                  size="small"
                  v-model="fromData.orderNo"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>销售部门:</span>
                <el-input
                  placeholder="请输入内容"
                  size="small"
                  v-model="fromData.salesDepartment"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content">
                <span>对账状态:</span>
                <el-select v-model="fromData.settleStatus" size="small" placeholder="对账状态" :disabled="true">
                  <el-option
                    v-for="item in settleStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>已对账金额:</span>
                <el-input
                  placeholder="请输入内容"
                  size="small"
                  v-model="fromData.settleAmount"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>未对账金额:</span>
                <el-input
                  placeholder="请输入内容"
                  size="small"
                  v-model="fromData.unsettleAmount"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>销售员:</span>
                <el-select v-model="fromData.salesman" placeholder="请选择" size="small" @change="selectStaff">
                  <el-option
                    v-for="(item,index) in getStaffList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content">
                <span>退款状态:</span>
                <el-select v-model="fromData.reconStatus" size="small" placeholder="退款状态" :disabled="true">
                  <el-option
                    v-for="item in reconStatusSelect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>已退款金额:</span>
                <el-input
                  placeholder="请输入内容"
                  size="small"
                  v-model="fromData.settlementMoney"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>未退款金额:</span>
                <el-input
                  placeholder="未退款金额"
                  size="small"
                  v-model="fromData.unsettlementMoney"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>单据状态:</span>
                <el-select v-model="fromData.status" size="small" placeholder="单据状态" :disabled="true">
                  <el-option
                    v-for="item in status"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content">
                <span>是否差异处理:</span>
                <el-select v-model="fromData.differenceProcessingStatus" size="small" placeholder="是否差异处理" :disabled="true">
                  <el-option
                    v-for="item in differenceProcessingStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>差异处理金额:</span>
                <el-input
                  placeholder="差异处理金额"
                  size="small"
                  v-model="fromData.differenceProcessingAmount"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>差异处理原因:</span>
                <el-input
                  placeholder="差异处理原因"
                  size="small"
                  v-model="fromData.differenceProcessingRamarks"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>备注:</span>
                <el-input
                  placeholder="备注"
                  size="small"
                  v-model="fromData.remarks">
                </el-input>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!--订单信息-->
        <el-tab-pane label="订单信息" name="orderInfo">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content">
                <span>订单总金额:</span>
                <el-input
                  placeholder="订单总金额"
                  size="small"
                  v-model="fromData.orderTotalAmount"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>积分:</span>
                <el-input
                  placeholder="单据编号"
                  size="small"
                  v-model="fromData.orderInitAmount"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>平台优惠券:</span>
                <el-input
                  placeholder="平台"
                  size="small"
                  v-model="fromData.platform"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>平台优惠券:</span>
                <el-input
                  placeholder="销售公司"
                  size="small"
                  v-model="fromData.salesCompany"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content">
                <span>保险:</span>
                <el-input
                  placeholder="保险"
                  size="small"
                  v-model="fromData.totalAmount"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>运费:</span>
                <el-input
                  placeholder="运费"
                  size="small"
                  v-model="fromData.totalAmount"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>买家支付金额:</span>
                <el-input
                  placeholder="买家支付金额"
                  size="small"
                  v-model="fromData.orderNo"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>佣金:</span>
                <el-input
                  placeholder="佣金"
                  size="small"
                  v-model="fromData.salesDepartment"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content">
                <span>结算金额:</span>
                <el-input
                  placeholder="结算金额"
                  size="small"
                  v-model="fromData.settlementdMoney"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!--其它-->
        <el-tab-pane label="其它" name="createInfo">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content">
                <span>创建人:</span>
                <el-input
                  placeholder="创建人"
                  size="small"
                  v-model="fromData.creator"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <span>修改人:</span>
                <el-input
                  placeholder="修改人"
                  size="small"
                  v-model="fromData.operator"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <span>审核人:</span>
                <el-input
                  placeholder="审核人"
                  size="small"
                  v-model="fromData.auditor"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content">
                <span>创建日期:</span>
                <el-input
                  placeholder="创建日期"
                  size="small"
                  v-model="fromData.createTime"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <span>修改日期:</span>
                <el-input
                  placeholder="修改日期"
                  size="small"
                  v-model="fromData.updateTime"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <span>审核日期:</span>
                <el-input
                  placeholder="审核日期"
                  size="small"
                  v-model="fromData.auditTime"
                  :disabled="true">
                </el-input>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </template>
    <!--表单-->
    <template>
      <el-tabs type="border-card" v-model="activeNameTwo">
        <div class="btn-wrap">
          <el-button size="small" type="primary" @click="addTr">新增</el-button>
        </div>
        <el-tab-pane label="对账计划" name="collate"> <!--collate 对账-->
          <template>
            <el-table
              :data="fromData.reconciliationPlanInfoList"
              border
              width="100%">
              <el-table-column
                prop="name"
                label="名称">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.reconciliationPlanInfoList[scope.$index].name"
                    placeholder="名称">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="money"
                label="金额">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.reconciliationPlanInfoList[scope.$index].money"
                    placeholder="金额">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="settleAmount"
                label="已对账金额">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.reconciliationPlanInfoList[scope.$index].settleAmount"
                    placeholder="已对账金额"
                    :disabled="true">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="unsettleAmount"
                label="未对账金额">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.reconciliationPlanInfoList[scope.$index].unsettleAmount"
                    placeholder="未对账金额"
                    :disabled="true">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="settlementMoney"
                label="已退款金额">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.reconciliationPlanInfoList[scope.$index].settlementMoney"
                    placeholder="已退款金额"
                    :disabled="true">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="unsettlementMoney"
                label="未退款金额">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.reconciliationPlanInfoList[scope.$index].unsettlementMoney"
                    placeholder="未退款金额"
                    :disabled="true">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="操作"
                width="80px">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="订单明细" name="detail"><!--detail 明细-->
          <template>
            <el-table
              :data="fromData.orderReceivableSupList"
              border
              width="100%">
              <el-table-column
                prop="firstCommodityClass"
                label="一级类目名称"
                width="160px">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.orderReceivableSupList[scope.$index].firstCommodityClass"
                    placeholder="一级类目名称">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="secondCommodityClass"
                label="二级类目名称"
                width="160px">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.orderReceivableSupList[scope.$index].secondCommodityClass"
                    placeholder="二级类目名称">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="specification"
                label="规格"
                width="160px">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.orderReceivableSupList[scope.$index].specification"
                    placeholder="规格">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="commodityNum"
                label="商品编码"
                width="160px">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.orderReceivableSupList[scope.$index].commodityNum"
                    placeholder="商品编码">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="productName"
                label="产品名称(SPU名称)"
                width="160px">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.orderReceivableSupList[scope.$index].productName"
                    placeholder="产品名称(SPU名称)">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="SKU"
                label="SKU编码"
                width="160px">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.orderReceivableSupList[scope.$index].SKU"
                    placeholder="SKU编码">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="SKUNum"
                label="SKU值"
                width="160px">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.orderReceivableSupList[scope.$index].SKUNum"
                    placeholder="SKU值">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="groupSKU"
                label="是否为组合商品"
                width="160px">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.orderReceivableSupList[scope.$index].groupSKU"
                    placeholder="是否为组合商品">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="productNum"
                label="产品数量">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.orderReceivableSupList[scope.$index].productNum"
                    placeholder="产品数量">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="commission"
                label="商品门市价"
                width="160px">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.orderReceivableSupList[scope.$index].commission"
                    placeholder="商品门市价">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="unitPrice"
                label="商品销售价"
                width="160px">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.orderReceivableSupList[scope.$index].unitPrice"
                    placeholder="商品销售价">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="commodityOfficialPrice"
                label="商品官网价"
                width="160px">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.orderReceivableSupList[scope.$index].commodityOfficialPrice"
                    placeholder="商品官网价">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="amount"
                label="商品实际售价(总)"
                width="160px">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.orderReceivableSupList[scope.$index].amount"
                    placeholder="商品实际售价(总)">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="platformCoupon"
                label="商品卡券优惠金额(总)"
                width="160px">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.orderReceivableSupList[scope.$index].platformCoupon"
                    placeholder="商品卡券优惠金额(总)">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="commodityReceivablePrice"
                label="商品应收金额"
                width="160px">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.orderReceivableSupList[scope.$index].commodityReceivablePrice"
                    placeholder="商品应收金额">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="commodityVoucherNumber"
                label="商品代金券号"
                width="160px">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.orderReceivableSupList[scope.$index].commodityVoucherNumber"
                    placeholder="商品代金券号">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="paymentNumber"
                label="支付号"
                width="160px">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="fromData.orderReceivableSupList[scope.$index].paymentNumber"
                    placeholder="支付号">
                  </el-input>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>
    </template>
    <div class="bottom-btn">
      <el-button size="small" type="primary" @click="save">保存</el-button>
      <el-button size="small" type="primary" @click="audit">审核</el-button>
      <el-button size="small" type="primary" @click="goBack">返回</el-button>
      <!--<el-button size="small" type="primary">提交审核</el-button>-->
    </div>
  </div>
</template>

<script>
  import {getOrderReceivable,getStaff,insertOrder,orderPlatform,Method} from '../../../axios/api'
  export default {
    name: 'orderAdd',
    data () {
      return {
        id: [],//保存成功后返回的id
        orderPlatformData: [],//所有的平台
        getStaffList: [],//销售员
        getLocalDataList: null, //请求的数据
        index: null,
        activeNameOne: 'basicInfo',//v-model默认选中的tab
        activeNameTwo: 'collate',//v-model默认选中的tab
        fromData: { //新增储存的数据
          /*
           * 基本信息
           * */
          orderType: '',//单据类型
          businessDate: '',//业务日期
          settleStatus: 'UnSettled',//对账状态
          reconStatus: 'UnSettled',//退款状态
          billNo: '',//单据编号
          totalAmount: '',//对账金额
          settleAmount: '',//已对账金额
          settlementMoney: '',//已退款金额
          platform: '',//平台
          orderNo: '',//平台订单号
          unsettleAmount: '',//未对账金额
          unsettlementMoney: '',//未退款金额
          salesCompany: '',//销售公司
          salesDepartment: '',//销售部门
          status: 'Save',//单据状态
          remarks: '',//备注
          salesman: '',//销售员
          differenceProcessingRamarks: '',//差异处理原因
          differenceProcessingAmount: '',//差异处理金额
          differenceProcessingStatus: '',//是否差异处理
          /*
           * 订单信息
           * */
          orderTotalAmount: '', //订单总金额
          orderInitAmount: '', //订单初始支付金
          orderReceiveAmount: '', //订单货到应收
          freight: '', //运费
          orderDiscountAmount: '', //订单优惠抵扣
          couponName: '', //优惠券名称
          orderStatus: '', //订单状态
          payState: '', //支付状态
          payType: '', //支付方式
          cancelReason: '', //取消理由
          haveOtherOrder: '', //是否拆单
          orderTypeBelong: '', //所属订单类型
          groupPurchaseVerificationCode: '', //团购验证码
          orderPickUpEmp: '', //接单人
          orderOperator: '', //操作人
          /*
           * 其它
           * */
          creator: '',//创建人
          createTime: '',//创建日期
          operator: '',//修改人
          updateTime: '',//修改日期
          auditor: '',//审核人
          auditTime: '',//审核日期
          reconciliationPlanInfoList:[{//对账计划
            name: '',
            money: '',
            settleAmount: '',
            unsettleAmount: '',
            settlementMoney: '',
            unsettlementMoney: ''
          }
          ],
          orderReceivableSupList:[{//订单明细
            firstCommodityClass: '',//一级类目名称
            secondCommodityClass: '',//二级类目名称
            commodityName: '',//商品名称
            specification: '',//规格
            commodityNum: '',//商品编码
            productName: '',//产品名称
            SKU: '',//SKU编码
            SKUNum: '',//SKU值
            groupSKU: '',//是否为组合商品
            productNum: '',//商品数量
            commission: '',//商品门市价
            unitPrice: '',//商品销售价
            //商品活动价(总)
            commodityOfficialPrice: '',//商品官网价
            amount: '',//商品实际售价(总)
            platformCoupon: '',//商品卡券优惠金额(总)
            commodityReceivablePrice: '',//商品应收金额
            commodityVoucherNumber: '',//商品代金券号
            paymentNumber: '',//支付号
          }],
          receivableRelationInfoList:[{//关联信息
            name: '', //名称
            money: '',//金额
            relationMoney: '',//关联金额
            transNum: '',//交易流水号
            settleNum: '' ,//结算单号
            bankNum: '',//银行流水号
          }],
        },
        orderTypeSelect: [{ //单据类型
          value: 'platformOrders',
          label: '平台订单'
        }, {
          value: 'manualOrders',
          label: '手工订单'
        }],
        reconStatusSelect: [//退款状态
          {value: 'UnSettled',label: '未退款'},
          {value: 'Part', label: '部分退款'},
          {value: 'Completely', label: '完全退款'}],
        haveOtherOrder: [
          {value: '1', label: '是'},
          {value: '0', label: '否'}],
        //对账状态
        settleStatus: [
          {value: 'UnSettled', label: '未对账'},
          {value: 'Part', label: '部分对账'},
          {value: 'Completely', label: '完全对账'}
        ],
        differenceProcessingStatus: [
          {value: 'Y', label: '是'},
          {value: 'N', label: '否'}
        ],
        status: [
          {value: 'Save', label: '保存'},
          {value: 'Audited', label: '已审核'},
          {value: 'Invalid', label: '关闭'}
        ]
      }
    },
    mounted(){
      this.getLocalData();
      this.getStaffData();
      this.getPlatform();
    },
    methods: {
      save() { //保存
        insertOrder(this.fromData).then(res =>{
          if(res.data.status === '200') {
            this.$message.success(res.data.msg);
            this.id.push(res.data.obj)
          }else {
            this.$message.error(res.data.msg);
          }
        });
      },
      audit() { //审核
        let name = 'orderReceivable';
        if(this.id.length) {
          Method(name,'audit',this.id).then(res=>{
            if(res.data.status === '200') {
              this.$message.success(res.data.msg)
            }else {
              this.$message.error(res.data.msg)
            }
          })
        }else {
          this.$message.error('数据未保存');
        }
      },
      goBack() { //返回
        this.$router.push('/orderReceivable')
      },
      getLocalData(){ // 请求数据
        getOrderReceivable().then(res => {
//            this.getLocalDataList = res.data.rows;
        })
      },
      getData(){
        console.log(this.fromData);
      },
      handleDelete(index) { //删除
        let name = this.activeNameTwo;
        if(name === 'collate'){
          this.fromData.reconciliationPlanInfoList.splice(index,1)
        }else if(name ==='relevance'){
          this.fromData.receivableRelationInfoList.splice(index,1)
        }
      },
      addTr(){ /*新增(对账计划订单明细关联信息)*/
        let name = this.activeNameTwo;
        if(name === 'collate'){
          this.fromData.reconciliationPlanInfoList.push({
            name: null,
            money: null,
            settleAmount: null,
            unsettleAmount: null,
            settlementMoney: null,
            unsettlementMoney: null,
          })
        }else if(name === 'detail'){
          this.fromData.orderReceivableSupList.push({
            firstCommodityClass: null,//一级类目名称
            secondCommodityClass: null,//二级类目名称
            commodityName: null,//商品名称
            specification: null,//规格
            commodityNum: null,//商品编码
            productName: null,//产品名称
            SKU: null,//SKU编码
            SKUNum: null,//SKU值
            groupSKU: null,//是否为组合商品
            productNum: null,//商品数量
            commission: null,//商品门市价
            unitPrice: null,//商品销售价
            //商品活动价(总)
            commodityOfficialPrice: null,//商品官网价
            amount: null,//商品实际售价(总)
            platformCoupon: null,//商品卡券优惠金额(总)
            commodityReceivablePrice: null,//商品应收金额
            commodityVoucherNumber: null,//商品代金券号
            paymentNumber: null,//支付号
          })
        }else if(name ==='relevance'){
          this.fromData.receivableRelationInfoList.push({//关联信息
            name: null, //名称
            money: null,//金额
            relationMoney: null,//关联金额
            transNum: null,//交易流水号
            settleNum: null ,//结算单号
            bankNum: null,//银行流水号
          })
        }
      },
      getStaffData(){ //获取所有销售人员
        getStaff().then(res=>{
          if(res.data.status === '200') {
            this.getStaffList = res.data.obj;
          }
        });
      },
      selectStaff(){ //选中的销售人员
        this.getStaffList.forEach((value,index)=>{
          if(this.fromData.salesman === value.name){
            this.fromData.salesCompany = value.companyName;
            this.fromData.salesDepartment = value.departmentName;
          }
        })
      },
      getPlatform() {
        orderPlatform().then(res =>{
          if(res.data.status === '200') {
            this.orderPlatformData = JSON.parse(res.data.obj.data);
          }
        })
      }
    }
  }
</script>
<style scoped>
  .el-input--mini .el-input__inner{
    margin: 3px 0;
  }
  .bottom-btn{
    margin-top: 20px;
    text-align: center;
  }
</style>
