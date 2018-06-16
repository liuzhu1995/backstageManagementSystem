<template>
  <div class="btn-list">
    <el-dropdown split-button type="primary" plain size="mini" @click="getBtnInfo($event)">
      <slot name="nameOne"></slot>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item >
          <div @click="getBtnInfo($event)"><slot name="nameTwo"></slot></div>
        </el-dropdown-item>
        <el-dropdown-item >
          <div @click="getBtnInfo($event)"><slot name="nameTree"></slot></div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
      name: "dropDown",
      data() {
        return {

        }
      },
      props: {
        data: {
          type:　Array
        },
        name: {
          type: String
        }
      },
      methods: {
        getBtnInfo(e) {

          let name = e.target.innerText;
          switch (name) {
            case '订单导入':
              this.$router.push('/orderUpload');
              break;
            case '流水导入':
              this.$router.push('/transUpload');
              break;
            case '订单导出':
                console.log('订单导出');
              break;
            case '审核':
              this.$emit('reqParent','audit');
              break;
            case '批量审核':
              this.$store.dispatch('dialogFromAudit');
              break;
            case '反审核':
              this.$emit('reqParent','unAudit');
              break;
            case '批量反审核':
              this.$store.dispatch('dialogFromUnAudit');
              break;
            case '差异对账':
              console.log('差异对账');
              this.$store.dispatch('dialogDifferences');
              break;
            case '批量差异对账':
              this.$store.dispatch('dialogFromDifferences');
              break;
            case '接口获取':
              console.log('接口获取');
              break;
            case '删除':
              this.$emit('reqParent','delete');
              break;
            case '批量删除':
              this.$store.dispatch('dialogFromDelete');
              break;
          }
        },

      }
    }
</script>

<style scoped>

</style>
