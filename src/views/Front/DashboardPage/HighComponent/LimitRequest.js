class LimitRequest {
  /**
   *
   * @param {*} chartIds 请求chartIds 数组
   * @param {*} request 请求 对应chartid 的方法 promise
   * @param {*} limit 请求的图表数量
   * @param {*} firstLimit 第一次请求的图表数量，正常 firstLimit < limit
   * @param {*} pool 请求并发限制
   * @param {*} dispatch store dispatch
   * @param {*} types store types
   */
  constructor({ chartIds, request, limit, firstLimit, pool, dispatch, types }) {
    this.chartIds = chartIds
    this.limit = limit || 3
    this.firstLimit = chartIds.length < limit ? limit : firstLimit || 10
    this.pool = pool || 1
    this.dispatch = dispatch
    this.types = types
    this.request = request
    this.running = 0
    this.results = []
    this.reqArr = []
    this.splitChartIds()
  }

  async splitChartIds() {
    this.reqArr.push(this.request(this.chartIds.slice(0, this.firstLimit)))
    this.fetchData()
    if (this.chartIds.length > this.firstLimit) {
      for (let i = this.firstLimit; i < this.chartIds.length; i += this.limit) {
        this.reqArr.push(this.request(this.chartIds.slice(i, i + this.limit)))
      }
      this.fetchData()
    }

  }

  async fetchData(){
    while (this.reqArr.length > 0 && this.running <= this.pool) {
      let task = this.reqArr.shift()
      this.running++
      const ret = await task
      if (ret.code === "0") {
        this.dispatch({ type: this.types.GET_BUSINESS_DATA, payload: ret.resp })
        this.results.push(ret.resp)
      }
      this.running--
    }
    console.log('reqArr his.results', this.results)
  }
}

export default LimitRequest
