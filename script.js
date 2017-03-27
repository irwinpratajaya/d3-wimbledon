/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', 1100)
  .attr('height', 300)
  .style('background', '#cacaca')

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', (rows)=>{
    // console.log('Jumlah total pertandingan: '+rows.length);
    // console.log('Goal(s) Scored: '+rows[0].GoalsScored);

    const dataset = rows.map((item)=> {
      return item.GoalsScored
    })
    // console.log(dataset);
    redraw(dataset)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, height])

  const xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width])

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'results')
    .attr('x', (d,i) => {
      return i * 22 + 'px'
    })
    .attr('y', (d) => {
      return height - yScale(d)
    })
    .attr('width', 25)
    .attr('height', (d) => {
      return yScale(d)
    })
    .style('fill', 'green')

  // Axes Scale
  // var axisScale = d3.scale.linear()
  //                      .domain([0,100])
  //                      .range([0,100]);
  // var xAxis = d3.scaleLinear()
  //               .scale(axisScale);
}

reload()
