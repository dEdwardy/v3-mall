<template>
  <div class="hotel-detail">
    <van-nav-bar
      left-arrow
      @click-left="handleClickBack"
      @click-right="handleClickLike"
    >
      <template #right>
        <van-icon
          v-show="!like"
          class="like-icon"
          name="like-o"
        />
        <van-icon
          v-show="like"
          class="like-icon"
          name="like"
        />
      </template>
    </van-nav-bar>
    <div class="details">
      <div class="base-info flex justify-between align-end">
        <div class="name">
          {{ item.name }}
        </div>
        <div class="price">
          {{ item.price }}
        </div>
      </div>
      <div class="other flex">
        <div>
          {{ item.location }}
        </div>
        <div class="distance flex align-center">
          <van-icon name="location-o" />{{ item.distance }}
        </div>
      </div>
      <van-divider />
      <!-- 介绍 -->
      <div class="intro">
        <p class="title">介绍</p>
        <p :class="more ? 'txt ' :'txt ellipsis'"> {{ item.desc }}</p>
        <div class="flex align-center justify-end">
          <span
            v-show="!more"
            class="more"
            @click="handleClickMore"
          >查看更多</span>
        </div>
      </div>
      <!-- 评分 -->
      <div class="rates">
        <div class="flex align-center">
          <div class="total-rate">
            {{ item.rate.total }}
          </div>
          <div>
            <div>
              综合评价
            </div>
            <div style="margin-top:4px">
              <van-rate
                v-model="item.rate.total"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                :count="5"
                allow-half
                readonly
              />
            </div>
          </div>
        </div>
        <div class="rate-item">
          <div>
            房间
          </div>
          <div>
            <van-rate
              v-model="item.rate.room"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
              :count="5"
              allow-half
              readonly
            />
          </div>
        </div>
        <div class="rate-item">
          <div>
            服务
          </div>
          <div>
            <van-rate
              v-model="item.rate.service"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
              :count="5"
              allow-half
              readonly
            />
          </div>
        </div>
        <div class="rate-item">
          <div>
            位置
          </div>
          <div>
            <van-rate
              v-model="item.rate.location"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
              :count="5"
              allow-half
              readonly
            />
          </div>
        </div>
        <div class="rate-item">
          <div>
            价格
          </div>
          <div>
            <van-rate
              v-model="item.rate.price"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
              :count="5"
              allow-half
              readonly
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch } from 'vue'
import instance from '../utils/service'
import { useAxios } from '@vueuse/integrations'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const more = ref(false)
    const handleClickMore = () => more.value = true;
    const state = reactive({
      item: {
        poster: '',
        name: '',
        location: '',
        distance: '',
        price: '',
        desc: '',
        rate: {
          total: '',
          room: '',
          service: '',
          location: '',
          price: ''
        },
        pics: [],
        comments: []
      }
    })
    const router = useRouter()
    const like = ref(false)
    const handleClickBack = () => router.back();
    const handleClickLike = () => like.value = !like.value;
    const { data, finished } = useAxios('/detail', { method: 'GET' }, instance)
    watch(finished, () => {
      state.item = data.value
    })
    return {
      like,
      more,
      handleClickMore,
      handleClickBack,
      handleClickLike,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.hotel-detail {
  ::v-deep(.van-icon-arrow-left) {
    // color:#fff;
  }
  ::v-deep(.van-nav-bar__content) {
    // background: red;
  }
  .like-icon {
    color: red;
  }
  .details {
    padding: 0 16px;
    .base-info {
      padding: 12px 0;
      .name {
        font-size: 18px;
        font-weight: bold;
      }
    }
    .other {
      color: #aaa;
      font-size: 14px;
      .distance {
        margin: 0 12px;
      }
    }
    .intro {
      .title {
        color: #aaa;
        font-size: 14px;
      }
      .txt {
        line-height: 24px;
        margin-top: 12px;
        transition: all 0.3 linear;
        &.ellipsis {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .more {
        color: #13c2c2;
        padding: 4px 12px;
      }
    }
    .rates {
      padding: 0 16px;
      .total-rate {
        font-size: 28px;
        line-height: 34px;
        height: 34px;
        color: #13c2c2;
        margin:0 8px;
      }
      .rate-item{
        display: flex;
        & .div:first-child{
          min-width:40px;
        }
         & .div:last-child{
           flex:1;
        }
      }
    }
  }
}
</style>