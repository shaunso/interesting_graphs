async function draw() {
  /////////////////////
  // Load the file with the data to draw the graph
  ////////////////////
  const data = await d3.csv("data.csv");

  /////////////////////
  // Define the margins and dimensions of the chart
  /////////////////////
  const margin = { top: 100, right: 20, bottom: 50, left: 40 };
  const width = 450 - margin.left - margin.right;
  const height = 350 - margin.top - margin.bottom;

  // Creating and appending the svg area to the body of the page
  const svg = d3.select("#stacked-area-chart")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 450 350")
    .attr("preserveAspectRatio", "xMinYMin")
    .append("g")
    .attr("transform", `translate(${margin.left * 2}, ${margin.top})`);

  const parseDate = d3.timeParse("%b %y");

  // // x-accessor function (assuming months are already parsed as UTC dates)
  const xAccessor = d => (parseDate(d.data.months));

  // List of value keys
  const typeKeys = data.columns.slice(1);
  const monthKeys = data.map(d => (parseDate(d.months))); // Assuming parsed month data

  // Stack the data
  const stack = d3.stack()
    .keys(typeKeys)
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

  const stackedData = stack(data);


  ///////////////////////////
  // Define the scales
  ///////////////////////////

  // X scale and Axis (assuming monthKeys holds UTC dates)
  const xScale = d3.scaleUtc()
    .domain(d3.extent(monthKeys))
    .range([0, width]);

  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(
      d3.axisBottom(xScale).ticks(9).tickSize(2).tickPadding(8))

  // Y scale and Axis
  const yScale = d3.scaleLinear()
    .domain([0, 1]) // Adjust domain as needed
    .range([height, 0])
    .nice();

  svg
    .append("g")
    .call(d3.axisLeft(yScale).ticks(8).tickFormat(d3.format(".0%")).tickSize(0).tickPadding(6))
    .call(d => d.select(".domain").remove());

  const areaGenerator = d3.area()
    .x(d => xScale(xAccessor(d))) // Assuming xAccessor returns UTC dates
    .y0(d => yScale(+d[0]))
    .y1(d => yScale(+d[1]))
    .curve(d3.curveBasis);

  // Color palette
  const color = d3.scaleOrdinal()
    .domain(typeKeys)
    .range(d3.schemeDark2);

  svg
    .append("g")
    .selectAll("g")
    .data(stackedData)
    .join("path")
    .attr("fill", d => color(d.key))
    .attr("d", areaGenerator);

  // set horizontal grid line
  const GridLine = () => d3.axisLeft().scale(yScale);

  svg
    .append("g")
      .attr("class", "grid")
    .call(GridLine()
      .tickSize(-width,0,0)
      .tickFormat("")
  );
}

draw();