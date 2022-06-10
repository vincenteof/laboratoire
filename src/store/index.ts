import create from 'zustand'
import { produce } from 'immer'
import { IExpression } from '../types'
import { nanoid } from 'nanoid'
import EvaluationService from '../services/EvaluationService'

// todo: replace with redux-toolkit
type IStore = {
  expressions: IExpression[]
  focusedExpId?: string
  copiedExp?: IExpression
  setFocusedExpId: (id: string) => void
  setContentById: (id: string, content: string) => void
  evalExpressionById: (id: string) => void
  appendNewExpression: () => void
  cutFocusedExp: () => void
  copyFocusedExp: () => void
  pasteCopiedExp: () => void
}

const evalService = new EvaluationService()

// todo: user immer middleware and make ts happy
const useStore = create<IStore>((set) => ({
  expressions: [{ content: '', id: nanoid() }],
  focusedExpId: undefined,
  copiedExp: undefined,
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
  appendNewExpression: () =>
    set(
      produce((state) => {
        state.expressions.push({ content: '', id: nanoid() })
      })
    ),
  cutFocusedExp: () =>
    set(
      produce((state) => {
        const targetIndex = state.expressions.findIndex(
          (exp: IExpression) => exp.id === state.focusedExpId
        )
        if (targetIndex >= 0) {
          state.copiedExp = state.expressions[targetIndex]
          state.expressions.splice(targetIndex, 1)
        }
      })
    ),
  copyFocusedExp: () =>
    set(
      produce((state) => {
        const targetIndex = state.expressions.findIndex(
          (exp: IExpression) => exp.id === state.focusedExpId
        )
        if (targetIndex >= 0) {
          state.copiedExp = {
            ...state.expressions[targetIndex],
            id: nanoid(),
          }
        }
      })
    ),
  pasteCopiedExp: () =>
    set(
      produce((state) => {
        const targetIndex = state.expressions.findIndex(
          (exp: IExpression) => exp.id === state.focusedExpId
        )
        if (targetIndex >= 0 && state.copiedExp) {
          state.expressions.splice(targetIndex + 1, 0, state.copiedExp)
        }
      })
    ),
}))

export default useStore
