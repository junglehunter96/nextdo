// miniprogram/pages/task/index.js
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showTaskAdd: false,
    task_A: [],
    task_B: [],
    task_C: [],
    task_D: [],
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
    let detail = e.detail;
    let taskText = detail.taskText;
    let day = detail.day;
    let hours = detail.timeArray[1];
    hours = hours>9?hours:'0'+hours;
    let minute = detail.timeArray[2];
    minute = minute>9?minute:'0'+minute;
    let timeArray=[detail.timeArray[1],detail.timeArray[2]];
    let taskItem = {
      taskText,day,hours,minute,timeArray
    }
    let taskArr = [taskItem];
    console.log(taskArr)
    const type = e.detail.type
    switch (type) {
      case 'a':
        this.setData({
          task_A: taskArr.concat(this.data.task_A)
        })
        break
      case 'b':
        this.setData({
          task_B: taskArr.concat(this.data.task_B)
        })
        break
      case 'c':
        this.setData({
          task_C: taskArr.concat(this.data.task_C)
        })
      case 'd':
        this.setData({
          task_D: taskArr.concat(this.data.task_D)
        })
        break
    }
    this.onClose()
  },
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
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

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
  onShareAppMessage: function() {}
})
