// pages/feedback/feedback.js
var api = require("../../interface/interface.js")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		type: 1,
		connect: "",
		phone: "",
		isdark: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},
	dealPush() {
		var self = this
		var message = self.data.connect
		var connectType = self.data.phone
		if (message == "") {
			wx.showModal({
				title: "提示",
				content: '提交内容不能为空',
				showCancel: false
			})
			return
		}
		var phone = (/^1\d{10}$/).test(connectType) || (/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/).test(connectType)
		if (!phone) {
			wx.showModal({
				title: "提示",
				content: '请输入正确的电话或邮箱',
				showCancel: false
			})
			return
		}
		// 验证完成进行提交
		var url = api.addFeedbackUrl
		var userId = wx.getStorageSync("artist_user").id
		var token = wx.getStorageSync("artist_token")
		wx.request({
			url: url,
			data: {
				userId: userId,
				token: token,
				type: self.data.type,
				message: message,
				connectType: connectType
			},
			success: function(res) {
				wx.showModal({
					title: '提示',
					content: "问题提交成功，我们会尽快给您答复,请注意查收",
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							wx.navigateBack({
								delta: 1
							})
						}
					}
				})
			}
		})
	},
	dealInput(e) {
		var dict = {}
		var id = e.currentTarget.id
		var value = e.detail.value
		dict[id] = value
		this.setData(dict)
	},
	dealType(e) {
		var type = e.currentTarget.dataset.type
		this.setData({
			type: type
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		var isdark = wx.getStorageSync("artist_isdark")
		this.setData({
			isdark: isdark
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
		} else {
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
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {
		return {
			title: '快来围观，我在看文艺范小程序',
			path: '/pages/home/home?id=123',
			imageUrl: 'http://pic1.win4000.com/mobile/2017-12-29/5a45981679170.jpg'
		}

	}
})
