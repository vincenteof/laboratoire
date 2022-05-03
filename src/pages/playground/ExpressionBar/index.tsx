import { IExpression } from '../types'
import CodeTextArea from '../CodeTextArea'

type ExpressionProps = {
  exp: IExpression
}

function ExpressionBar(props: ExpressionProps) {
  const { exp } = props
  return <CodeTextArea defaultValue={exp.content} />
}

export default ExpressionBar
