<template>
  <div class="search">
    <van-sticky>
      <van-nav-bar
        title="搜索"
        right-text="X"
        @click-right="handleClose"
      >
        <template #right>
          <van-icon
            name="cross"
            style="color:#aaa"
            size="18"
          />
        </template>
      </van-nav-bar>
      <van-search
        ref="search"
        v-model="state.options.keywords"
        show-action
        clearable
        shape="round"
        placeholder="你想去哪儿？"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="state.value1"
          :options="option1"
        />
        <van-dropdown-item
          v-model="state.value2"
          :options="option2"
        />
      </van-dropdown-menu>
    </van-sticky>
    <div class="list">
      <van-pull-refresh
        v-model="state.refreshing"
        @refresh="onRefresh"
      >
        <van-list
          v-model:loading="state.loading"
          :immediate-check="false"
          :finished="state.finished"
          :finished-text="list.length ===0 ? '':'没有更多了'"
          @load="onLoad"
        >
          <van-empty
            v-if="list.length == 0 && state.options.keywords"
            description="暂无数据"
          />
          <div
            v-for="(item,index) of list"
            :key="index"
            class="item"
          >
            <div>
              <div class="like-icon">
                <van-icon
                  class=""
                  name="like-o"
                />
              </div>
              <div
                class="main"
                @click="() => handleViewDetail(item.id)"
              >
                <!-- <div
                  class="middle"
                  :style="{background:`url(${item.img ? item.img: bg})`}"
                ></div> -->
                <img
                  v-lazy="{ src:item.img ? item.img :bg }"
                  class="middle"
                  lazy="error"
                />
                <div class="info bottom">
                  <div class="flex justify-between">
                    <div class="name"> {{ item.name }}</div>
                    <div class="price"> {{ item.unit +' '+ item.price }}</div>
                  </div>
                  <div class="flex">
                    <div class="location">
                      <van-icon name="location-o" />{{ item.location }} {{ item.distance }}
                    </div>
                    <!-- <div class="distance"> {{ item.distance }}</div> -->
                  </div>
                  <div
                    class="flex"
                    style="justify-content:flex-start"
                  >
                    <van-rate
                      v-model="item.rate"
                      allow-half
                      :count="5"
                      readonly
                    />
                    <div
                      class="flex flex-end align-center"
                      style="flex:1;margin-left:20px;color:#aaa;font-size:14px"
                    >
                      {{ item.commentsNum }} 条评论
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script lang="ts">
import bg from '../assets/list-bg.png'
import { instance } from '../utils/service'
import { useAxios } from '@vueuse/integrations'
import { ref, reactive, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export interface IResult {
  name?: string
  rate?: [number, string]
  commentsNum?: number
  date?: string
  distance?: [string, number]
  location?: [string, number]
  unit?: string
  price?: [string, number]
  personNum?: [string, number]
  roomNum?: [string, number]
}
export interface IOptions {
  keywords?: string
  curPage?: number
  pageNum?: number
  total?: number
}
export default {
  setup() {
    const state = reactive({
      value1: 0,
      value2: 'a',
      loading: false,
      finished: false,
      refreshing: false,
      options: {
        keywords: '',
        curPage: 1,
        pageNum: 10,
        total: undefined
      }
    })
    const option1 = [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 }
    ]
    const option2 = [
      { text: '默认排序', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' }
    ]
    const list = ref<IResult[]>([])
    // const { data, finished } = useAxios('/hotel', { method: 'GET' }, instance)
    // watch(finished, () => {
    //   list.value = data.value ? data.value.map((i:any) => ({
    //     ...i,
    //     rate:Number(i.rate),
    //     unit:'￥',
    //     price:123,
    //     commentsNum:124,
    //     distance:'2km'
    //   })) :[]
    //   console.log(data.value)
    // })
    const value = ref('')
    const search = ref(null)
    const router = useRouter()
    const handleClose = () => {
      router.back()
    }
    const onSearch = () => {
      // state.finished = false;
      // state.loading = true
      state.finished = false
      state.loading = false
      state.options.curPage = 1
      const { data, finished } = useAxios(
        '/hotel',
        {
          method: 'GET',
          params: {
            ...state.options
          }
        },
        instance
      )
      watch(finished, () => {
        state.options.curPage = Number(data.value.curPage)
        state.options.pageNum = data.value.pageNum
        state.options.total = data.value.total
        let res = data.value.data
          ? data.value.data.map((i: any) => ({
              ...i,
              rate: Number(i.rate),
              unit: '￥',
              price: 123,
              commentsNum: 124,
              distance: '2km'
            }))
          : []
        list.value = res
        if (state.options.curPage * state.options.pageNum >= Number(state.options.total)) {
          state.finished = true
          console.log('没有更多了')
          return
        }
      })
    }
    const handleViewDetail = (id: number) => {
      router.push({
        name: 'hotel-info',
        params: {
          id
        }
      })
    }
    const onLoad = async (init = false, refresh = false) => {
      state.loading = true
      if (init) state.options.curPage = 1
      if (
        state.options.total !== undefined &&
        state.options.curPage * state.options.pageNum >= Number(state.options.total)
      ) {
        state.finished = true
        console.error('没有更多了')
        return
      }
      const { data, finished } = useAxios(
        '/hotel',
        {
          method: 'GET',
          params: {
            ...state.options
          }
        },
        instance
      )
      watch(finished, () => {
        state.options.curPage = Number(data.value.curPage)
        state.options.pageNum = data.value.pageNum
        state.options.total = data.value.total
        let res = data.value.data
          ? data.value.data.map((i: any) => ({
              ...i,
              rate: Number(i.rate),
              unit: '￥',
              price: 123,
              commentsNum: 124,
              distance: '2km'
            }))
          : []
        if (init) {
          list.value = res
        } else {
          list.value = [...res, ...list.value]
        }
        // if (init) state.finished = true
        state.loading = false
        if (refresh) {
          state.refreshing = false
          state.finished = false
        }
        state.options.curPage++
      })
    }
    const onRefresh = async () => {
      // 清空列表数据
      state.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true
      await onLoad(true, true)
      // state.refreshing = false
    }
    onMounted(() => {
      onLoad(true)
    })
    return {
      value,
      search,
      handleClose,
      onSearch,
      list,
      // getList,
      handleViewDetail,
      bg,
      state,
      option1,
      option2,
      onLoad,
      onRefresh
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  ::v-deep(.van-nav-bar__title) {
    font-weight: bold;
  }
  ::v-deep(.van-search__content) {
    box-shadow: 0px 2px 19px 0px rgba(0, 0, 0, 0.13);
  }
  .list {
    height: calc(100vh - 148px);
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
        right: 12px;
        top: 10px;
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
        width: 100%;
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
          width: 100px;
          text-align: right;
          font-size: 16px;
        }
        .location {
          word-spacing: 2px;
          display: flex;
          justify-content: flex-start;
          // align-items: center;
          font-size: 14px;
          color: #aaa;
        }
        padding: 16px 12px 16px 12px;
      }
    }
  }
}
</style>