import { ref,Ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'
export interface IResult {
  leftTime:Ref<number>
  countDownLoading:Ref<boolean>
  startCount: () => void
  stopCount: () => void
}
/**
 * 
 * @param time number 秒
 * @returns 
 */
export  function useCountDownTime (time: number): IResult {
  const leftTime = ref(time)
  const countDownLoading = ref(false)
  const { start, stop } = useIntervalFn(() => {
    if (leftTime.value - 1 > 0) {
      countDownLoading.value = true
      leftTime.value -= 1;
    }
    else {
      countDownLoading.value = false
      leftTime.value = 0;
      stop()
    }
  }, 1000);
  stop()
  const startCount = () => {
    countDownLoading.value = true
    leftTime.value = time
    start()
  }
  const stopCount = () => {
    stop()
  }
  return {
    leftTime,
    countDownLoading,
    startCount,
    stopCount
  }
}