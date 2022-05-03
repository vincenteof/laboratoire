import ExpressionBar from './ExpressionBar'
import ToolBox from './ToolBox'
import useStore from '../../store'
import classes from './index.module.css'

function Playground() {
  const exps = useStore((state) => state.expressions)
  return (
    <div className={classes.Playground}>
      <ToolBox />
      {exps.map((exp) => (
        <ExpressionBar exp={exp} key={exp.id} />
      ))}
    </div>
  )
}

export default Playground
