import React from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'

import Axes from './Axes'
import Bars from './Bars'
import ResponsiveWrapper from './ResponsiveWrapper'

class BarChart extends React.Component {
  constructor() {
    super()
    this.xScale = scaleBand()
    this.yScale = scaleLinear()
  }

  render() {
    const {data} = this.props
    const margins = { top: 20, right: 20, bottom: 80, left: 60 }
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 400),
      height: 250
    }

    const maxValue = Math.max(...data.map(d => d.amount))

    const xScale = this.xScale
      .padding(0.5)
      .domain(data.map(d => d.category))
      .range([margins.left, svgDimensions.width - margins.right])

    const yScale = this.yScale
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top])

    return (
      <svg width={svgDimensions.width} height={svgDimensions.height}>
        <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
        />
        <Bars
          scales={{ xScale, yScale }}
          margins={margins}
          data={data}
          maxValue={maxValue}
          svgDimensions={svgDimensions}
        />
      </svg>
    )
  }
}

export default ResponsiveWrapper(BarChart)