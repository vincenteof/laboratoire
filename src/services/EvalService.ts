import { IExpression, IExpressionResult } from '../types'

export default class EvalService {
  execute(exp: IExpression): IExpressionResult {
    let result = null
    try {
      result = eval(exp.content)
    } catch (err) {
      return {
        status: 'error',
        value: err,
      }
    }
    return {
      status: 'success',
      value: result,
    }
  }
}
