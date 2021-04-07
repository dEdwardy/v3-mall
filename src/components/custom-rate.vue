<template>
  <div class="custom-rate-wrapper">
    <div class="custom-rate-inner" :style="{ width:Number(value/total*100)+'%' }"></div>
  </div>
</template>

<script>
export default {
  name: 'CustomRate',
  props: {
    value: {
      type: [Number,String],
      default: 5
    },
    total: {
      type: [Number,String],
      default: 10
    }
  },
  setup () {

  }
}
</script>

<style lang="scss" scoped>
.custom-rate-wrapper {
  width: 100%;
  .custom-rate-inner {
    border-radius:6px;
    background-color: #13c2c2;
    height: 8px;
    line-height: 8px;
  }
}
</style>