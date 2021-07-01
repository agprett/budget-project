import React, {useEffect} from 'react'
import * as d3 from 'd3'

function BreakdownChart(props){
  const {data, size} = props

  useEffect(() => {
    donut()
    return (() => {
      d3.selectAll("svg").remove()
    })
  }, [props.data])

  function donut(){
    var width = size.width,
      height = size.height,
      margin = size.margin


  // The radius of the pieplot is half the width or half the height (smallest one)
    var radius = Math.min(width, height) / 2 - margin

    var svg = d3.select(".breakdown-chart")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // set the color scale
    var color = d3.scaleOrdinal()
      .domain(data)
      .range(["#e89005", "#00a5cf", "#f3e37c", "#c84c09", "#pink", "#00a5cf", "#grey"])

  // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))

  // Radius of the inside and outside of the donut
    var arc = d3.arc()
      .innerRadius(radius * 0.4)
      .outerRadius(radius * 0.8)

  // Arc for the labels
    var outerArc = d3.arc()
      .innerRadius(radius * 0.95)
      .outerRadius(radius * 0.85)

  // Build the pie chart
    svg
      .selectAll('whatever')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

  // Add the polylines between chart and labels:
    svg
      .selectAll('allPolylines')
      .data(data_ready)
      .enter()
      .append('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', function(d) {
          var posA = arc.centroid(d) // line insertion in the slice
          var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
          var posC = outerArc.centroid(d); // Label position = almost the same as posB
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
          posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
          return [posA, posB, posC]
        })

  // Add the polylines between chart and labels:
    svg
      .selectAll('allLabels')
      .data(data_ready)
      .enter()
      .append('text')
        .text( function(d) {return d.data.key} )
        .attr('transform', function(d) {
            var pos = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
        })
        .style('text-anchor', function(d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
        })
  }

  return (
    <></>
  )
}

export default BreakdownChart