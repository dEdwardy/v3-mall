<template>
  <!-- <div
    id="container"
    style="width: 100vw;height: 100vh"
  ></div> -->
  <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="item in state.list" :key="item" style="margin:40px" :title="item">
        {{ item }}
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script>
/* eslint-disable no-undef */
// import { onMounted } from 'vue'
import { reactive } from 'vue'
// export default {
//   setup () {
//     onMounted(() => {
//       var map = new BMap.Map('container')
//       var point = new BMap.Point(116.404, 39.915)
//       map.centerAndZoom(point, 15)
//       map.enableScrollWheelZoom(true)
//     });
//   }
// }
export default {
  setup() {
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    });

    const onLoad = () => {
      setTimeout(() => {
        if (state.refreshing) {
          state.list = [];
          state.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          state.list.push(state.list.length + 1);
        }
        state.loading = false;

        if (state.list.length >= 40) {
          state.finished = true;
        }
      }, 1000);
    };

    const onRefresh = () => {
      // 清空列表数据
      state.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      onLoad();
    };

    return {
      state,
      onLoad,
      onRefresh
    };
  }
};
</script>