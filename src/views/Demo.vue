<template>
  <div
    id="container"
    style="width: 100vw;height: 100vh"
  ></div>
</template>

<script>
/* eslint-disable no-undef */
import { onMounted } from 'vue'
export default {
  setup () {
    onMounted(() => {
      var map = new BMap.Map('container')
      var point = new BMap.Point(116.404, 39.915)
      map.centerAndZoom(point, 15)
      map.enableScrollWheelZoom(true)
    });
  }
}
</script>

<style>
</style>