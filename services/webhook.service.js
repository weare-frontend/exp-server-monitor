const Post = require('../models/Post'),
  config = require('../configs/app'),
  { ErrorBadRequest, ErrorNotFound } = require('../configs/errorMethods')

const methods = {
  scopeSearch(req) {},
  delete(id) {},
}

module.exports = { ...methods }
