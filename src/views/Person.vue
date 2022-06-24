<template>
  <div>
    <Header select="person"></Header>
    <div class="content">
      <div class="choiceCard">
        <div id="left_person" class="personC" @click="select='person'">个人信息</div>
        <hr class="line">
        <div id="left_follow" class="followC" @click="select='follow'">我的收藏</div>
        <hr class="line">
        <div id="left_myBlog" class="myBlogC" @click="select='myBlog'">我的博客</div>
      </div>
      <div v-if="select==='person'" class="person">
        <div>
          <img class="img" src="../assets/user.png" alt="">
        </div>
        <div>
          <el-form class="info" label-width="60px">
            <el-form-item label="昵称：">{{oldInfo.name}}</el-form-item>
            <el-form-item label="电话：">{{oldInfo.phone}}</el-form-item>
            <el-form-item label="生日：">{{oldInfo.birthday}}</el-form-item>
            <el-form-item label="工作：">{{oldInfo.job}}</el-form-item>
            <el-form-item label="爱好：">{{oldInfo.hobby}}</el-form-item>
            <el-form-item label="简介：">
              <div style="height: 80px">{{oldInfo.introduce}}</div>
            </el-form-item>
          </el-form>
          <el-button @click="dialogVisible=true">修改资料</el-button>
        </div>
      </div>
      <div v-if="select==='follow'" class="follow">
        <div v-for="item in followBlogList">
          <Blog :blog="item"></Blog>
          <hr class="line">
        </div>
      </div>
      <div v-if="select==='myBlog'" class="myBlog">
        <div v-for="item in myBlogList">
          <Blog :blog="item"></Blog>
          <hr class="line">
        </div>
      </div>
    </div>
    <el-dialog title="修改个人资料" :visible.sync="dialogVisible" width="35%">
      <el-form class="form" :rules="rules" ref="ruleForm" label-width="80px" :model="newInfo">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="newInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="newInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker style="width: 100%" v-model="newInfo.birthday"></el-date-picker>
        </el-form-item>
        <el-form-item label="工作" prop="job">
          <el-input v-model="newInfo.job"></el-input>
        </el-form-item>
        <el-form-item label="爱好" prop="hobby">
          <el-input v-model="newInfo.hobby"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="introduce">
          <el-input type="textarea" :rows="3" v-model="newInfo.introduce"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" plain @click="change">确定</el-button>
      <el-button @click="reset">重置</el-button>
    </el-dialog>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Blog from "@/components/Blog";
export default {
  name: "Person",
  components: {Blog, Header},
  data(){
    return{
      select:"person",
      oldInfo:{
        name:window.sessionStorage.getItem("name"),
        phone:window.sessionStorage.getItem("phone"),
        birthday:window.sessionStorage.getItem("birthday"),
        job:window.sessionStorage.getItem("job"),
        introduce:window.sessionStorage.getItem("introduce"),
        hobby:window.sessionStorage.getItem("hobby"),
      },
      newInfo:{
        name:"",
        phone:"",
        birthday:"",
        job:"",
        introduce:"",
        hobby:"",
      },
      followBlogList:[],
      myBlogList:[],
      dialogVisible:false,
      rules:{
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
        ],
        job: [
          { required: true, message: '请输入工作', trigger: 'blur' },
        ],
        birthday: [
          { required: true, message: '请输入生日', trigger: 'blur' },
        ],
        hobby: [
          { required: true, message: '请输入爱好', trigger: 'blur' },
        ],
        introduce: [
          { required: true, message: '请输入简介', trigger: 'blur' },
        ],
      }
    }
  },
  methods:{
    loadView(){
      let p = document.getElementById("left_person")
      p.className = "personC"
      let f = document.getElementById("left_follow")
      f.className = "followC"
      let m = document.getElementById("left_myBlog")
      m.className = "myBlogC"
      let i = document.getElementById("left_"+this.select)
      i.className = i.className + " selected"
    },

    change(){
      let data = JSON.stringify({
        "id":Number(window.sessionStorage.getItem("userId")),
        "name": "",
        "phone": "",
        "birthday": "",
        "job": "",
        "hobby": "",
        "introduce": "",
      })
      this.$axios({
        url:"/user/updateinfo",
        method:"post",
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data:data,
      }).then(res=>{
        console.log(res)
        if(res.data.message === "更改成功"){
          this.$message.success("修改成功")
          location.reload()
          this.$router.go(0)
        }
      }).catch(err=>{
        console.log(err)
      })
    },

    reset(){
      this.newInfo.name = this.oldInfo.name
      this.newInfo.job = this.oldInfo.job
      this.newInfo.phone = this.oldInfo.phone
      this.newInfo.birthday = this.oldInfo.birthday
      this.newInfo.hobby = this.oldInfo.hobby
      this.newInfo.introduce = this.oldInfo.introduce
    }
  },
  mounted() {
    let i = document.getElementById("left_"+this.select)
    i.className = i.className + " selected"

    this.newInfo.name = this.oldInfo.name
    this.newInfo.job = this.oldInfo.job
    this.newInfo.phone = this.oldInfo.phone
    this.newInfo.birthday = this.oldInfo.birthday
    this.newInfo.hobby = this.oldInfo.hobby
    this.newInfo.introduce = this.oldInfo.introduce

    this.$axios({
      url:"/user/info",
      method:"get",
      params:{
        id:window.sessionStorage.getItem("userId")
      }
    }).then(res=>{
      console.log(res.data)
      this.oldInfo.name = res.data.name
      this.oldInfo.phone = res.data.phone
      this.oldInfo.birthday = res.data.birthday
      this.oldInfo.job = res.data.job
      this.oldInfo.introduce = res.data.introduce
      this.oldInfo.hobby = res.data.hobby
    }).catch(err=>{
      console.log(err)
    })

    this.$axios({
      url:"/blog/get/follow",
      method:"get",
      params:{
        userId:window.sessionStorage.getItem("userId")
      }
    }).then(res=>{
      console.log(res.data)
      for (let item of res.data) {
        this.followBlogList.push(item)
      }
    }).catch(err=>{
      console.log(err)
    })

    this.$axios({
      url:"/blog/get/userid",
      method:"get",
      params:{
        userId:window.sessionStorage.getItem("userId")
      }
    }).then(res=>{
      console.log(res.data)
      for (let item of res.data) {
        this.myBlogList.push(item)
      }
    }).catch(err=>{
      console.log(err)
    })
  },
  watch:{
    'select':function(){
      this.loadView()
    }
  }
}
</script>

<style scoped>
.content{
  display: flex;
}

.img{
  width: 200px;
  height: 200px;
  margin-top: 130px;
  margin-left: 130px;
}

.info{
  text-align: left;
  width: 300px;
  margin-top: 70px;
  margin-left: 120px;
}

.choiceCard{
  width: 200px;
  height: 240px;
  margin-top: 100px;
  margin-left: 150px;
  border-radius: 20px;
  box-shadow: 0 0 20px #dadada;
}

.personC,.followC,.myBlogC{
  height: 80px;
  line-height: 80px;
  font-size: 20px;
  cursor: pointer;
}

.personC{
  border-radius: 20px 20px 0 0;
}

.myBlogC{
  border-radius:0 0 20px 20px;
}

.personC:hover,
.followC:hover,
.myBlogC:hover{
  background: #ebebeb;
}

.selected{
  background: #ebebeb;
}

.line{
  margin: 0;
  border-top: 0;
  border-bottom: 1px solid lightgray;
}

.person{
  margin-top: 50px;
  margin-left: 50px;
  width: 800px;
  height: 560px;
  box-shadow: 0 0 20px #dadada;
  border-radius: 20px;
  display: flex;
}

.follow,.myBlog{
  width: 900px;
  box-shadow: 0 0 20px #dadada;
  margin-top: 50px;
  margin-left: 50px;
  padding-top: 20px;
  border-radius: 20px 20px 0 0;
  min-height: 590px;
}

.form{
  text-align: left;
  padding-left: 30px;
  padding-right: 70px;
  padding-bottom: 20px;
}
</style>