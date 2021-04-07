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
        <p class="title" style="padding:0">介绍</p>
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
                :count="10"
                allow-half
                readonly
              />
            </div>
          </div>
        </div>
        <div class="rate-item" style="margin-top:8px">
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
          <img v-for="(item,index) of item.pics" :key="index" class="pic" :src="item" alt="" @click.stop="() => handleClickImg(index)">
        </div>
      </div>
      <!-- 评论 -->
      <div class="commets">
        <div class="title">评论({{ item.comments.length }})</div>
        <div class="wrapper">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomRate from '../components/custom-rate.vue'
import { ref, reactive, toRefs, watch } from 'vue'
import instance from '../utils/service'
import { useAxios } from '@vueuse/integrations'
import { useRouter } from 'vue-router'
import { ImagePreview } from 'vant';

export default {
  components:{
    CustomRate
  },
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
    const handleClickImg = (idx) => {
      ImagePreview({
        images:state.item.pics,
        startPosition:idx,
        showIndex:true,
        loop:false
      })
    }
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
      handleClickImg,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.hotel-detail {
  .title{
    font-size: 14px;
    margin:12px 0;
    padding:0 16px;
    color:#aaa;
  }
  ::v-deep(.van-slider__button-wrapper){
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
      border-radius:8px;
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
      margin:16px 16px 24px;
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
        padding:4px 8px;
        align-items: center;
        &:first-child{
          margin-top:12px !important;
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
    .pics{
      .wrapper{
        overflow: scroll;
      }
      .pic{
        padding:12px;
        width:25%;
        border-radius: 16px;
      }
    }
    .comments{

    }
  }
}
</style>