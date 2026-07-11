import type { IndicatorComputeFn } from '../../../types'

export const computeTypicalPrice: IndicatorComputeFn = ({ bars }) => {
  return bars.map((bar) => ({
    ts: bar.ts,
    value: (bar.high + bar.low + bar.close) / 3,
  }))
}
