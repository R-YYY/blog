<template>
  <div id="login">
    <div class="background"></div>
    <div class="loginCard">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <el-form class="loginForm">
            <el-form-item label="账号">
              <el-input v-model="id"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="password"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary">登录</el-button>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form class="registerForm">
            <el-form-item label="昵称">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary">注册</el-button>
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
      id:"",
      password:"",
      registerInfo:{
        name:"",
        phone:"",

      },
    }
  }
}
</script>

<style scoped>
#login{
  width: 100%;
  height: 100%;
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

</style>