// components/task/task-a/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    taskArray: null
  },
  attached: function() {

  },
  /**
   * 组件的初始数据
   */
  data: {
    days:['今天','明天','后天'],
    day:new Date().getDate(),
    hours:new Date().getHours(),
    minute:new Date().getMinutes()
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
