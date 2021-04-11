<template>
  <div class="home">
    <div class="content">
      <!-- 想去哪里 搜索 -->
      <div class="where-to-go">
        <van-sticky>
          <van-nav-bar
            class="navbar"
            @click-left="onClickBack"
          >
            <template #left>
              <van-icon
                name="down"
                style="color:#13c2c2;transform:rotate(90deg)"
                size="18"
              />
            </template>
          </van-nav-bar>
        </van-sticky>
        <!-- <div class="uinfo">
        
      </div> -->
        <div class="search-form">
          <van-form @submit="onSubmit">
            <van-row>
              <van-col
                :span="24"
                @click.stop="toSearch"
              >
                <van-field
                  v-model="searchData.location"
                  readonly
                  left-icon="search"
                  class="searh-input "
                  name="location"
                >
                </van-field>
              </van-col>
              <van-col
                :span="14"
                style="margin-top:20px"
              >
                <div class="label">选择日期</div>
                <van-field
                  v-model="searchData.date"
                  readonly
                  name="calendar"
                  @click="showCalendar = true"
                />
                <van-calendar
                  v-model:show="showCalendar"
                  type="range"
                  @confirm="onConfirm"
                />
              </van-col>
              <van-col
                :span="10"
                style="margin-top:20px"
              >
                <div class="label">房间数</div>
                <van-field
                  label-align="center"
                  name="stepper"
                >
                  <template #input>
                    <van-stepper v-model="searchData.roomNum" />
                  </template>
                </van-field>
              </van-col>
              <van-col
                :span="24"
                style="margin-top:16px"
              >
                <van-button
                  round
                  block
                  type="success"
                  style="background-color:--theme-color"
                  native-type="submit"
                  @click="toSearch"
                >
                  搜索酒店
                </van-button>
              </van-col>
            </van-row>
          </van-form>
        </div>
      </div>
      <!-- 最近搜索 -->
      <div class="recently-search part">
        <div class="part-title">最近搜索</div>
      </div>
      <!-- 推荐 -->
      <div class="recommend part">
        <div class="part-title">最受欢迎的旅游圣地</div>
      </div>
      <!-- 最实惠的 -->
      <div class="most-affordable part">
        <div class="part-title">最实惠的价格</div>
      </div>
    </div>
    <!-- tabbar -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item
        to="/home"
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
import { useAxios } from '@vueuse/integrations'
import { ref, reactive, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { instance } from '../utils/service'
export default defineComponent({
  name: 'Home',
  setup () {
    const active = ref(0)
    const showCalendar = ref(false)
    const show = () => {
      console.log('click')
      showCalendar.value = true
    }
    const router = useRouter()
    const toSearch = () => {
      router.push({
        path: '/search'
      })
    }
    const onClickBack = () => router.back()
    const onConfirm = (dates) => {
      console.log(dates)
      searchData.date = dates.map(date => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`).join(' - ')
      showCalendar.value = false;
    }
    const searchData = reactive({
      location: '',
      date: '',
      roomNum: '',
      roomPrice: '',
      liveNum: ''
    })
    const onSubmit = values => {
      console.log(values)
    }
    useAxios('/users',instance)
    return {
      active,
      onSubmit,
      searchData,
      showCalendar,
      onConfirm,
      show,
      toSearch,
      onClickBack
    }
  }

})
</script>

<style lang="scss" scoped>
.home {
  .content {
    height: calc(100vh - 50px);
    overflow-y: scroll;
  }
  .part {
    padding: 16px;
  }
  .part-title {
    font-size: 14px;
    font-weight: bold;
  }
  .where-to-go {
    position: relative;
    height: 628px;
    background-image: url('../assets/bg.png');
    background-size: 100%;
    background-repeat: no-repeat;

    .search-form {
      position: relative;
      top: 356px;
      margin: 0 16px;
      padding: 16px;
      border-radius: 24px;
      background-color: #fff;
      box-shadow: 0px 2px 19px 0px rgba(0, 0, 0, 0.13);
      .label {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #aaa;
        font-weight: bold;
      }
      ::v-deep(.van-field__control) {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      ::v-deep(.van-field__body) {
        width: 100%;
      }
      ::v-deep(.van-cell__value.van-field__value) {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        height: 28px;
        line-height: 28px;
      }
    }
  }
  // ::v-deep(.van-field__error-message) {
  //   display: none;
  // }
  .searh-input {
    border-radius: 60px;
    background-color: rgba(255, 255, 255, 100);
    color: rgba(191, 191, 191, 100);
    font-size: 14px;
    text-align: left;
    box-shadow: 0px 2px 19px 0px rgba(0, 0, 0, 0.13);
    font-family: Arial;
    border: 1px solid rgba(255, 255, 255, 100);
  }
  ::v-deep(.van-nav-bar) {
    background: rgba(0,0,0,.13);
  }
  ::v-deep(.van-nav-bar)::after {
    transform: scale(0);
  }
  ::v-deep(.van-button){
    background-color: --theme-color !important;
  }
}
</style>