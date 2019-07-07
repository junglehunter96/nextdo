import promisic from '../../utils/promisic.js'
const appInstance = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    oneMessage: null,
    aboutShow:false
  },
  onAboutClose(){
    this.setData({
      aboutShow:false
    })
  },
  onShow(options) {
    this.userAuthorized1()
    this.getOneMessage()
    this.getUserInfo()
  },
  
  getUserInfo(){
    wx.getUserInfo({
      success: data => {
        //获取用户登录信息
        if (!appInstance.globalData.userInfo) {
          appInstance.globalData.userInfo = data
          wx.setStorageSync('userName', data.userInfo.nickName)
        }
      }
    })
  },
  //获取一言
  getOneMessage() {
    wx.request({
      url: 'https://v1.hitokoto.cn/',
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: result => {
        this.setData({
          oneMessage: result.data
        })
      },
      fail: () => {},
      complete: () => {}
    })
  },
  userAuthorized1() {
    promisic(wx.getSetting)()
      .then(data => {
        if (data.authSetting['scope.userInfo']) {
          return promisic(wx.getUserInfo)()
        }
        return false
      })
      .then(data => {
        if (!data) return
        this.setData({
          authorized: true,
          userInfo: data.userInfo
        })
      })
  },

  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  onJumpToAbout(event) {
    this.setData({
      aboutShow:true
    })
  },

  onStudy(event) {
    
  }
})
