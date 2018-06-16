<template>
  <div class="btn-list">
    <el-button size="mini" type="primary"  @click="getBtnInfo($event)"><slot></slot></el-button>
  </div>
</template>

<script>
  export default {
      name: "el-btn",
      data() {
          return {

          }
      },
      props: [],
      methods: {
        getBtnInfo(e) {
          let name = e.target.innerText;
          if(name ==='新增'){
            this.$router.push('/orderAdd');
          }
          switch (name) {
            case '新增':
              this.$router.push('/orderAdd');
              break;
            case '审核':
              this.$emit('reqParent','audit');
              break;
            case '反审核':
              this.$emit('reqParent','unAudit');
              break;
            case '差异对账':
              this.$store.dispatch('dialogDifferences');
              break;
            case '删除':
              this.$emit('reqParent','delete');
              break;
            case '结算详情':
              console.log('结算详情');
              this.$emit('openBill');
          }
        },
      }
    }
</script>

<style scoped>

</style>
