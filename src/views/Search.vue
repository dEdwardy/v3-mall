<template>
  <div class="search">
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
      v-model="value"
      show-action
      clearable
      shape="round"
      placeholder="你想去哪儿？"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <div class="list">
      <div
        v-for="(item,index) of list"
        :key="index"
        class="item"
      >
        <div class="like-icon">
          <van-icon
            class=""
            name="like-o"
          />
        </div>
        <div class="main" @click="() => handleViewDetail(item)">
          <div
            class="middle"
            :style="{background:`url(${bg})`}"
          ></div>
          <div class="info bottom">
            <div class="flex justify-between">
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
  </div>
</template>

<script>
import bg from '../assets/list-bg.png'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useMock from '../hooks/use-mock'
export default {
  setup () {
    const { list, getList } = useMock()
    const value = ref('')
    const search = ref(null)
    const router = useRouter()
    const handleClose = () => {
      router.back()
    }
    const onSearch = () => {
      console.log(value.value)
      alert(value.value)
    }
    const handleViewDetail = (item) =>{
      console.log(item)
      router.push({
        name:'hotel-info',
        params:{
          id:1
        }
      })
    }
    onMounted(() => getList())
    return {
      value,
      search,
      handleClose,
      onSearch,
      list,
      getList,
      handleViewDetail,
      bg
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