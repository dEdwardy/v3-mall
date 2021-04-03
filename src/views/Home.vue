<template>
  <div class="home">
    <!-- 想去哪里 搜索 -->
    <div class="where-to-go">
      <!-- <div class="uinfo">
        
      </div> -->
      <div class="search-form">
        <van-form @submit="onSubmit">
          <van-row>
            <van-col :span="24">
              <van-field
                v-model="searchData.location"
                name="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
              />
            </van-col>
            <van-col :span="12">
              <van-field
                v-model="searchData.date"
                readonly
                name="calendar"
                placeholder="点击选择日期"
                @click="showCalendar = true"
              />
              <van-calendar
                v-model:show="showCalendar"
                @confirm="onConfirm"
              />

            </van-col>
            <van-col :span="12">
              <van-field
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
                type="info"
                native-type="submit"
              >提交</van-button>
            </van-col>
          </van-row>
        </van-form>
      </div>
    </div>
    <!-- 最近搜索 -->
    <div class="recently-search">

    </div>
    <!-- 推荐 -->
    <div class="recommend">

    </div>
    <!-- 最实惠的 -->
    <div class="most-affordable">

    </div>
    <!-- tabbar -->
    <van-tabbar
      v-model="active"
      fixed
    >
      <van-tabbar-item
        to="/"
        icon="search"
      >发现</van-tabbar-item>
      <van-tabbar-item
        to="/travel"
        icon="like-o"
      >旅行</van-tabbar-item>
      <van-tabbar-item
        to="/mine"
        icon="friends-o"
      >我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
import { ref, reactive, toRefs, defineComponent } from 'vue'
export default defineComponent({
  name: 'home',
  setup () {
    const active = ref(0)
    const showCalendar = ref(false)
    const show = () => {
      console.log('click')
      showCalendar.value = true
    }
    const onConfirm = (date) => {
      searchData.date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
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
    return {
      active,
      onSubmit,
      searchData,
      showCalendar,
      onConfirm,
      show
    }
  }

})
</script>

<style lang="scss" scoped>
.home {
  .where-to-go {
    position: relative;
    .search-form {
      margin: 20px 40px;
      padding: 10px;
      border-radius: 12px;
      // background-color: rgba(0, 0, 0, 0.2);
    }
  }
  ::v-deep(.van-field__error-message) {
    display: none;
  }
}
</style>