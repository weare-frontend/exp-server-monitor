const axios = require('axios')
const querystring = require('querystring')

const sendMessage = (message) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.post('https://notify-api.line.me/api/notify', querystring.stringify({ message }), {
        headers: {
          Authorization: `Bearer JaYs6mI8FYENzFyJZxNbbOBIh3bEagfQCodvj4KbG6i`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  sendMessage,
}
