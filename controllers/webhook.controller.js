const Service = require('../services/webhook.service')
const lineNotify = require('../helpers/lineNotify')
const dateHelper = require('../helpers/date.helper')

const methods = {
  async onHook(req, res) {
    console.log(req.body)
    res.success({
      date: dateHelper.toDateTime({ _d: '2021-01-30T21:09:01.946224+00:00' }),
      body: req.body,
      status: 'success',
    })
  },

  async onSend(req, res) {
    console.log(req.body)
    // 🟢🔴
    try {
      // let msg = `

      // Brand: ${}
      // Function: ${}
      // Status: Down 🟢
      // Date: ${}
      // `
      let msg = ''
      await lineNotify.sendMessage(msg)
      res.success({
        status: 'success',
      })
    } catch (error) {
      res.error(error)
    }
  },

  async onRandom(req, res) {
    try {
      let d = new Date()
      return res.success({
        status: 'success',
      })
      if (d.getMinutes() % 2 == 0) {
        res.success({
          status: 'success',
        })
      } else {
        let err = new Error('Server error krab')
        err.status = 500
        res.error(err)
      }
    } catch (error) {
      res.error(error)
    }
  },
}

module.exports = { ...methods }
