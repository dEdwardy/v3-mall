<template>
  <div class="hotel-detail">
    <van-nav-bar
      :title="item.name"
      fixed
      left-arrow
      safe-area-inset-top
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
        <p
          class="title"
          style="padding:0"
        >
          介绍
        </p>
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
                :size="10"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                :count="10"
                allow-half
                readonly
              />
            </div>
          </div>
        </div>
        <div
          class="rate-item"
          style="margin-top:8px"
        >
          <div class="label">
            房间
          </div>
          <div class="value">
            <custom-rate :value="item.rate.room"></custom-rate>
          </div>
        </div>
        <div class="rate-item">
          <div class="label">
            服务
          </div>
          <div class="value">
            <custom-rate :value="item.rate.service"></custom-rate>
          </div>
        </div>
        <div class="rate-item">
          <div class="label">
            位置
          </div>
          <div class="value">
            <custom-rate :value="item.rate.location"></custom-rate>
          </div>
        </div>
        <div class="rate-item">
          <div class="label">
            价格
          </div>
          <div class="value">
            <custom-rate :value="item.rate.price"></custom-rate>
          </div>
        </div>
      </div>
      <!-- 照片 -->
      <div class="pics">
        <div class="title">照片</div>
        <div class="wrapper flex align-center">
          <img
            v-for="(item,index) of item.pics"
            :key="index"
            class="pic"
            :src="item"
            alt=""
            @click.stop="() => handleClickImg(index)"
          >
        </div>
      </div>
      <!-- 评论 -->
      <div class="comments">
        <div class="title">评论({{ item.comments.length }})</div>
        <div class="wrapper">
          <div
            v-for="(item,index) of item.comments"
            :key="index"
            class="comment"
          >
            <div class="flex">
              <div class="avatar">
                <img :src="item.avatar" />
              </div>
              <div
                class="flex flex-column justify-around"
                style="margin-left:16px;flex:1"
              >
                <div class="flex">
                  <div style="font-size:16px;width:200px">{{ item.name }}</div>
                  <div style="text-align:right;flex:1">{{ item.rate }}</div>
                </div>
                <div class="flex">
                  <div
                    v-if="item.date"
                    style="color:#aaa"
                  >
                    {{ timeAgo(item.date) }}
                  </div>
                  <van-rate
                    v-model="item.rate"
                    class="flex justify-end"
                    style="flex:1"
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                    :size="8"
                    :count="10"
                    allow-half
                    readonly
                  />
                </div>
              </div>
            </div>
            <div class="txt">
              {{ item.comment }}
            </div>
          </div>
        </div>
      </div>
      <!-- 地图定位 -->
      <div style="padding:0 16px">
        <span
          style="color:#13c2c2;font-size:14px"
          @click="getMap"
        >到这里去</span>
      </div>
      <div class="bmap">
        <div
          id="container"
          style="min-height:300px"
        >
        </div>
      </div>
    </div>
    <van-sticky
      :offset-bottom="16"
      position="bottom"
    >
      <div
        class="btns flex justify-center align-center"
        style="margin:0 16px 16px ;"
      >
        <van-button
          block
          round
          size="small"
          type="success"
        >
          立即预定
        </van-button>
      </div>
    </van-sticky>
  </div>
</template>

<script lang="ts">
// import CustomBmap from '../components/custom-bmap'
import { useTimeAgo } from '@vueuse/core'
import CustomRate from '../components/custom-rate.vue'
import { ref, reactive, toRefs, watch, onMounted } from 'vue'
import { mockInstance as instance } from '../utils/service'
import { useAxios } from '@vueuse/integrations'
import { useRouter } from 'vue-router'
import { ImagePreview } from 'vant'

export interface IComment {
  avatar: string
  comment: string
  date: string
  name: string
  rate: number
}
export interface IRate {
  location: number
  price: number
  room: number
  service: number
  total: number
}
export interface IResult {
  desc?: string
  distance?: string
  location?: string
  name: string
  poster?: string
  price: number | string
  pics: Array<any>
  rate: IRate
  comments: Array<IComment>
}
export interface IState {
  item: IResult
}
/* eslint-disable no-undef */
export default {
  components: {
    CustomRate
    // CustomBmap
  },
  setup() {
    const timeAgo = (time: any) => {
      let [year, month, day] = time.split('-')
      return useTimeAgo(new Date(year, month, day)).value
    }
    const more = ref(false)
    const handleClickMore = () => (more.value = true)
    const state = reactive<IState>({
      item: {
        poster: '',
        name: '',
        location: '',
        distance: '',
        price: '',
        desc: '',
        rate: {
          total: 0,
          room: 0,
          service: 0,
          location: 0,
          price: 0
        },
        pics: [],
        comments: []
      }
    })
    const router = useRouter()
    const like = ref(false)
    const handleClickBack = () => router.back()
    const handleClickLike = () => (like.value = !like.value)
    const handleClickImg = (idx: number) => {
      ImagePreview({
        images: state.item.pics,
        startPosition: idx,
        showIndex: true,
        loop: false
      })
    }
    const { data, finished } = useAxios('/detail', { method: 'GET' }, instance)
    watch(finished, () => {
      state.item = data.value
    })
    //换起h5 百度地图
    const getMap = () => {
      window.location.href =
        'http://api.map.baidu.com/marker?location=104.090148,30.59504&title=我的位置&content=银海芯座B栋&output=html&src=webapp.baidu.openAPIdemo'
    }
    onMounted(() => {
      //@ts-ignore
      const map = new BMap.Map('container')
      //@ts-ignore
      const point = new BMap.Point(116.404, 39.915)
      //@ts-ignore
      map.addControl(new BMap.GeolocationControl())
      map.centerAndZoom(point, 15)
      map.enableScrollWheelZoom(true)
    })
    return {
      like,
      more,
      handleClickMore,
      handleClickBack,
      handleClickLike,
      handleClickImg,
      ...toRefs(state),
      timeAgo,
      getMap
    }
  }
}
</script>

<style lang="scss" scoped>
.hotel-detail {
  .title {
    font-size: 14px;
    margin: 12px 0;
    padding: 0 16px;
    color: #aaa;
  }
  ::v-deep(.van-slider__button-wrapper) {
    display: none;
  }
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
    margin-top: 50px;
    .base-info {
      padding: 12px 16px;
      .name {
        font-size: 18px;
        font-weight: bold;
      }
    }
    .other {
      padding: 0 16px;
      color: #aaa;
      font-size: 14px;
      .distance {
        margin: 0 12px;
      }
    }
    .intro {
      padding: 0 16px;
      .title {
        color: #aaa;
        font-size: 14px;
      }
      .txt {
        line-height: 24px;
        word-break: break-all;
        margin-top: 12px;
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
      border-radius: 8px;
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
      margin: 16px 16px 24px;
      padding: 16px;
      .total-rate {
        font-size: 38px;
        line-height: 34px;
        height: 34px;
        color: #13c2c2;
        margin: 0 16px 0 4px;
      }
      .rate-item {
        display: flex;
        padding: 4px 8px;
        align-items: center;
        &:first-child {
          margin-top: 12px !important;
        }
        .label {
          width: 40px;
          font-size: 14px;
        }
        .value {
          padding-right: 20px;
          flex: 1;
        }
      }
    }
    .pics {
      .wrapper {
        overflow: scroll;
      }
      .pic {
        padding: 12px;
        width: 120px;
        height: 120px;
        border-radius: 16px;
      }
    }
    .comments {
      padding: 0 16px;
      .comment {
        border-bottom: 1px solid #aaa;
        font-size: 14px;
        margin: 16px 0;
        .avatar img {
          border-radius: 50%;
          width: 48px;
          height: 48px;
        }
        .txt {
          color: #aaa;
          line-height: 18px;
          padding: 16px 0;
        }
      }
    }
    .bmap {
      padding: 16px;
      margin-bottom: 16px;
    }
  }
}
</style>