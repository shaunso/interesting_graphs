const data = [["0-4", 99], ["5-9", 99], ["10-14",100], ["15-19",98], ["20-24",83], ["25-29",85], ["30-34",93], ["35-39",97], ["40-44",105], ["45-49",86], ["50-54",66], ["55-59",75], ["60-64",74], ["65-69",78], ["70-74",82], ["75+",74]];

const data2 = [["0-4", 100], ["5-9", 100], ["10-14", 99], ["15-19",99], ["20-24",86], ["25-29",86], ["30-34",87], ["35-39",94], ["40-44", 99], ["45-49",99], ["50-54",72], ["55-59",66], ["60-64",68], ["65-69",65], ["70-74",65], ["75+", 65]];

const dataMap = data.map(d=>d[0])

const xAccessor = d => d[0]
const yAccessor = d => d[1]

// line generator
const lineGenerator = d3.line()
  .x(d => xScale(xAccessor(d)))
  .y(d => yScale(yAccessor(d)))

// draw the svg 
const svg = d3.select("#line-chart")
.append("svg")
.attr("width", 800)
.attr("height", 650)
.style("background-color", "#f7f7f7")
.style("border", "5px solid rgba(231, 225, 225, 0.836)")
.style("border-radius", "5px")

// draw chart area
const chart = svg.append("g")
  .attr("transform", "translate(85,100)");

// scalePoint
const xScale = d3.scalePoint()
  .domain(dataMap)
  .range([20,600]);

const yScale = d3.scaleLinear()
  .domain([0, 110])
  .range([400, 0]);

// draw axes

//x-axis
const xAxis = d3.axisBottom(xScale) 
  .tickPadding([20])
  .tickSize([11])
  
const xAxisGroup = chart.append("g")
  .call(xAxis)

  xAxisGroup.attr("transform",`translate(0,395)`);

  xAxisGroup.select(".domain")
  .attr("stroke","none")
  .attr("stroke-width", 2)
  .attr("opacity","1")
 
 xAxisGroup.selectAll(".tick line")
  .attr("stroke", "rgb(26,26,26)")
  .attr("stroke-width", 1.5)
  .style("stroke-linecap", "round")
  .raise();

xAxisGroup.selectAll(".tick text")
  .attr("fill", "rgb(26,26,26)")
  .attr("font-size", "15")
  .attr("font-weight", 400)
  .attr("font-family","roboto")
  .attr("transform", "translate(-25, 0) rotate(-48)")
  .attr("text-anchor", "end");

xAxisGroup.append("text") 
  .text("age group")
  .attr("fill", "rgb(26,26,26)")
  .attr("font-family","roboto")
  .attr("font-weight", 400)
  .attr("font-size", 20)
  .attr("transform", "translate(300,90)");        

//y-axis
const yAxis = d3.axisLeft(yScale) 
.tickPadding([10])
// .tickFormat(d => d * 100)
 .tickSize(-620);    

const yAxisGroup = chart.append("g")
  .call(yAxis)
    // Customizations using the axis after it is called
  yAxisGroup.select(".domain")
  .attr("stroke","none")
  .attr("stroke-width", 6)
  .attr("opacity","1");

  yAxisGroup.selectAll(".tick line")
  .attr("stroke", "#ddd3e2")
  .attr("stroke-width",2)
  .style("stroke-linecap", "round")
  .attr("stroke-dasharray", "3,6");

  yAxisGroup.select("g:nth-child(2) > line:nth-child(1)")
  .attr("stroke", "rgb(26,26,26)")
  .attr("stroke-width",1)
  .style("stroke-linecap", "round")
  .attr("stroke-dasharray", 0);

  yAxisGroup.selectAll(".tick text")
  .attr("fill", "rgb(26,26,26)")
  .attr("font-size", "15")
  .attr("font-family","roboto")
  .attr("font-weight", 400)
  .attr("text-anchor", "end");

  // yAxisGroup.append("text")
  // .text("males per 100 females")
  // .attr("font-family","roboto")
  // .attr("transform", "translate(-55, 100) rotate(-90)")
  // .attr("font-size", 18)
  // .attr("font-weight", 700)
  // .attr("fill", "green");
  
chart.append("text")
  .text("2022")
  .attr("fill", "#044F85")
  .attr("font-family","roboto")
  .attr("transform", "translate(610,175)")
  .attr("font-size", "16")
  .attr("font-weight", 600);

  chart.append("text")
  .text("2012")
  .attr("fill", "#589BE5")
  .attr("font-family","roboto")
  .attr("transform", "translate(610,140)")
  .attr("font-size", "16")
  .attr("font-weight", 600);

const chartTitle = svg.append("g")
  .attr("transform", "translate(50,45)")
  
chartTitle.append("text")
  .text("Gender ratio in Zimbabwe | 2012 vs 2022")
  .attr("font-family","roboto")
  .attr("fill", "rgb(26,26,26)")
  .attr("font-size", "24")
  .attr("font-weight", 600);
  
chartTitle.append("text")
  .text("males per 100 females")
  .attr("fill", "grey")
  .attr("transform", "translate(0,25)")
  .attr("font-family","roboto")
  .attr("font-size", "16")
  .attr("font-weight", 400);

  // citation
  svg.append("text")
  .text("Source: ZIMSTAT Census Report, 2012 & 2022")
  .attr("font-family","roboto")
  .attr("fill", "grey")
  .attr("font-family","roboto")
  .attr("font-weight", 400)
  .attr("font-size", "12")
  .attr("transform", "translate(50, 615)");

  svg.append("text")
    .text("\u00A9 Ndawana")
    .attr("font-family","roboto")
    .attr("fill", "grey")
    .attr("font-family","roboto")
    .attr("font-weight", 400)
    .attr("font-size", "12")
    .attr("transform", "translate(50, 635)");

// draw circles
// 2012
chart.selectAll("circle")
  .data(data)
  .join("circle")
  .attr("cx", d=>xScale(xAccessor(d)))
  .attr("cy", d=>yScale(yAccessor(d)))
  .attr("r", 3)
  .attr("fill", "#589BE5")
  .raise()

// 2022
chart.selectAll("dot")
  .data(data2)
  .join("circle")
  .attr("cx", d=>xScale(xAccessor(d)))
  .attr("cy", d=>yScale(yAccessor(d)))
  .attr("r", 3)
  .attr("fill", "#044F85")
  .raise()

// draw the path
// 2012
chart.append("path")
  .datum(data)
  .attr("d", lineGenerator)
  .attr("fill", "none")
  .attr("stroke", "#589BE5")
  .attr("stroke-width", 2);

// 2022
chart.append("path")
  .datum(data2)
  .attr("d", lineGenerator)
  .attr("fill", "none")
  .attr("stroke", "#044F85")
  .attr("stroke-width", 2);
