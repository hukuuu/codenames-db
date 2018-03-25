const mongoose = require('mongoose')

module.exports = (model, schema) => {
  delete mongoose.connection.models[model]
  return mongoose.model(model, schema)
}
