import type { IndicatorComputeFn } from '../../../types'

export const computeMedianPrice: IndicatorComputeFn = ({ bars }) => {
  return bars.map((bar) => ({
    ts: bar.ts,
    value: (bar.high + bar.low) / 2,
  }))
}
