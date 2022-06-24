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