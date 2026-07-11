import type { IndicatorComputeFn } from '../../../types'

export const computeAveragePrice: IndicatorComputeFn = ({ bars }) => {
  return bars.map((bar) => ({
    ts: bar.ts,
    value: (bar.open + bar.high + bar.low + bar.close) / 4,
  }))
}
