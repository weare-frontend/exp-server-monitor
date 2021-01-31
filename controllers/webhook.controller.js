const lineNotify = require('../helpers/lineNotify')
const dateHelper = require('../helpers/date.helper')

const methods = {
  async onHook(req, res) {
    let data = req.body
    console.log('data: ', data)
    if (data) {
      let link = {
        aws: 'https://statuspage.freshping.io/50335-GameProvidersStatus',
        lava: 'https://statuspage.freshping.io/22022-Lavagamingstatus',
      }
      let name = data.webhook_event_data.check_name
      let isAvail = data.webhook_event_data.check_state_name == 'Available'
      let time = data.webhook_event_data.check_target_response_time / 1000
      if (name.includes('[AWS]')) {
        let msg = `
        Name: ${name}
        Status: ${isAvail ? 'Up 🟢' : 'Down 🔴'}
        httpStatus: ${data.webhook_event_data.http_status_code}
        Date: ${dateHelper.toDateTime({ _d: data.webhook_event_created_on })}
        Check: every ${time} minute${time > 1 ? 's' : ''}`
        if (!isAvail) {
          msg += `\n\n🔗 Link: ${link.aws}`
        }
        console.log('msg: ', msg)
        try {
          await lineNotify.sendMessage(msg)
        } catch (error) {
          return res.error(error)
        }
      }
    }
    res.success()
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
