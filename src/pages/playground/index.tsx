import { useImmer } from 'use-immer'
import ExpressionBar from './ExpressionBar'
import { IExpression } from './types'
import classes from './index.module.css'

function Playground() {
  const [exps, setExps] = useImmer<IExpression[]>([{ content: '' }])
  return (
    <div className={classes.Playground}>
      {exps.map((exp, idx) => (
        <ExpressionBar exp={exp} key={idx} />
      ))}
    </div>
  )
}

export default Playground
