<template>
  <div class="lead">
    <div class="top">
      <div class="logo"></div>
      <div class="title">
        Roome
      </div>
      <div class="desc">
        在旅行中找到最好的优惠酒店
      </div>
    </div>
    <div class="bottom">
      <van-button round block style="background:#13c2c2;color:#fff">开始</van-button>
      <p class="info">已有帐号了？<span>登录</span></p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.lead {
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/lead-bg.png');
  background-size: 100%;
  background-repeat: no-repeat;
  .top {
    position: absolute;
    top:100px;
    left:50%;
    transform:translateX(-50%);
    width:240px;
    .logo {
      margin:0 auto;
      width:109px;
      height:97px;
      background-image: url('../assets/logo.png');
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .title{
      color:#404040;
      text-align: center;
      font-size: 36px;
      height: 50px;
      line-height: 50px;
      font-weight: bold;
    }
    .desc{
      color:#404040;
      text-align: center;
      line-height: 20px;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .bottom{
    position: absolute;
    bottom:0;
    left:0;
    right:0;
    padding:0 16px;
    .info{
      color:#aaa;
      margin:16px 0;
      text-align: center;
      font-size: 14px;
      span{
        color:#13c2c2;
      }
    }
  }
}
</style>