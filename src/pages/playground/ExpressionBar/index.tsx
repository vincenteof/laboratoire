import { useCallback } from 'react'
import { debounce } from 'lodash-es'
import cls from 'classnames'
import { IExpression } from '../../../types'
import CodeTextArea from '../CodeTextArea'
import useStore from '../../../store'
import classes from './index.module.css'

type ExpressionProps = {
  exp: IExpression
}

function ExpressionBar(props: ExpressionProps) {
  const { exp } = props
  const { setFocusedExpId, setContentById, focusedExpId } = useStore(
    (state) => ({
      setFocusedExpId: state.setFocusedExpId,
      setContentById: state.setContentById,
      focusedExpId: state.focusedExpId,
    })
  )
  const onFocus = useCallback(
    () => setFocusedExpId(exp.id),
    [setFocusedExpId, exp]
  )
  const onChange = debounce(
    useCallback(
      (e: any) => {
        if (focusedExpId) {
          setContentById(focusedExpId, e.target.value)
        }
      },
      [focusedExpId]
    ),
    200
  )
  return (
    <div className={classes.ExpressionBar}>
      <CodeTextArea
        defaultValue={exp.content}
        onFocus={onFocus}
        onChange={onChange}
      />
      {exp.result && (
        <div
          className={cls(
            classes['ExpressionBar-result'],
            exp.result.status === 'error' && classes.error
          )}
        >
          {exp.result.status === 'error'
            ? exp.result.value.message
            : exp.result.value}
        </div>
      )}
    </div>
  )
}

export default ExpressionBar
