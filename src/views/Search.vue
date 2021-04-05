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
  </div>
</template>

<script>
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup () {
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
    onMounted(() => console.log(search.value))
    return {
      value,
      search,
      handleClose,
      onSearch
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
}
</style>