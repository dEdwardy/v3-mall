<template>
  <div
    ref="login"
    class="login"
  >
    <van-notice-bar
      mode="closeable"
      text="暂时只支持邮箱登录，后续开放电话号码登录"
    />
    <van-form
      ref="form"
      :show-error-message="false"
      class="login-wrapper"
      @submit="onSubmit"
    >
      <div class="login-top">
        <van-field
          v-model="phone"
          name="phone"
          :rules="[{ validator }]"
          label="电话/邮箱"
        >
          <template #label>
            电话
            /
            邮箱
          </template>
        </van-field>
        <van-field
          v-model="code"
          name="code"
          :maxlength="6"
          center
          clearable
          label="验证码"
        >
          <template #button>
            <van-button
              class="code-btn"
              size="small"
              type="primary"
              :disabled="countDownLoading || !phone"
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
      <div
        ref="bottom"
        class="login-bottom"
      >
        <van-button
          ref="btn"
          :disabled="!phone || !code"
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
import { ref, watch, onMounted } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useCountDownTime } from '../hooks/useCountDownTime'
import { Notify } from 'vant';
import { Toast } from 'vant';
import { instance } from '../utils/service';
import { useAxios } from '@vueuse/integrations'
export default {
  setup () {
    //表单验证状态 默认false
    const valid = ref(false)
    const showPopover = ref(false);
    const cur = ref('电话')
    // eslint-disable-next-line no-useless-escape
    const emailReg = new RegExp(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/);

    const validator = value => {
      if (emailReg.test(value)) {
        valid.value = true
        return true;
      } else {
        valid.value = false
        Notify({ type: 'danger', message: '邮箱格式有误' });
        return false;
      }
    }
    // 通过 actions 属性来定义菜单选项
    const actions = [
      { text: '电话' },
      { text: '邮箱' }
    ];
    const onSelect = (action) => cur.value = action.text

    const phone = ref('')
    const code = ref('')
    const loading = ref(false)
    const router = useRouter()
    const form = ref(null)
    const onSubmit = () => {
      form.value.validate('phone').then(() => {
        loading.value = true
        // console.log(values)
        let { finished, data, error } = useAxios('/auth/app-login', {
          method: 'POST',
          data: {
            email: phone.value,
            code: code.value
          }
        }, instance)
        watch(finished, () => {
          if (!error.value && finished.value) {
            Toast.success('登陆成功')
            const { token, ...uinfo } = data.value
            localStorage.setItem('token', `Bearer ${token}`)
            localStorage.setItem('uinfo', JSON.stringify(uinfo))
            loading.value = false
            router.push({ name: 'home' })
          } else {
            if (error.value) {
              loading.value = false
            } else {
              Toast.fail('验证码错误')
              loading.value = false
            }

          }
        })
      })
    }
    const { startCount, leftTime, countDownLoading } = useCountDownTime(60)
    const getCode = () => {
      form.value.validate().then(() => {
        let { finished, error } = useAxios('/email/send-code', {
          method: 'POST',
          data: {
            email: phone.value
          }
        }, instance)
        watch(finished, () => {
          if (!error.value && finished.value) {
            countDownLoading.value = true
            startCount()
          }
        })
      }).catch(() => {
        validator(phone.value)
      })

    }
    onMounted(() => {
      const token = localStorage.getItem('token')
      if (token) {
        router.push({ name: 'home' })
      }
    })
    /**
     * fix 移动端输入框 唤起键盘顶起底部 登录按钮
     */
    const { height } = useWindowSize()
    const login = ref(null)
    const bottom = ref(null)
    const showBtn = ref(true)
    const maxHeight = ref(0)

    // 底部button 动态 top值
    watch(showBtn, (v) => bottom.value.style.top = v ? 'auto' : (maxHeight.value - 44 - 20) + 'px')
    //通过 windowResize 监听高度 判断并处理 打开关闭 弹起的键盘 
    watch(height, (v, ov) => {
      if (ov > v) {
        // 底部键盘打开
        showBtn.value = false
        if (!login.value.style.height) login.value.style.height = ov + 'px'
        if (!maxHeight.value) maxHeight.value = ov
      } else {
        // 底部键盘关闭
        showBtn.value = true
      }
    })
    return {
      phone,
      code,
      onSubmit,
      getCode,
      loading,
      leftTime,
      countDownLoading,
      showBtn,
      maxHeight,
      login,
      bottom,
      actions,
      onSelect,
      showPopover,
      cur,
      validator,
      form,
      valid
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  overflow: auto;
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
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
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
  ::v-deep(.van-button.code-btn) {
    font-size: 12px;
    max-width: 120px;
  }
  .login-top {
    animation: show 1400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    padding: 0 16px;
    position: absolute;
    top: 200px;
    left: 0;
    right: 0;
  }
  .login-bottom {
    padding: 0 16px;
    position: absolute;
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