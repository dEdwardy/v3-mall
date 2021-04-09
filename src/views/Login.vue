<template>
  <div class="login">
    <van-form
      class="login-wrapper"
      @submit="onSubmit"
    >
      <div class="login-top">
        <van-field
          v-model="phone"
          name="phone"
          label="电话"
        />
        <van-field
          v-model="code"
          name="code"
          :maxlength="6"
          center
          clearable
          label="短信验证码"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              :disabled="countDownLoading"
              @click="getCode"
            >
              <!-- 此处后端api限流  -->
              <span v-if="!countDownLoading">发送验证码</span>
              <span v-else>
                <span class="block">{{ leftTime }}</span>
                <span style="margin:0 2px;font-size:14px">s后重新发送</span>
              </span>
            </van-button>
          </template>
        </van-field>
      </div>
      <div class="login-bottom">
        <van-button
          :disabled="!phone || !code "
          round
          block
          type="success"
          native-type="submit"
        >
          <span>登录</span>
          <span style="margin:0 4px">/</span>
          <span>注册</span>
        </van-button>
      </div>
    </van-form>
  </div>
  <van-overlay :show="loading">
    <van-loading
      style="position:absolute;top:50%;;left:50%;transform:translate(-50%)"
      vertical
    ></van-loading>
  </van-overlay>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCountDownTime } from '../hooks/useCountDownTime'
export default {
  setup () {
    
    const phone = ref('')
    const code = ref('')
    const loading = ref(false)
    const router = useRouter()
    const onSubmit = values => {
      console.log(values)
      loading.value = true;
      setTimeout(() => {
        loading.value = false
        router.push({ name: 'home' })
      }, 2000)
    }
    const { startCount,leftTime,countDownLoading} = useCountDownTime(10)
    const getCode = () => {
      startCount()
    }
    return {
      phone,
      code,
      onSubmit,
      getCode,
      loading,
      leftTime,
      countDownLoading

    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  background-image: url('../assets/lead-bg.png');
  background-size: 100%;
  background-repeat: no-repeat;
  ::v-deep(.van-cell) {
    padding: 12px 16px;
    // background-color:rgba(0,0,0,.3);
    background: none;
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 16px;
      bottom: 0;
      left: 16px;
      border-bottom: 1px solid rgba(0,0,0,.3);
      transform: scaleY(0.5);
    }
    &:last-child::after {
      display: block !important;
    }
    // background-color: rgba(#13c2c2,0.2);
  }
  ::v-deep(.van-field__label) {
    // color: #13c2c2;
    color: #000;
  }
  ::v-deep(.van-button) {
    background-color: #13c2c2;
    border-color: #13c2c2;
  }
  .login-top {
    animation: show 1400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    padding: 0 16px;
    position: fixed;
    top: 200px;
    left: 0;
    right: 0;
  }
  .login-bottom {
    padding: 0 16px;
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
  }
}
@keyframes show {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}
</style>