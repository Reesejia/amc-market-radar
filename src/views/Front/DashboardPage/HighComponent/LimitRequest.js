class LimitRequest {
  /**
   *
   * @param {*} chartIds 请求chartIds 数组
   * @param {*} request 请求 对应chartid 的方法 promise
   * @param {*} limit 请求的图表数量
   * @param {*} firstLimit 第一次请求的图表数量，正常 firstLimit < limit,
   * 如果limit请求和firstLimit请求时间差不多的话 firstLimit = limit
   * @param {*} pool 请求并发限制
   * @param {*} dispatch store dispatch
   * @param {*} types store types
   */
  constructor({ chartIds, request, limit, firstLimit, pool, dispatch, types }) {
    this.chartIds = chartIds
    this.limit = limit || 15
    this.firstLimit = chartIds.length < limit ? limit : firstLimit || limit
    this.pool = pool || 3
    this.dispatch = dispatch
    this.types = types
    this.request = request
    this.running = 0
    this.results = []
    this.reqArr = []
    this.splitChartIds()
  }

  async splitChartIds() {
    this.pushTask(this.request(this.chartIds.slice(0, this.firstLimit)))
    if (this.chartIds.length > this.firstLimit) {
      for (let i = this.firstLimit; i < this.chartIds.length; i += this.limit) {
        this.pushTask(this.request(this.chartIds.slice(i, i + this.limit)))
      }
    }
  }

  pushTask(task) {
    this.reqArr.push(task)
    this.next()
  }

  async next() {
    while (this.reqArr.length > 0 && this.running <= this.pool) {
      let task = this.reqArr.shift()
      this.running++
      try {
        const ret = await task
        console.log('next ret', ret)
        if (Object.hasOwnProperty.call(ret, 'code') && ret.code === '0' || Object.hasOwnProperty.call(ret, 'statusCode') && (ret.statusCode === 0)) {
          let data =  ret.resp || ret.data
          this.dispatch({ type: this.types.GET_BUSINESS_DATA, payload: data })
          this.results.push(ret.resp)
        }
      } catch(err){
        console.error('LimitRequest err', err)
      } finally {
        this.next()
        this.running--
      }
    }
  }
}

export default LimitRequest
