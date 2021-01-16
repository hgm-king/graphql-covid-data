import { scaleTime, scaleLinear, scaleOrdinal } from '@visx/scale';

export const calculateXRange = (width, margin) => [margin.left, width - margin.right]
// export const calculateYRange = (height, margin) => [(height - margin.top) - margin.bottom, margin.top]
export const calculateYRange = (height, margin) => [height - margin.bottom, margin.top]

export const LinearScale = (domain, range) => scaleLinear({domain, range})
export const TimeScale = (domain, range) => scaleTime({domain, range})
export const OrdinalScale = (domain, range) => scaleOrdinal({domain, range})
