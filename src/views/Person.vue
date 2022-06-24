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
        <div v-for="item in blogList">
          <Blog :blog="item"></Blog>
          <hr class="line">
        </div>
      </div>
      <div v-if="select==='myBlog'" class="myBlog">
        <div v-for="item in blogList">
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
      blogList:[],
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
        "name": this.newInfo.name,
        "phone": this.newInfo.phone,
        "birthday": this.newInfo.birthday,
        "job": this.newInfo.job,
        "hobby": this.newInfo.hobby,
        "introduce": this.newInfo.introduce
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

    //TODO 加载个人信息


    //TODO 加载博客列表
    for (let i = 0; i < 10; i++) {
      this.blogList.push({
        id:"11",
        userName:"用户昵称",
        userId:"123",
        title:"博客标题（网络日志）",
        content:"博客，仅音译，英文名为Blogger，为Web Log的混成词。它的正式名称为网络日记；又音译为部落格或部落阁等，是使用特定的软件，在网络上出版、发表和张贴个人文章的人，或者是一种通常由个人管理、不定期张贴新的文章的网站。博客上的文章通常以网页形式出现，并根据张贴时间，以倒序排列。通常具备RSS订阅功能。博客是继MSN、BBS、ICQ之后出现的第4种网络交流方式，现已受到大家的欢迎，是网络时代的个人“读者文摘”，是以超级链接为入口的网络日记，它代表着新的生活、工作和学习方式。许多博客专注在特定的课题上提供评论或新闻，其他则被作为个人性的日记。一个典型的博客结合了文字、图像、其他博客或网站的链接及其它与主题相关的媒体，能够让读者以互动的方式留下意见，是许多博客的重要要素。大部分的博客内容以文字为主，但仍有一些博客专注在艺术、摄影、视频、音乐、播客等各种主题。博客是社会媒体网络的一部分。比较著名的有新浪等博客。",
        introduce:"百度百科——博客的介绍",
        weather:"晴",
        mood:"高兴",
        time:"2022-6-20 00:00:00",
        commentList:[
          {
            userName:"隔壁老王",
            comment:"隔壁老王都馋哭了，真好看！",
          },
          {
            userName:"无名的粑粑",
            comment:"呜呜呜呜呜好喜欢！",
          },
          {
            userName:"哈哈哈哈哈哈嗝",
            comment:"哈哈哈哈哈哈哈哈哈哈哈哈嗝",
          }
        ]
      })
    }
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
}

.form{
  text-align: left;
  padding-left: 30px;
  padding-right: 70px;
  padding-bottom: 20px;
}
</style>