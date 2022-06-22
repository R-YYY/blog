<template>
  <div>
    <Header select=""></Header>
    <div style="display: flex">
      <div class="info">
        <el-form class="form" label-width="60px">
          <el-form-item label="昵称：">{{info.name}}</el-form-item>
          <el-form-item label="电话：">{{info.phone}}</el-form-item>
          <el-form-item label="生日：">{{info.birthday}}</el-form-item>
          <el-form-item label="工作：">{{info.job}}</el-form-item>
          <el-form-item label="爱好：">{{info.hobby}}</el-form-item>
          <el-form-item label="简介：">
            <div style="height: 110px">{{info.introduce}}</div>
          </el-form-item>
        </el-form>
        <el-button @click="dialogVisible=true"><i class="el-icon-plus"></i>&nbsp;&nbsp;关注</el-button>
      </div>
      <div class="blog">
        <div v-for="item in blogList">
          <Blog :blog="item"></Blog>
          <hr class="line">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Blog from "@/components/Blog";
export default {
  name: "OtherInfo",
  components: {Blog, Header},
  data(){
    return{
      blogList:[],
      info:{
        name:"他的名字",
        phone:"12345678910",
        birthday:"2022-6-22",
        job:"学生",
        introduce:"这是他的介绍，你能看到吗？这是他的介绍，你能看到吗",
        hobby:"没有",
      },
    }
  },
  mounted() {
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
  }
}
</script>

<style scoped>
.info{
  width: 300px;
  height: 550px;
  margin-top: 50px;
  margin-left: 70px;
  border-radius: 20px;
  box-shadow: 0 0 20px #dadada;
}

.form{
  text-align: left;
  padding-top: 30px;
  padding-left: 40px;
  padding-right: 40px;
}

.blog{
  width: 900px;
  box-shadow: 0 0 20px #dadada;
  margin-top: 50px;
  margin-left: 50px;
  padding-top: 20px;
  border-radius: 20px 20px 0 0;
}
</style>