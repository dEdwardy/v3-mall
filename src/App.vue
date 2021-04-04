<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style  scoped>
.content {
  height: calc(100vh - 50px);
  overflow-y: auto;
}
</style>
<style lang="scss">
.van-cell{
  padding:10px 8px;
}
</style>