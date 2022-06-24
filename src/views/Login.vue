<template>
  <div id="login">
    <div class="background"></div>
    <div class="loginCard">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="登录" name="login">
          <el-form class="loginForm">
            <el-form-item label="账号">
              <el-input v-model="loginInfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="loginInfo.password" show-password></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="login">登录</el-button>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form :model="registerInfo" ref="refForm" :rules="rules" class="registerForm">
            <el-form-item label="昵称" prop="name">
              <el-input v-model="registerInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="registerInfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="registerInfo.password" show-password></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="register">注册</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      activeName: 'login',
      loginInfo:{
        phone:"",
        password:"",
      },
      registerInfo:{
        name:"",
        phone:"",
        password:"",
      },
      rules: {
        name:[
          {required: true, message: '请输入昵称', trigger: 'blur'},
        ],
        phone: [
          {required: true, message: '请输入电话', trigger: 'blur'},
        ],
        password:[
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
      }
    }
  },
  methods:{
    login(){
      let data = JSON.stringify({
        "phone": this.loginInfo.phone,
        "password": this.loginInfo.password,
      })
      this.$axios({
        method:"post",
        url:"/user/login",
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data:data,
      }).then(res=>{
        console.log(res.data)
        if(res.data.id === 0){
          this.$message.error("账号或密码错误，请重试")
          return
        }
        this.$message.success("登录成功")
        window.sessionStorage.setItem("userId",res.data.id)
        window.sessionStorage.setItem("userName",res.data.name)
        this.$router.push({name:"homepage"})
      })
    },

    register(){
      this.$refs.refForm.validate((valid)=>{
        if(!valid){
          return
        }
        let data = JSON.stringify({
          "id": 0,
          "name": this.registerInfo.name,
          "phone": this.registerInfo.phone,
          "password": this.registerInfo.password,
          "birthday": "",
          "job": "",
          "hobby": "",
          "introduce": "",
        })
        this.$axios({
          url:"/user/register",
          method:"post",
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          data:data,
        }).then(res=>{
          if(res.data.message === "注册成功"){
            this.$alert('您已注册成功', '提示', {
              confirmButtonText: '确定',
            })
                .then(() => {
                  location.reload()
                  this.$router.go(0)
                })
                .catch(() => {
                  location.reload()
                  this.$router.go(0)
                });
          }
        })
      })
    }
  }
}
</script>

<style scoped>
#login{
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.loginForm{
  padding: 20px;
}

.registerForm{
  padding: 20px;
}

.loginCard{
  margin-left: 550px;
  margin-top: 150px;
  width: 400px;
  /*height: 600px;*/
}

.background{
  position:absolute;
  width:100%;
  height:100%;
  background-image:url(https://img2.baidu.com/it/u=1778825085,1253560068&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=834);
  background-repeat:no-repeat;
  background-size:100% 100%;
  z-index: -1;
}

</style>