import { IExpression } from './types'
import TextArea from './TextArea'

type ExpressionProps = {
  exp: IExpression
}

function Expression(props: ExpressionProps) {
  const { exp } = props
  return <TextArea defaultValue={exp.content} />
}

export default Expression
