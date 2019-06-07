// pages/agreement/agreement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  isdark:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	  var isdark = wx.getStorageSync("artist_isdark")
	  this.setData({
	  	isdark:isdark
	  })
	   if (isdark) {
	  	wx.setNavigationBarColor({
	  		frontColor: '#ffffff',
	  		backgroundColor: '#08192D',
	  		animation: {
	  			timingFunc: 'linear'
	  		}
	  	})
	  	wx.setTabBarStyle({
	  		color: '#ccc',
	  		selectedColor: '#919191',
	  		backgroundColor: '#0B1B32',
	  		borderStyle: 'white'
	  	})
	  }else{
	  		  wx.setNavigationBarColor({
				frontColor: '#000000',
	  		  	backgroundColor: '#fff',
	  		  	animation: {
	  		  		timingFunc: 'linear'
	  		  	}
	  		  })
	  	wx.setTabBarStyle({
	  		color: '#ccc',
	  		selectedColor: '#919191',
	  		backgroundColor: '#F7F7FA',
	  		borderStyle: 'black'
	  	})
	  }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
	  return {
	  	title: '快来围观，我在看文艺范小程序',
	  	path: '/pages/home/home?id=123',
	  	imageUrl: 'http://pic1.win4000.com/mobile/2017-12-29/5a45981679170.jpg'
	  }
  }
})