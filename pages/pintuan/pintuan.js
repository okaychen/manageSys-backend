var app = getApp();
var API_URL = app.globalData.path_info.api;  //服务器地址 host+url
var IMG_URL = app.globalData.path_info.path;  // 图片

/*
var num = 5; // 初始化显示五个商品
var loadProd = function (that, limitNum) {
	wx.request({
		url: API_URL + '/api/product/productList?offset=0&limit=' + limitNum,
		data: {},
		method: 'GET',
		header: {
			'content-type': 'application/json'
		},
		success: function (res) {
			wx.hideLoading();
			console.log(res.data.data, 'product data acquisition success');
			// 分离出无分类的数据<待做处理>
			var productList = res.data.data;  // 获取接口提供的数据
			// for (var i = 0; i < productList.length; i++) {
			//   if (productList[i].cate_id == 0) {
			//     console.log(productList[1].cate_id = 0)
			//   }
			// }
			// 根据cate_id排序
			function compare(cate_id) {
				return function (a, b) {
					var cate_id1 = a[cate_id];
					var cate_id2 = b[cate_id];
					return cate_id1 - cate_id2;
				};
			}
			
			console.log(productList.sort(compare('cate_id'))); // console.log(productList);
			// 对图片路径进行处理<得到轮播图中的第一个图展示>
			for (var i in productList) {
				console.log(productList[i].prod_images = IMG_URL + JSON.parse(productList[i].prod_images)[0]);
				
			}
			that.setData({
				productList: res.data.data
			});
		}
	});
};
var loadProdC = function (that, cate_id, limitc) {
	wx.request({
		url: API_URL + '/api/product/getProductByCateId?offset=0&limit=' + limitc + '&cate_id=' + cate_id,
		data: {},
		method: 'GET',
		header: {
			'content-type': 'application/json'
		},
		success: function (res) {
			wx.hideLoading();
			console.log(res.data.data, 'product data acquisition success');
			// 分离出无分类的数据<待做处理>
			var productList = res.data.data;  // 获取接口提供的数据
			// 对图片路径进行处理<得到轮播图中的第一个图展示>
			for (var i in productList) {
				console.log(productList[i].prod_images = IMG_URL + JSON.parse(productList[i].prod_images)[0]);
			}
			that.setData({
				productList1: res.data.data
			});
		}
	});
};
 */


Page({
	
	data: {
		winHeight: "",//窗口高度
		currentTab: 0, //预设当前项的值
		scrollLeft: 0, //tab标题的滚动条位置
		list: [],
		dd: '',
		hidden: false,
		page: 1,
		size: 20,
		hasMore: true,
		hasRefesh: false,
		hidden: true,
		expertList: [{ //假数据
			img: "",
			name: "",
			tag: "",
			answer: 134,
			listen: 2234
		}],
		category: [],
		current_tab: 0,
		offset: 0,
		productList: [],
		is_loading: false
	},
	//
	//
	//
	onShow: function (e) {
		wx.getSystemInfo({
			success: (res) => {
				this.setData({
					windowHeight: res.windowHeight,
					windowWidth: res.windowWidth
				});
			}
		});
	},
//	pullDownRefresh: function () {
//		console.clear();
//		console.log('下拉刷新');
//	},
	
	pullUpLoad: function () {
		this.loadProduct(this.data.current_tab);
	},
	
	// 页面加载
	onLoad: function (e) {
		var that = this;
		console.log('onLoad');
		wx.request({
			url: API_URL + '/api/category/categoryList',
			data: {
				applet_id: app.globalData.applet_id
			},
			method: 'POST',
			success: function (res) {
				wx.hideLoading();
				console.log(res.data.data, 'category data acquisition success');
				that.setData({category: res.data.data});
			}
		});
		that.loadProduct(0);
	},
	pushPruduct: function (list) {
		let that = this;
		let productList = that.data.productList;
		let newLen = list.length;
		for (let i in list) {
			let ls = list[i];
			ls['prod_images'] = app.globalData.path_info.path + JSON.parse(ls['prod_images']);
			list[i] = ls;
		}
		productList = productList.concat(list);
		that.setData({
			offset: that.data.offset + newLen,
			productList: productList
		});
	},
	loadProduct: function (cate_id, limit = 5) {
		let that = this;
		if (that.data.is_loading) {
			return false;
		}
		that.setData({
			is_loading: true
		});
		wx.showNavigationBarLoading();
		let url = '';
		if (cate_id == 0) {
			url = app.globalData.path_info.api + '/api/product/productList';
		} else {
			url = app.globalData.path_info.api + '/api/product/getProductByCateId';
		}
		wx.request({
			url: url,
			data: {
				applet_id: app.globalData.applet_id,
				cate_id: cate_id,
				offset: that.data.offset,
				limit: limit
			},
			method: 'POST',
			success: function (resp) {
				that.pushPruduct(resp.data.data);
			},
			fail: function (resp) {
				wx.showModal({
					title: '加载失败'
				});
			},
			complete: function () {
				wx.hideNavigationBarLoading();
				that.setData({
					is_loading: false
				});
			}
		});
	},
	
	// 点击标题切换当前页时改变样式
	swichNav: function (e) {
		var that = this;
		var cate_id = e.target.dataset.current;
		that.setData({
			offset: 0,
			productList: [],
			is_loading: false,
			current_tab: cate_id
		});
		that.loadProduct(cate_id);
	},
	/*
	footerTap: app.footerTap,
	// 滚动切换标签样式
	switchTab: function (e) {
		var that = this;
		this.setData({
			currentTab: e.detail.current
		});
		this.checkCor();
		// 请求数据
		loadProdC(this, this.data.currentTab, 5);
		
	},
	 */
	/*
	//判断当前滚动超过一屏时，设置tab标题滚动条。
	checkCor: function () {
		if (this.data.currentTab > 4) {
			this.setData({
				scrollLeft: 300
			});
		} else {
			this.setData({
				scrollLeft: 0
			});
		}
	}
	 */
	onShareAppMessage: function (e) {
		return {
			title:'微拼团',
			success:function () {
				wx.showToast({
					title:'转发成功'
				})
			}
		}
	}
});
