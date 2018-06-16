
<template>
    <div class="orderUpload">
      <div class="box-card">
        <uploadExcl></uploadExcl>
      </div>
      <div class="box-card">
        <uploadError></uploadError>
      </div >
    </div>
</template>

<script>
  import uploadExcl from '../upload/children/uploadExcl'
  import uploadError from '../upload/children/uploadError'
    export default {
      name: 'orderUpload',
      components: {
        uploadExcl,
        uploadError
      },
      data () {
        return {


        }
      },
      mounted() {

      },
      methods:{

      }
    }
</script>
<style scoped>
.upload{
  padding-top: 20px;
  /*width: 360px;*/
}
  .name{
    margin-left: 10px;
  }
  .orderUpload>div{
    width: 50%;
    margin-bottom: 50px;
  }
</style>
