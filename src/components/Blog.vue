<template>
  <div class="blogCard">
    <div class="user">
      <img class="img" @click="otherInfo" src="../assets/user.png" alt="">
      <div class="userName" @click="otherInfo">{{blog.userName}}</div>
    </div>
    <div class="title">{{blog.blog.title}}</div>
    <div class="intro">
      <div>时间：{{blog.blog.time}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <div>天气：{{blog.blog.weather}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <div>心情：{{blog.blog.mood}}</div>
    </div>
    <div class="content">{{blog.blog.content}}</div>
    <div class="oper">
      <el-input placeholder="文明发言，从你我做起 ~" style="width: 470px"></el-input>
      <el-button>发送评论</el-button>
      <el-button style="width: 100px" @click="follow">
        <i class="el-icon-plus"></i>&nbsp;&nbsp;关注
      </el-button>
      <el-button style="width: 100px" @click="favorite">
        <i class="el-icon-star-off"></i>&nbsp;&nbsp;收藏
      </el-button>
    </div>
    <div class="commentArea">
      <div v-for="item in blog.commentList" class="comment">
        <img class="commentImg" src="../assets/user2.png" alt="">
        <div style="white-space: nowrap;"><b>{{item.userName}}：</b></div>
        <div class="commentContent">{{item.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Blog",
  props:["blog"],
  methods:{
    otherInfo(){
      this.$router.push({
        name:'other',
        params:{
          id:this.blog.userId
        }
      })
    },

    follow(){

    }
  }
}
</script>

<style scoped>
.blogCard{
  text-align: left;
  padding: 10px 50px;
}

.user{
  display: flex;
  width: auto;
}

.img{
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.intro{
  display: flex;
  font-size: 13px;
  padding-bottom: 10px;
}

.userName{
  padding-left: 10px;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
}

.title{
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: bold;
  font-size: 17px;
  color: dimgray;
}

.content{
  line-height: 25px;
  color: black;
  font-size: 15px;
  padding-bottom: 15px;
  /*min-height: 200px;*/
}

.commentImg{
  width: 20px;
  height: 20px;
  padding-right: 5px;
}

.comment{
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
}

.commentContent{

}
</style>