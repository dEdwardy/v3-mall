<template>
  <div class="mine">
    <div class="uinfo">
      <div>
        <div class="username">
          Daniel Hua
        </div>
        <div class="edit">查看编辑</div>
      </div>
      <img width="70" height="70" src="../assets/avatar.png" alt="avatar" />
    </div>
    <div class="actions">
      <div class="action">
        <div>修改密码</div>
        <div><van-icon size="20px" name="lock" /></div>
      </div>
      <div class="action">
        <div>邀请朋友</div>
        <div>
          <van-icon size="20px" name="invition" />
        </div>
      </div>
      <div class="action">
        <div>积分优惠券</div>
        <div><van-icon size="20px" name="coupon" /></div>
      </div>
      <div class="action">
        <div>帮助中心</div>
        <div><van-icon size="20px" name="question" /></div>
      </div>
      <div class="action">
        <div>支付</div>
        <div><van-icon size="20px" name="alipay" /></div>
      </div>
      <div class="action">
        <div>设置</div>
        <div><van-icon size="20px" name="setting" /></div>
      </div>
    </div>
    <!-- tabbar -->
    <van-tabbar v-model="active">
      <van-tabbar-item
        fixed
        to="/"
        icon="search"
      >
        发现
      </van-tabbar-item>
      <van-tabbar-item
        to="/travel"
        icon="like-o"
      >
        旅行
      </van-tabbar-item>
      <van-tabbar-item
        to="/mine"
        icon="friends-o"
      >
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>  
</template>

<script>
import { ref } from 'vue';
export default {
  setup(){
    const active = ref(2)
    return {
      active
    }
  }
}
</script>

<style lang="scss" scoped>
.mine{
  .uinfo{
    margin:24px 0;
    display: flex;
    padding:0 16px;
    justify-content: space-between;
    align-items: center;
    .username{
      margin-top:16px;
      font-size: 22px;
      height: 20px;
      line-height: 20px;
    }
    .edit{
      margin-top:10px;
      font-size: 14px;
      color:#aaa;
    }
  }
  .actions{
    .action{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin:0 16px;
      padding:16px 0;
      border-bottom:1px solid #eee;
      font-size: 14px;
    }
  }
}
</style>