import { ref ,Ref} from 'vue'
export interface IOptions {
  min?: number,
  max?: number,
  item?: any
}
interface IResult {
  list: Ref<Object>,
  getList:() => number;
}
export default function (options: IOptions = {}):IResult {
  if (options.max && options.min && options.min > options.max) throw new Error('最小值不能大于最大值')
  const list = ref([])
  const getList = () => {
    let random;
    if (options.max && options.min) random = Math.ceil(Math.random() * (options.max - options.min) + options.min)
    else random = Math.ceil(Math.random() * 5)
    list.value = new Array(random).fill(options.item ?? {
      date: '2021/3/1 - 2021/3-21',
      roomNum: 1,
      personNum: 2,
      bg: './assets/list-bg.png',
      name: '吉野家民宿',
      location: '巴塞洛纳,西班牙',
      distance: '2km',
      rate: 4,
      commentsNum: 80,
      price: 1080,
      unit: '￥'
    })
    return random
  };
  const info = ref({})
  const getInfo = () => {
    let random;
    if (options.max && options.min) random = Math.ceil(Math.random() * (options.max - options.min) + options.min)
    else random = Math.ceil(Math.random() * 5)
    const roomsInfo = new Array(random).fill(options.item ?? {
      name:'豪华大床房',
      price:'1888',
      numLeft:2, 
      liveNum:3
    })
    info.value = {  
      poster:'',
      name:'香格里拉酒店',
      roomsInfo
    }
  }
  const detail = ref({});
  const getDetail = () => {
    let random;
    if (options.max && options.min) random = Math.ceil(Math.random() * (options.max - options.min) + options.min)
    else random = Math.ceil(Math.random() * 5)
    detail.value = {  
      poster:'',
      name:'香格里拉酒店',
      location:'巴塞罗那,西班牙',
      distance:'2km',
      price:1080,
      desc:'。。。。。。',
      rate:{
        total:9.2,
        room:9.7,
        servcie:8.7,
        location:8,
        price:8
      },
      pics:new Array(random).fill({
       
      }),
      comments:new Array(random).fill({
        name:'',
        avatar:'',
        comment:'',
        rate:'',
        date:''
      })
    }
  }
  return {
    list,
    getList,
    info,
    getInfo,
    detail,
    getDetail
  }
}