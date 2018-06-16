<template>
    <div class="transUpload">
      <uploadExcl></uploadExcl>
    </div>
</template>

<script>
  import uploadExcl from '../upload/children/uploadExcl'
  export default {
    name: "transUpload",
    components: {
      uploadExcl,
    },
    data() {
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
  .transUpload{
    padding: 20px;
  }
  .transUpload>div{
    width: 50%;
  }
</style>
