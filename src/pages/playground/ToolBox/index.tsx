import {
  PlaySquareOutlined,
  PlusOutlined,
  ScissorOutlined,
  CopyOutlined,
  SnippetsOutlined,
} from '@ant-design/icons'
import classes from './index.module.css'
import useStore from '../../../store'

type ToolBoxProps = {}

function ToolBox(props: ToolBoxProps) {
  const {
    evalFocusedExp,
    appendNewExpression,
    cutFocusedExp,
    copyFocusedExp,
    pasteCopiedExp,
  } = useStore((state) => {
    return {
      evalFocusedExp: () => {
        const focusedExpId = state.focusedExpId
        if (focusedExpId) {
          state.evalExpressionById(focusedExpId)
        }
      },
      appendNewExpression: state.appendNewExpression,
      cutFocusedExp: state.cutFocusedExp,
      copyFocusedExp: state.copyFocusedExp,
      pasteCopiedExp: state.pasteCopiedExp,
    }
  })

  return (
    <div className={classes.ToolBox}>
      <div className={classes['ToolBox-content']}>
        <div className={classes['ToolBox-btn']} onClick={evalFocusedExp}>
          <PlaySquareOutlined />
        </div>
        <div className={classes['ToolBox-btn']} onClick={appendNewExpression}>
          <PlusOutlined />
        </div>
        <div className={classes['ToolBox-btn']} onClick={cutFocusedExp}>
          <ScissorOutlined />
        </div>
        <div className={classes['ToolBox-btn']} onClick={copyFocusedExp}>
          <CopyOutlined />
        </div>
        <div className={classes['ToolBox-btn']} onClick={pasteCopiedExp}>
          <SnippetsOutlined />
        </div>
      </div>
    </div>
  )
}

export default ToolBox
