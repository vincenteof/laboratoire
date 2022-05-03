import { useImmer } from 'use-immer'
import Expression from './Expression'
import { IExpression } from './types'
import './index.css'

function Playground() {
  const [exps, setExps] = useImmer<IExpression[]>([{ content: '' }])
  return (
    <div className="Playground">
      {exps.map((exp, idx) => (
        <Expression exp={exp} key={idx} />
      ))}
    </div>
  )
}

export default Playground
