<template>
  <div>
    <div id="header">
      <div id="left">
        <div id="homepage" class="choice" @click="goToHomepage()">首页</div>
        <div id="follow" class="choice" @click="goToFollow()">关注</div>
      </div>
      <div id="center">
        <slot></slot>
        <div class="searchBar" v-show="searchVisible">
          <input type="text"
                 placeholder="请输入你想搜索的内容..."
                 v-model="searchContent"
                 @keyup.enter="searchBlog">
          <i id="search" class="el-icon-search" @click="searchBlog"></i>
        </div>
      </div>
      <div id="right">
        <div id="person" class="person" @click="goToPerson">
          个人主页&nbsp;&nbsp;<i class="el-icon-user-solid"></i>
        </div>
      </div>
    </div>
    <div class="placeholder"></div>
    <el-dialog title="搜索结果"
               :visible.sync="dialogVisible"
               width="60%">
      <div v-if="blogList.length !== 0">
        <div v-for="item in blogList">
          <Blog :blog="item"></Blog>
          <hr class="line">
        </div>
      </div>
      <el-empty v-else description="没有搜索结果"></el-empty>
    </el-dialog>
  </div>
</template>

<script>
import Blog from "@/components/Blog";
export default {
  name: "Header",
  components: {Blog},
  props:["select"],
  data(){
    return{
      searchVisible:true,
      searchContent:"",
      blogList:[],
      dialogVisible:false,
    }
  },
  methods:{
    goToHomepage(){
      this.$router.push("/homepage")
    },

    goToPerson(){
      this.$router.push("/person")
    },

    goToFollow(){
      this.$router.push("/follow")
    },

    searchBlog(){
      this.blogList = []
      this.$axios({
        url:"/blog/get/search",
        method:"get",
        params:{
          searchString:this.searchContent
        }
      }).then(res=>{
        console.log(res.data)
        for (let item of res.data) {
          this.blogList.push(item)
        }
        this.dialogVisible = true
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  mounted() {
    let i = document.getElementById(this.select)
    i.className = i.className + " selected"
  }
}
</script>

<style scoped>
#header {
  position: fixed;
  z-index: 100;
  display: flex;
  top: 0;
  height: 50px;
  width: 100%;
  background-color: white;
  box-shadow: 0 0 40px #dadada;
}

/*由于header的定位是fixed，需要一个占位div*/
.placeholder {
  height: 50px;
}

#left {
  width: 120px;
  min-width: 200px;
  margin-left: 300px;
  display: flex;
  line-height: 50px;
}

#right {
  width: 120px;
  min-width: 160px;
  margin-right: 250px;
  line-height: 50px;
}

#center {
  line-height: 50px;
  position: relative;
  text-align: center;
  flex: 1;
  min-width: 320px;
}

.myavatar{
  cursor:pointer;
  float: right;
  margin-top:8px;
  margin-left: 20px;
  height: 35px;
  width: 35px;
  background-size: cover;
  border-radius: 50%;
}

.searchBar {
  margin-top: 7px;
  display: inline-block;
  line-height: 30px;
}

input {
  outline: none;
  padding-left: 13px;
  height: 30px;
  width: 450px;
  border-radius: 42px;
  border: 2px solid #E4E7ED;
  transition: .3s linear;
  float: right;
}

input:focus {
  /*width: 300px;*/
  border: 2px solid #74D8BE;
}

#search {
  cursor: pointer;
  position: absolute;
  color: #2c3e50;
  background: none;
  margin-right: 10px;
  left: 510px;
  line-height: 36px;
}

.choice{
  font-weight: bold;
  width: 80px;
  cursor: pointer;
}

.choice:hover,
.person:hover{
  background: lightgray;
}

.selected{
  line-height: 45px;
  border-top: 3px solid darkred;
}

.person{
  font-weight: bold;
  width: 120px;
  cursor: pointer;
}
</style>