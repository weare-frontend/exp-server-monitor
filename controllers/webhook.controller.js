const lineNotify = require('../helpers/lineNotify')
const dateHelper = require('../helpers/date.helper')

const methods = {
  async onHook(req, res) {
    let data = req.body
    console.log('data: ', data)
    if (data) {
      let msg = `
        Name: ${data.webhook_event_data.check_name}
        Status: ${data.webhook_event_data.check_state_name == 'Available' ? 'Up 🟢' : 'Down 🔴'}
        httpStatus: ${data.webhook_event_data.http_status_code}
        Date: ${dateHelper.toDateTime({ _d: data.webhook_event_created_on })}
        Check: every ${data.webhook_event_data.check_target_response_time / 1000} minutes
      `
      console.log('msg: ', msg)
      try {
        await lineNotify.sendMessage(msg)
        res.success({
          status: 'success',
        })
      } catch (error) {
        res.error(error)
      }
    } else {
      res.success()
    }
  },

  async onSend(req, res) {
    console.log(req.body)
    try {
      await lineNotify.sendMessage(req.body.message)
      res.success({
        status: 'success',
      })
    } catch (error) {
      res.error(error)
    }
  },

  async onRandom(req, res) {
    try {
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
