<template>
  <div class="hotel-info">
    <van-sticky>
      <van-nav-bar
        :title="info.name"
        fixed
        left-arrow
        @click-left="onClickBack"
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
    </van-sticky>
    <div class="list">
      <div
        v-for="(item,index) of info.roomsInfo"
        :key="index"
        class="item"
      >
        <div
          class="main"
          @click="() => handleViewDetail(item)"
        >
          <div
            class="middle"
            :style="{background:`url(${item.img ? item.img: bg})`}"
          ></div>
          <div class="info bottom">
            <div class="name">
              <span> {{ item.name }}</span>
              <span style="margin:0 4px;color:#aaa;font-size:14px">/</span>
              <span style="color:#aaa;font-size:14px">{{ item.liveNum }}人</span>
            </div>
            <div class="tags" style="padding:6px 0">
              <van-tag
                v-for="(text,idx) of item.tags"
                :key="idx"
                style="margin:0 2px;"
                plain
                type="primary"
              >
                {{ text }}
              </van-tag>
            </div>
            <div class="flex justify-between">
              <div class="price">
                <span>￥{{ item.price }}</span>
                <span style="margin:0 4px;color:#aaa;font-size:14px">/</span>
                <span style="color:#aaa;font-size:14px">每晚</span>
              </div>
              <div>
                <van-button
                  style="height:32px;line-height:32px"
                  round
                  type="success"
                >
                  立即预定
                </van-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bg from '../assets/bg.png'
import { watch, ref, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { instance } from '../utils/service'
import { useAxios } from '@vueuse/integrations'
export default {
  setup () {
    const like = ref(false)
    const handleClickLike = () => {
      like.value = !like.value
    }
    const state = reactive({
      info: {
        poster: '',
        name: '',
        roomsInfo: {
          name: '',
          price: '',
          numLeft: '',
          liveNum: ''
        }
      }
    });
    const { params } = useRoute()
    console.log(params)
    const { data, finished } = useAxios('/room', { method: 'GET', params: { hotelId: params.id } }, instance)
    watch(finished, () => {
      state.info = {
        post: '222',
        name: '123123',
        roomsInfo: data.value.map(i => ({
          ...i,
          numLeft: 1,
          liveNum: 2,
          tags: i?.tags?.split(',') ??[]
        }))
      }
      console.error(data.value)
    })
    const router = useRouter()
    const onClickBack = () => router.back()
    const handleViewDetail = item => {
      console.log(item)
      router.push({
        name: 'hotel-detail',
        params: {
          id: 2
        }
      })
    }
    return {
      onClickBack,
      like,
      handleClickLike,
      handleViewDetail,
      bg,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.hotel-info {
  .like-icon {
    color: red;
  }
  // room list style
  .list {
    // height:calc(100vh - 100px);
    overflow-y: scroll;
    margin-top: 46px;
    padding: 0 16px;
    .item {
      margin: 16px 0;
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
        .name {
          font-size: 18px;
          height: 44px;
          line-height: 44px;
        }
        .price {
          font-size: 16px;
          display: flex;
          align-items: center;
        }
        padding: 12px 12px 16px 12px;
      }
    }
  }
  ::v-deep(.van-tag){
    color: #635e54;
    padding:1px 5px;;
    border-color: #dcdcdc;
  }
}
</style>