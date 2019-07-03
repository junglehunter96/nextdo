// miniprogram/pages/task/index.js
import promisic from '../../utils/promisic.js';
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showTaskAdd:false,
    task_A: null,
    task_B: null,
    task_C: null,
    task_D: null,
  },
  addTask(){
    const user = wx.getStorageSync('userName');
    //验证用户登录
    if(user) {
      this.onOpen()
    }else {
      Toast('请先登录哟,亲~');
    }
  },
  cancelTask(){
    this.onClose()
  },
  ensureTask(e){
    const detail = e.detail;
    console.log(detail);
    const type = e.detail.type;
    console.log(type)
    switch(type){
      case "a":
      this.setData({
        task_A: detail
      });
      break;
      case "b":
        this.setData({
          task_B: detail
        });
      break;
      case "c":
        this.setData({
          task_C: detail
        });
      case "d":
        this.setData({
          task_D: detail
        });
      break;
    }
    this.onClose()
  },
  onOpen() {
    this.setData({ showTaskAdd: true });
  },
  onClose() {
    this.setData({ showTaskAdd: false });
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