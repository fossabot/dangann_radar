Page({
  data: {
    spot_list: [],
    city_name: ''
  },
  //事件处理函数
  bindViewTap: function(event) {
    wx.navigateTo({
      url: '../spot_detail/spot_detail?spot_id=' + event.currentTarget.id
    })
  },
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    var city_name = options.city_name
    that.setData({
      city_name: city_name
    })
    wx.setNavigationBarTitle({
      title: city_name
    })
    var request_url = "https://dangann.com/api/v1/city_spot_list/" + city_name + "/"
    wx.request({
      url: request_url,
      header: {
          'content-type': 'application/json',
          'Authorization': 'JWT ' + wx.getStorageSync('api_token')
      },
      success: function(res) {
        var spot_list = res.data
        that.setData({
          spot_list: spot_list,
          spots_count: spot_list.length
        })
      }
    })


  }
})
