// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    temp:null,
    city: null,
    weather:null
  },
  // wxs

  /**
   * 组件的初始数据
   */
  data: {
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一','十二'],
    year: 0,
    month: '',
    day: '',
    location: null,
    temp: null,
    weather: null,
    city: null,
  },

  attached:function(){
    this.getDay()
    let getInfo = new Promise((resolve, reject) => {
      this.getLocation(resolve)
    })
      .then(res => {
        this.getWeather(res)
      })
  },

  /**
   * 组件的方法列表
   */
  methods: {
   getDay() {
     let date = new Date()
     let year = date.getFullYear()
     let month = date.getMonth()
     let day = date.getDate()
     day = day < 10 ? '0' + day : day
     this.setData({
       year,
       month: this.data.months[month],
       day
     })
   },
    getLocation(func) {
      const _this = this
      wx.getLocation({
        success: function (res) {
          const location = `${res.longitude},${res.latitude}`
          _this.setData({
            location,
          })
          func(location)
        }
      })
    },

    getWeather(res) {
      const _this = this
      let location = res
      let url = `https://free-api.heweather.net/s6/weather/now?location=${location}&key=f8802d30646548a5bb04bb58e3e27fd1`
      wx.request({
        url,
        header: { 'content-type': 'application/json' },
        method: 'GET',
        dataType: 'json',
        success: result => {
          this.setData({
            temp: result.data.HeWeather6[0].now.fl,
            weather: result.data.HeWeather6[0].now.cond_txt,
            city: result.data.HeWeather6[0].basic.parent_city
          })
        }
      })
    },
  }
})
