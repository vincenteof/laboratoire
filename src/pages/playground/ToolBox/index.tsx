import { PlaySquareOutlined } from '@ant-design/icons'
import classes from './index.module.css'
import useStore from '../../../store'

type ToolBoxProps = {}

function ToolBox(props: ToolBoxProps) {
  const { evalFocusedExp } = useStore((state) => {
    return {
      evalFocusedExp: () => {
        const focusedExpId = state.focusedExpId
        if (focusedExpId) {
          state.evalExpressionById(focusedExpId)
        }
      },
    }
  })

  return (
    <div className={classes.ToolBox}>
      <div className={classes['ToolBox-content']}>
        <div className={classes['ToolBox-btn']} onClick={evalFocusedExp}>
          <PlaySquareOutlined />
        </div>
      </div>
    </div>
  )
}

export default ToolBox
