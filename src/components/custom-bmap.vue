<template>
  <div
    id="container"
    style="width:100%;height:100%"
  >
    2424
  </div>
</template>

<script>
import { onMounted } from 'vue'
/* eslint-disable no-undef */
export default {
  name: 'CustomBmap',
  porps: {
    point: {
      type: Array,
      default: [116.404, 39.915]
    }
  },
  setup (props) {
    onMounted(() => {
      const map = new BMap.Map('container')
      console.log(props.point)
      const point = new BMap.Point(...props.point)
      map.centerAndZoom(point, 15)
      map.enableScrollWheelZoom(true)
    })

  }
}
</script>

<style>
</style>