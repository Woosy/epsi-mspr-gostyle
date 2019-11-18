'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ModelNotFoundException extends LogicalException {
  
  constructor (message = 'The requested model cannot be found') {
    const status = 404
    const code = 'E_MODEL_NOT_FOUND'
    
    super(message, status, code)
    this.message = message
  }
  
  handle (error, { response }) {
    response
      .status(404)
      .send({
        error: {
          code: this.code,
          status: this.status,
          detail: this.message,
        },
      })
  }
}

module.exports = ModelNotFoundException
