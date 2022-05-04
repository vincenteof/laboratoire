export type IExpressionResult = {
  status: 'success' | 'error'
  value: any
}

export type IExpression = {
  id: string
  content: string
  result?: IExpressionResult
}
