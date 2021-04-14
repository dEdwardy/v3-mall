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
    <div class="infos">
      <!-- <img :src="info.poster" class="poster" alt="" /> -->
      <div
        class="poster"
        :style="{ background:`url(${info.poster ? info.poster :bg})` }"
      >
        <div class="text">
          {{ info.name }}
        </div>
      </div>
      <div class="info">
        <div class="card">
          <div class="location">
            {{ info.location }}
          </div>
          <van-divider />
          <div class="tags">
            <van-tag
              v-for="(text,idx) of info.tags"
              :key="idx"
              style="margin:0 2px;"
              plain
              type="primary"
            >
              {{ text }}
            </van-tag>
          </div>
          <van-divider />
          <div class="desc">
            {{ info.desc }}
          </div>
          <van-divider />
          <div class="rate">
            <van-rate v-model="info.rate"></van-rate>
          </div>
        </div>
      </div>
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
            <!-- <div
            class="middle"
            :style="{background:`url(${item.img ? item.img: bg})`}"
          ></div> -->
            <img
              v-lazy="{ src:item.img ? item.img :bg }"
              class="middle"
              alt=""
            />
            <div class="info bottom">
              <div class="name">
                <span> {{ item.name }}</span>
                <span style="margin:0 4px;color:#aaa;font-size:14px">/</span>
                <span style="color:#aaa;font-size:14px">{{ item.liveNum }}人</span>
              </div>
              <div
                class="tags"
                style="padding:6px 0"
              >
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
        img: '',
        tags:[],
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
    const { data, finished } = useAxios('/room', { method: 'GET', params: { hotelId: params.id } }, instance)
    watch(finished, () => {
      const tags = data.value.tags.split(',') 
      state.info = {
        poster: data.value.img,
        name: '123123',
        ...data.value,
        tags,
        roomsInfo: data.value.roomsInfo.map(i => ({
          ...i,
          numLeft: 1,
          liveNum: 2,
          tags: i?.tags?.split(',') ?? []
        }))
      }
    })
    const router = useRouter()
    const onClickBack = () => router.back()
    const handleViewDetail = () => {
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
  .infos {
    margin-top: 46px;
    height: calc(100vh - 46px);
    overflow-y: scroll;
    .poster {
      position:relative;
      width: 100%;
      height: 240px;
      opacity: 0.7;
      .text{
        position: absolute;
        font-size: 18px;
        padding:0 16px;
        bottom: 86px;
        color: #000;
        line-height: 18px;
        font-weight: 700;
      }
    }
    .info {
      position: relative;
      z-index: 122222;
      padding: 0 16px;
      .card {
        padding:16px 12px;
        margin-top: -75px;
        border-radius: 12px;
        // min-height: 240px;
        box-shadow: 0px 2px 19px 0px rgba(0, 0, 0, 0.13);
        background-color: #fff;
        .location{
          font-size:14px;
          color:#000;
          font-weight: 700;
        }
        .desc{
          color:#aaa;
          word-break: break-all;
        }
        .rate{
        }
      }
    }
    .list {
      padding: 0 16px;
      .item {
        position: relative;
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
          width: 100%;
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
  }
  ::v-deep(.van-tag) {
    color: #635e54;
    padding: 1px 5px;
    border-color: #dcdcdc;
  }
}
</style>