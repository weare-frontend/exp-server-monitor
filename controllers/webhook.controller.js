const Service = require('../services/webhook.service')
const lineNotify = require('../helpers/lineNotify')

const methods = {
  async onHook(req, res) {
    console.log(req.body)
    res.success({
      body: req.body,
      status: 'success',
    })
  },

  async onSend(req, res) {
    console.log(req.body)
    // 🟢🔴
    try {
      let msg = `

      Brand: Lavagame
      Function: Withdraw 
      Status: Up 🟢
      `
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
