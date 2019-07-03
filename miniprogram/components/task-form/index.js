// components/task-form/index.js
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
const date = new Date()
const hours = []
const minutes = []
for (let i = 0; i < 24; i++) {
  hours.push(i)
}
for (let i = 0; i < 60; i++) {
  minutes.push(i)
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    taskType:'a',
    taskText:'',
    taskItems: [
      { name: 'b', value: '重要紧急', checked: 'true'},
      { name: 'd', value: '重要不紧急'},
      { name: 'a', value: '紧急不重要'},
      { name: 'c', value: '不紧急不重要'},
    ],
      date: new Date().getDate(),
      days: ['今天','明天','后天'],
      day:0,
      hours: hours,
      hour:1,
      minutes: minutes,
      minute:1,
      value: [1,12,12],
      val:[1,12,12]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    radioChange(e) {
      this.setData({
        taskType: e.detail.value
      })
    },
    bindChange(e) {
      const val = e.detail.value
      this.setData({
        val,
        day: this.data.days[val[0]],
        hour: this.data.hours[val[1]],
        minute: this.data.minutes[val[2]]
      })
    },
    addTaskItem(e) {
      // e.detail 为当前输入的值
      this.setData({
        taskText:e.detail
      })
    },
    cancel(){
      this.triggerEvent("cancel")
    },
    ensure(){
      let today = new Date().getDate();
      let dayif = this.data.val[0];
      let day = null;
      if(0 === dayif) {
        day = today
      }else if(1 === dayif) {
        day = today + 1
      }else {
        day = today + 2
      }
      let taskLi = {
        day,
        type: this.data.taskType,
        timeArray: this.data.val,
        taskText:this.data.taskText
      }
      
      if(taskLi.type&&taskLi.timeArray&&taskLi.taskText&&taskLi.day){
        this.triggerEvent("ensure", taskLi)
      }else{
        Toast('请正确输入哟,亲~');
      }
      
    }
    
  }
})
