import { findBarIndexByTs } from '../data/binary-search'
import { valueToYScaled, yToValueScaled } from '../data/scales'
import type { ChartBar, NumericRange } from '../../types/data'
import type { PrimitiveCoordinateHelpers } from '../../types/primitives'
import type { ChartViewport, PriceScaleMode } from '../../types/viewport'

/**
 * Creates coordinate conversion helpers for primitive renderers.
 * These helpers convert between data space (price, bar index, timestamp)
 * and pixel space (x, y coordinates) within the chart area.
 */
export const createCoordinateHelpers = (
  viewport: ChartViewport,
  priceRange: NumericRange,
  width: number,
  height: number,
  bars: Array<ChartBar>,
  priceScaleMode: PriceScaleMode,
  priceAxisWidth: number,
): PrimitiveCoordinateHelpers => {
  const chartWidth = width - priceAxisWidth
  const total = viewport.endIndex - viewport.startIndex + 1

  return {
    priceToY: (price: number): number => {
      return valueToYScaled(price, priceRange, height, priceScaleMode)
    },

    indexToX: (index: number): number => {
      const relative = index - viewport.startIndex + 0.5
      return (relative / total) * chartWidth
    },

    timeToX: (ts: number): number | null => {
      const index = findBarIndexByTs(bars, ts)
      // findBarIndexByTs returns nearest index for non-empty arrays,
      // so we must verify the exact timestamp matches
      if (index < 0 || !bars[index] || bars[index].ts !== ts) return null
      const relative = index - viewport.startIndex + 0.5
      return (relative / total) * chartWidth
    },

    yToPrice: (y: number): number => {
      return yToValueScaled(y, priceRange, height, priceScaleMode)
    },

    xToIndex: (x: number): number => {
      return Math.round((x / chartWidth) * total + viewport.startIndex - 0.5)
    },
  }
}
