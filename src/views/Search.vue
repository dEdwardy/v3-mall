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
  </div>
</template>

<script>
export default {
  setup () {
    const handleClose = () => {

    }
    return {
      handleClose
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  ::v-deep(.van-nav-bar__title){
    font-weight: bold;
  }
}
</style>