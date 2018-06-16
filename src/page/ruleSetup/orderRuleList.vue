<template>
  <div class="order-rule_list">
    <template>
        <el-table
                fit
                border
                :data="dataPlatform"
                @row-click="platformDefult"
                highlight-current-row
                height="535">
            <el-table-column
                    type="index"
                    label="序号"
                    width="60">
            </el-table-column>
            <el-table-column
                    prop="platformName"
                    label="平台类型"
                    width="">
            </el-table-column>


        </el-table>
    </template>
  </div>
</template>

<script>
    import {orderRukeList} from '../../axios/api.js'
    export default {
        name: "orderRuleList",
        data(){
          return{
            dataPlatform:[],
            business: {
                pageNumber: 1, //第几页
                pageSize: 100, //每页展示数
                total: 0, //总页数
                selectPageNumber: 1 //选中的页数
            },
          }
        },
        mounted(){
          this.platLoad()
        },
        methods:{
          platLoad(){
            orderRukeList(this.business.pageNumber,this.business.pageSize).then(res=>{
              this.dataPlatform = res.data.obj;
            })
          },
          platformDefult(){

          },
        }
    }
</script>

<style scoped>

</style>
