<template>
  <div>
    <Header select="homepage"></Header>
    <div class="blogArea">
      <div class="write">
        <el-button @click="dialogVisible=true">
          <b>
          <i style="font-size: 17px" class="el-icon-circle-plus-outline"></i>
          &nbsp;&nbsp;发布博客
          </b>
        </el-button>
      </div>
      <div v-for="item in blogList">
        <Blog :blog="item"></Blog>
        <hr>
      </div>
    </div>
    <el-dialog title="发布博客" :visible.sync="dialogVisible" width="50%">
      <el-form class="form" :rules="rules" ref="ruleForm" label-width="80px" :model="blog">
        <el-form-item label="标题" prop="title">
          <el-input v-model="blog.title"></el-input>
        </el-form-item>
        <el-form-item label="天气" prop="weather">
          <el-input v-model="blog.weather"></el-input>
        </el-form-item>
        <el-form-item label="心情" prop="mood">
          <el-input v-model="blog.mood"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="blog.content" :rows="10"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" plain @click="addBlog">确定</el-button>
      <el-button @click="resetBlog">重置</el-button>
    </el-dialog>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Blog from "@/components/Blog";
export default {
  name: "Homepage",
  components: {Blog, Header},
  data(){
    return{
      blogList:[],
      dialogVisible :false,
      blog:{
        title:"",
        content:"",
        weather:"",
        mood:"",
      },
      rules:{
        title: [
          { required: true, message: '请输入博客标题', trigger: 'blur' },
        ],
        weather: [
          { required: true, message: '请输入天气', trigger: 'blur' },
        ],
        mood: [
          { required: true, message: '请输入心情', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入博客内容', trigger: 'blur' },
        ],
      }
    }
  },
  methods:{
    addBlog(){
      this.$refs.ruleForm.validate((valid)=>{
        if(!valid){
          return
        }
        let data = JSON.stringify({
          "id":0,
          "userid":Number(window.sessionStorage.getItem("userId")),
          "title":this.blog.title,
          "content":this.blog.content,
          "introduce":"无",
          "weather":this.blog.weather,
          "mood":this.blog.mood,
          "time":"无",
        })
        this.$axios({
          url:"/blog/add",
          method:"post",
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          data:data
        }).then(res=>{
          console.log(res)
          if(res.data.message === "博客新建成功"){
            this.$message.success("博客发布成功")
            location.reload()
            this.$router.go(0)
          }
        }).catch(err=>{
          console.log(err)
        })
      })
    },

    resetBlog(){
      this.$refs.ruleForm.resetFields()
    }
  },
  mounted() {
    this.$axios({
      url:"/blog/get/all",
      method:"get",
      params:{
        userId:window.sessionStorage.getItem("userId")
      }
    }).then(res=>{
      console.log(res.data)
      for (let item of res.data) {
        this.blogList.push(item)
      }
    }).catch(err=>{
      console.log(err)
    })

    // for (let i = 0; i < 10; i++) {
    //   this.blogList.push({
    //     id:"11",
    //     userName:"用户昵称",
    //     userId:"123",
    //     title:"博客标题（网络日志）",
    //     content:"博客，仅音译，英文名为Blogger，为Web Log的混成词。它的正式名称为网络日记；又音译为部落格或部落阁等，是使用特定的软件，在网络上出版、发表和张贴个人文章的人，或者是一种通常由个人管理、不定期张贴新的文章的网站。博客上的文章通常以网页形式出现，并根据张贴时间，以倒序排列。通常具备RSS订阅功能。博客是继MSN、BBS、ICQ之后出现的第4种网络交流方式，现已受到大家的欢迎，是网络时代的个人“读者文摘”，是以超级链接为入口的网络日记，它代表着新的生活、工作和学习方式。许多博客专注在特定的课题上提供评论或新闻，其他则被作为个人性的日记。一个典型的博客结合了文字、图像、其他博客或网站的链接及其它与主题相关的媒体，能够让读者以互动的方式留下意见，是许多博客的重要要素。大部分的博客内容以文字为主，但仍有一些博客专注在艺术、摄影、视频、音乐、播客等各种主题。博客是社会媒体网络的一部分。比较著名的有新浪等博客。",
    //     introduce:"百度百科——博客的介绍",
    //     weather:"晴",
    //     mood:"高兴",
    //     time:"2022-6-20 00:00:00",
    //     commentList:[
    //       {
    //         userName:"隔壁老王",
    //         comment:"隔壁老王都馋哭了，真好看！",
    //       },
    //       {
    //         userName:"无名的粑粑",
    //         comment:"呜呜呜呜呜好喜欢！",
    //       },
    //       {
    //         userName:"哈哈哈哈哈哈嗝",
    //         comment:"哈哈哈哈哈哈哈哈哈哈哈哈嗝",
    //       }
    //     ]
    //   })
    // }
  }
}
</script>

<style scoped>
.blogArea{
  margin-top: 50px;
  margin-left: 200px;
  width: 1100px;
  height: 100%;
  min-height: 610px;
  border-radius: 40px 40px 0 0;
  box-shadow: 0 0 20px darkred;
}

.write{
  height: 70px;
  line-height: 70px;
  font-weight: bold;
  background: darkred;
  color: white;
  margin-bottom: 20px;
  border-radius: 40px 40px 0 0;
}

.form{
  padding-left: 30px;
  padding-right: 100px;
}
</style>