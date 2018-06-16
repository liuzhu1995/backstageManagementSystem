<template>
    <div class="loginContainer">
      <div class="loginTitle">对账平台</div>
      <div class="loginForm">
        <el-form
          :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              size="small"
              placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              size="small"
              placeholder="密码">
            </el-input>
          </el-form-item>
          <el-form-item prop="codeNumber">
            <div class="captcha-wrap el-form-item">
              <el-input
                placeholder="验证码"
                size="small"
                maxlength="6"
                v-model="ruleForm.codeNumber"
                @keyup.enter.native="submitForm('ruleForm')"></el-input>
              <div class="captcha-img">
                <img @click="getCaptchaCode" :src="imgSrc" alt="" class="captcha">
              </div>
            </div>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </div>
          <p style="font-size:12px;line-height:30px;color:#999;"> © 2018 对账平台</p>
        </el-form>
      </div>

    </div>
</template>

<script>
  import {lookOption,verCode,selectCom} from '../../axios/api';
  import api from '../../axios/url.js'; //引用url.js

    export default {
        name: 'HelloWorld',
        data () {
            return {
              showPassword: false, // 是否显示密码
              captchaCodeImg:'',
              userInfo:null,//用户信息
              alertText: null, //提示的内容
              ruleForm: {
                username: '',//账号
                password: '',//密码
                codeNumber:'',//验证码
              },
              rules: {
                username: [
                  { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                  { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                codeNumber: [
                  { required: true, message: '请输入验证码', trigger: 'blur'}
                ]
              },
              imgSrc:null,  //验证码图片
            }
        },

      mounted(){
          this.getCaptchaCode()
      },
      methods: {
        //获取验证码
         getCaptchaCode(){
           const that = this;
          console.log('刷新验证码');
          verCode().then(res=>{

          }).catch(res=>{});
          that.imgSrc =api.Hallowmas + '/imgCode/getImage?' + (new Date()).getTime();
           console.log(that.imgSrc);
         },
        //登陆
         submitForm(ruleForm) {
          const that = this;
          this.$refs[ruleForm].validate((valid) => {
            if (valid) {
             lookOption(this.ruleForm.username,this.ruleForm.password,this.ruleForm.codeNumber).then(res=>{
               if(res.data.status === '200'){
                 // this.$router.push('/orderReceivable')
                 let orgUnitId = res.data.obj.orgUnitId;
                 selectCom(orgUnitId).then(res=>{
                   if(res.data.status === '200') {
                     this.$router.push('/orderReceivable')
                   }
                 })
              }else{
                this.getCaptchaCode();
                that.ruleForm.codeNumber = '';
                 this.$message.error({message:res.data.msg,center: true});
              }
             });
            }else{
              return false;
            }
          })
        },

      }
    }
</script>
<style scoped>
  .loginContainer{
    position: relative;
    width: 100%;
    height: 100%;
    background: #324157;
  }
  .loginForm{
    position: absolute;
    top:50%;
    left:50%;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    padding:40px 40px 0 40px;
    width: 300px;
    /*height:160px;*/
    border-radius: 5px;
    background: #fff;
  }
  .loginTitle{
    position: absolute;
    top:50%;
    left:50%;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    margin-top: -210px;
    font-size: 30px;
    font-weight: 600;
    color: #fff;
  }
  .login-btn button{
    width: 100%;
  }

  /*验证图片*/
  .captcha-wrap{
    display: flex;
    align-items: center;
    height: 30px;
    width:100%;
  }
  .captcha-wrap .el-input{
    flex: 1;
  }
  .captcha-img{
    margin-left: 10px;
    height: 100%;
    width: 100px;
  }
  .captcha{
    width: 100%;
    height: 100%;
  }

</style>
