import { IExpression } from '../types'

export default class EvalService {
  execute(exp: IExpression) {
    return eval(exp.content)
  }
}
