<template>
  <div class="travel">
    <div class="content">
      <div class="title">
        我的旅行
      </div>
      <van-tabs
        v-model:active="travelActive"
        sticky
        animated
        swipeable
        color="#13C2C2"
      >
        <van-tab title="最近预定">
          <div class="list">
            <div
              v-for="(item,index) of list"
              :key="index"
              class="item"
              @click="toDetail"
            >
              <div class="like-icon">
                <van-icon
                  class=""
                  name="like-o"
                />
              </div>
              <div class="top txt-center">
                {{ item.date }} , {{ item.roomNum+' 间' }} - {{ item.personNum +' 人' }}
              </div>
              <div class="main">
                <div
                  class="middle"
                  :style="{background:`url(${bg})`}"
                ></div>
                <div class="info bottom">
                  <div class="flex">
                    <div class="name"> {{ item.name }}</div>
                    <div class="price"> {{ item.unit +' '+ item.price }}</div>
                  </div>
                  <div class="flex">
                    <div class="location">
                      <van-icon name="location-o" />{{ item.location }}
                    </div>
                    <div class="distance"> {{ item.distance }}</div>
                  </div>
                  <div
                    class="flex"
                    style="justify-content:flex-start"
                  >
                    <van-rate
                      v-model="item.rate"
                      :count="5"
                      readonly
                    />
                    <div style="margin-left:20px;color:#aaa;font-size:14px">{{ item.commentsNum }} 条评论</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="已完成">1</van-tab>
        <van-tab title="喜欢">
          <div class="list">
            222
          </div>
        </van-tab>
      </van-tabs>
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

<script lang="ts">
import bg from '../assets/list-bg.png'
import { mockInstance as instance } from '../utils/service'
import { useAxios } from '@vueuse/integrations'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
export interface IList {
  commentsNum?: Number
  date?: String
  distance?: String
  location?: String
  name: String
  personNum: Number
  price: [Number,String]
  rate: Number
  roomNum: Number
  unit: String
}
export default {
  setup() {
    const list = ref<Array<IList>>([])
    const active = ref(1)
    const travelActive = ref(0)
    const { data, finished } = useAxios('/list', { method: 'GET' }, instance)
    const router = useRouter()
    const toDetail = () => router.push({ name: 'hotel-detail', params: { id: 1 } })
    watch([finished, travelActive], () => {
      list.value = data.value
    })
    return {
      active,
      bg,
      travelActive,
      list,
      toDetail
    }
  }
}
</script>

<style lang="scss" scoped>
.travel {
  ::v-deep(.van-tab--active) {
    color: #13c2c2;
  }
  .txt-center {
    text-align: center;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    padding: 16px;
    height: 18px;
    line-height: 18px;
    font-size: 18px;
    font-weight: bold;
  }
  .list {
    // height:calc(100vh - 100px);
    overflow-y: scroll;
    padding: 0 16px;
    .item {
      position: relative;
      margin: 16px 0;
      .like-icon {
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        color: red;
        position: absolute;
        right: 18px;
        top: 54px;
      }
      .top {
        padding: 8px 12px;
        margin: 10px 0;
      }
      .main {
        border-radius: 12px;
        box-shadow: 0px 2px 19px 0px rgba(0, 0, 0, 0.13);
      }
      .middle {
        border-radius: 12px 12px 0 0 !important;
        height: 172px;
      }
      .bottom {
        // box-shadow: 0px 2px 19px 0px rgba(0, 0, 0, 0.13);
        & > div {
          padding: 6px 0;
        }
        & > div:last-child {
          padding: 12px 0;
        }
        .name {
          font-size: 18px;
        }
        .price {
          font-size: 16px;
        }
        .location,
        .distance {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 14px;
          color: #aaa;
        }
        padding: 16px 12px 16px 12px;
      }
    }
  }
}
</style>