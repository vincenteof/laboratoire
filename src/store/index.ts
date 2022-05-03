import create from 'zustand'
import { produce } from 'immer'
import { IExpression } from '../types'
import { nanoid } from 'nanoid'
import EvalService from '../services/EvalService'

type IStore = {
  expressions: IExpression[]
  focusedExpId?: string
  setFocusedExpId: (id: string) => void
  setContentById: (id: string, content: string) => void
  evalExpressionById: (id: string) => void
}

const evalService = new EvalService()

// todo: user immer middleware and make ts happy
const useStore = create<IStore>((set) => ({
  expressions: [{ content: '', id: nanoid() }],
  focusedExpId: undefined,
  setFocusedExpId: (id: string) =>
    set(
      produce((state) => {
        state.focusedExpId = id
      })
    ),
  setContentById: (id: string, content: string) => {
    set(
      produce((state) => {
        const targetIndex = state.expressions.findIndex(
          (exp: IExpression) => exp.id === id
        )
        if (targetIndex >= 0) {
          state.expressions[targetIndex].content = content
        }
      })
    )
  },
  evalExpressionById: (id: string) =>
    set(
      produce((state) => {
        const targetIndex = state.expressions.findIndex(
          (exp: IExpression) => exp.id === id
        )
        if (targetIndex >= 0) {
          const result = evalService.execute(state.expressions[targetIndex])
          state.expressions[targetIndex].result = result
        }
      })
    ),
}))

export default useStore
