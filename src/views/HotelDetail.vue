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
      <div class="intro">
        <p class="title">介绍</p>
        <p class="txt"> {{item.desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import instance from '../utils/service'
import { useAxios } from '@vueuse/integrations'
import { useRouter } from 'vue-router'

export default {
  setup () {
    let item = reactive({
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
    })
    const router = useRouter()
    const like = ref(false)
    const handleClickBack = () => router.back();
    const handleClickLike = () => like.value = !like.value;
    const { data, finished } = useAxios('/detail', { method: 'GET' }, instance)
    item = data;
    return {
      like,
      finished,
      handleClickBack,
      handleClickLike,
      item
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
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>