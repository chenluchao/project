// pages/login/login.js
var validate = require("../../lib/validate.js")
var api = require("../../interface/interface.js")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isUsername: false,
		isPassword: false,
		username: "",
		password: "",
		isdark: false
	},
	dealInput(e) {
		var value = e.detail.value
		var key = e.currentTarget.dataset.key
		var dict = {}
		dict[key] = value
		this.setData(dict)
		var username = this.data.username
		var password = this.data.password
		if (username) {
			this.setData({
				isUsername: true
			})
		} else {
			this.setData({
				isUsername: false
			})
		}
		if (password) {
			this.setData({
				isPassword: true
			})
		} else {
			this.setData({
				isPassword: false
			})
		}
	},
	dealLogin() {
		if (!(this.data.isUsername && this.data.isPassword)) {
			return
		}
		var username = this.data.username
		var password = this.data.password

		//输入信息进行前端验证
		//账户验证4-20
		if (!validate.checkStringLength(username, 4, 20)) {
			wx.showModal({
				title: '提示',
				content: '用户名格式错误,4~20位字符',
				showCancel: false,
				success(res) {
					if (res.confirm) {
						//console.log('确定')
					}
				}
			})
			return
		}

		//密码6-20
		if (!validate.checkStringLength(password, 4, 20)) {
			wx.showModal({
				title: '提示',
				content: '密码格式错误,4~20位字符',
				showCancel: false,
				success(res) {
					if (res.confirm) {
						//console.log('确定')
					}
				}
			})
			return
		}
		//前端验证通过向后台请求数据
		var self = this
		var url = api.loginUrl + "&username=" + username + "&password=" + password
		wx.showLoading({
			title: '正在登录',
		})
		wx.request({
			url: url,
			data: {

			},
			success(res) {
				wx.hideLoading()
				if (res.data.code == 1) {
					//保存登录信息
					wx.setStorageSync("artist_isLogin", "1")
					wx.setStorageSync("artist_user", res.data.data)
					wx.setStorageSync("artist_token", res.data.token)
					//并且跳转到主页
					wx.switchTab({
						url: '/pages/home/home',
					})
				} else {
					wx.showModal({
						title: '登录失败',
						content: "错误信息：" + res.data.desc,
						showCancel: false
					})
				}
			},
			fail() {
				wx.hideLoading()
				wx.showModal({
					title: '错误提示',
					content: "请求超时，请重试",
					showCancel: false
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

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
