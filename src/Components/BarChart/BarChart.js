import React from 'react'
import axios from 'axios'
import { scaleBand, scaleLinear } from 'd3-scale'

import Axes from './Axes'
import Bars from './Bars'
import ResponsiveWrapper from './ResponsiveWrapper'

class BarChart extends React.Component {
  constructor(props) {
    super(props)
    this.xScale = scaleBand()
    this.yScale = scaleLinear()

    this.state = {
      condensed: {}
    }
  }

  componentDidMount(){
    axios.get('/api/expenses/condensed')
    .then(res => {
      this.setState({condensed: res.data})
    })
    .catch(err => console.log(err))
  }

  render() {
    const {budget} = this.props
    const {condensed} = this.state

    const margins = { top: 20, right: 20, bottom: 80, left: 60 }
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 300),
      height: 250
    }

    const maxValue = Math.max(...budget.map(d => d.amount))

    const xScale = this.xScale
      .padding(0.5)
      .domain(budget.map(d => d.category))
      .range([margins.left, svgDimensions.width - margins.right])

    const yScale = this.yScale
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top])

      let expenses = [
        {category: 'Entertainment', amount: condensed.entertainment},
        {category: 'Personal Care', amount: condensed.personal_care},
        {category: 'Groceries', amount: condensed.groceries},
        {category: 'Travel', amount: condensed.travel},
        {category: 'Other', amount: condensed.other}
      ]

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
          budget={budget}
          maxValue={maxValue}
          svgDimensions={svgDimensions}
          style={{zIndex: 1}}
        />
        <Bars
          scales={{ xScale, yScale }}
          margins={margins}
          expenses={expenses}
          maxValue={maxValue}
          svgDimensions={svgDimensions}
          style={{zIndex: 2, marginLeft: '20px'}}
        />
      </svg>
    )
  }
}

export default ResponsiveWrapper(BarChart)