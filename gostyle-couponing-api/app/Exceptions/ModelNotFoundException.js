'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ModelNotFoundException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (_, { response }) {
    return response
      .status(404)
      .send({
        errors: [{
          status: 404,
          code: 'E_MODEL_NOT_FOUND',
          detail: 'The requested model cannot be found'
        }]
      })
  }
}

module.exports = ModelNotFoundException
