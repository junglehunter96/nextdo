// miniprogram/pages/task/index.js
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast'
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showTaskAdd: false,
    TaskSelectshow: false,
    finTaskSelectshow: false,
    task_A: [],
    task_B: [],
    task_C: [],
    task_D: [],
    taskActions: [
      {
        name: '标记已完成'
      }
    ],
    finTaskActions: [
      {
        name: '取消已完成'
      }
    ],
    chooseTask: null
  },
  addTask() {
    const user = wx.getStorageSync('userName')
    //验证用户登录
    if (user) {
      this.onOpen()
    } else {
      Toast('请先登录哟,亲~')
    }
  },
  cancelTask() {
    this.onClose()
  },
  ensureTask(e) {
    let detail = e.detail
    let taskText = detail.taskText
    let day = detail.day
    let hours = detail.timeArray[1]
    hours = hours > 9 ? hours : '0' + hours
    let minute = detail.timeArray[2]
    minute = minute > 9 ? minute : '0' + minute
    let finState = false
    let timer = detail.timeArray[1] * 60 + detail.timeArray[2] + day * 3600
    let taskItem = {
      taskText,
      day,
      hours,
      minute,
      finState,
      timer
    }
    let taskArr = [taskItem]
    const type = e.detail.type
    switch (type) {
      case 'a':
        this.setData({
          task_A: taskArr.concat(this.data.task_A).sort((a, b) => {
            return a.timer - b.timer
          })
        })
        break
      case 'b':
        this.setData({
          task_B: taskArr.concat(this.data.task_B).sort((a, b) => {
            return a.timer - b.timer
          })
        })
        break
      case 'c':
        this.setData({
          task_C: taskArr.concat(this.data.task_C).sort((a, b) => {
            return a.timer - b.timer
          })
        })
        break
      case 'd':
        this.setData({
          task_D: taskArr.concat(this.data.task_D).sort((a, b) => {
            return a.timer - b.timer
          })
        })
        break
    }
    this.onClose()
  },
  //任务标记和修改
  //关闭任务窗口
  onSelectClose() {
    this.setData({
      TaskSelectshow: false
    })
  },
  onFinSelectClose() {
    this.setData({
      finTaskSelectshow: false
    })
  },
  //标记已完成任务
  onTaskSelect(e) {
    if (e.detail.name === '标记已完成') {
      const index = this.data.chooseTask.index
      const type = this.data.chooseTask.type
      switch (type) {
        case 'a':
          let finStateA = `task_A[${index}].finState`
          this.setData({
            [finStateA]: true
          })
          break
        case 'b':
          let finStateB = `task_B[${index}].finState`
          this.setData({
            [finStateB]: true
          })
          break
        case 'c':
          let finStateC = `task_C[${index}].finState`
          this.setData({
            [finStateC]: true
          })
          break
        case 'd':
          let finStateD = `task_D[${index}].finState`
          this.setData({
            [finStateD]: true
          })
          break
      }
    }
    this.onSelectClose()
    this.setData({
      chooseTask: null
    })
  },
  //取消标记已完成
  onfinTaskSelect(e) {
    if (e.detail.name === '取消已完成') {
      const index = this.data.chooseTask.index
      const type = this.data.chooseTask.type
      switch (type) {
        case 'a':
          let finStateA = `task_A[${index}].finState`
          this.setData({
            [finStateA]: false
          })
          break
        case 'd':
          let finStateD = `task_D[${index}].finState`
          this.setData({
            [finStateD]: false
          })
          break
        case 'b':
          let finStateB = `task_B[${index}].finState`
          this.setData({
            [finStateB]: false
          })
          break
        case 'c':
          let finStateC = `task_C[${index}].finState`
          this.setData({
            [finStateC]: false
          })
          break
      }
    }
    this.onFinSelectClose()
    this.setData({
      chooseTask: null
    })
  },
  //取消弹窗任务
  onSelectCancel() {
    this.onSelectClose()
  },
  onFinSelectCancel() {
    this.onFinSelectClose()
  },
  //任务触发器
  opTask(e) {
    let chooseTask = e.detail
    if (chooseTask.state === false) {
      this.setData({
        chooseTask,
        TaskSelectshow: true
      })
    } else {
      this.setData({
        chooseTask,
        finTaskSelectshow: true
      })
    }
  },
  //修改任务
  modifyTask() {},
  onOpen() {
    this.setData({ showTaskAdd: true })
  },
  onClose() {
    this.setData({ showTaskAdd: false })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getTaskA()
    this.getTaskB()
    this.getTaskC()
    this.getTaskD()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setTask_A()
    this.setTask_B()
    this.setTask_C()
    this.setTask_D()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  remoteItemA(e) {
    let index = e.detail

    Dialog.confirm({
      message: '你确定移除当前项吗'
    })
      .then(() => {
        // on confirm
        let task_A = this.data.task_A
        task_A.splice(index, 1)
        this.setData({
          task_A: task_A
        })
      })
      .catch(() => {
        // on cancel
      })
  },
  remoteItemB(e) {
    let index = e.detail
    Dialog.confirm({
      message: '你确定移除当前项吗'
    })
      .then(() => {
        // on confirm
        let task_B = this.data.task_B
        task_B.splice(index, 1)
        this.setData({
          task_B
        })
      })
      .catch(() => {
        // on cancel
      })
  },
  remoteItemC(e) {
    let index = e.detail
    Dialog.confirm({
      message: '你确定移除当前项吗'
    })
      .then(() => {
        // on confirm
        let task_C = this.data.task_C
        task_C.splice(index, 1)
        this.setData({
          task_C
        })
      })
      .catch(() => {
        // on cancel
      })
  },
  remoteItemD(e) {
    let index = e.detail
    Dialog.confirm({
      message: '你确定移除当前项吗'
    })
      .then(() => {
        // on confirm
        let task_D = this.data.task_D
        task_D.splice(index, 1)
        this.setData({
          task_D
        })
      })
      .catch(() => {
        // on cancel
      })
  },
  getTaskA() {
    let task_A = wx.getStorageSync('taska')
    if (task_A) {
      this.setData({
        task_A
      })
    }
  },
  getTaskB() {
    let task_B = wx.getStorageSync('taskb')
    if (task_B) {
      this.setData({
        task_B
      })
    }
  },
  getTaskC() {
    let task_C = wx.getStorageSync('taskc')
    if (task_C) {
      this.setData({
        task_C
      })
    }
  },
  getTaskD() {
    let task_D = wx.getStorageSync('taskd')
    if (task_D) {
      this.setData({
        task_D
      })
    }
  },
  setTask_A() {
    let task_A = this.data.task_A
    if (task_A) {
      try {
        wx.setStorageSync('taska', task_A)
      } catch (e) {
        console.log('储存失败')
      }
    }
  },
  setTask_B() {
    let task_B = this.data.task_B
    if (task_B) {
      try {
        wx.setStorageSync('taskb', task_B)
      } catch (e) {
        console.log('储存失败')
      }
    }
  },
  setTask_C() {
    let task_C = this.data.task_C
    if (task_C) {
      try {
        wx.setStorageSync('taskc', task_C)
      } catch (e) {
        console.log('储存失败')
      }
    }
  },
  setTask_D() {
    let task_D = this.data.task_D
    if (task_D) {
      try {
        wx.setStorageSync('taskd', task_D)
      } catch (e) {
        console.log('储存失败')
      }
    }
  }
})
