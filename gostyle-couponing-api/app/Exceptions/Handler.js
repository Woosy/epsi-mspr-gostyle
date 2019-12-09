'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   */
  async handle (error, { response }) {
    // ModelNotFoundException
    if (error.code === 'E_MISSING_DATABASE_ROW') {
      return response
        .status(404)
        .send({
          errors: [{
            status: 404,
            code: 'E_MODEL_NOT_FOUND',
            detail: 'The requested model cannot be found',
          }],
        })
    }

    return super.handle(...arguments)
  }

  /**
   * Report exception for logging or debugging.
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
