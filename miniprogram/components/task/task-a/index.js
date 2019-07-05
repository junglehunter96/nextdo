// components/task/task-a/index.js
const date = new Date();
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
    timer: date.getDate()*3600 + date.getHours() * 60 + date.getMinutes(),
    day: date.getDate(),

  },

  /**
   * 组件的方法列表
   */
  methods: {
    remoteItemA(e){
      const index = e.currentTarget.dataset.index;
      this.triggerEvent('remoteTaskA', index)
    },
    opTask(e){
      const index = e.currentTarget.dataset.index;
      const state = e.currentTarget.dataset.state;
      const type = 'a';
      const target = {
        index,type,state
      }
      
      this.triggerEvent('opTask',target)
    }
  }
})
