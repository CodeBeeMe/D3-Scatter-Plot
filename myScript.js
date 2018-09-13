/* !Date:11.09.2018 Copyright ©2018 JavaScript & React code by Cătălin Anghel-Ursu @Madness2aMaze (https://codepen.io/Madness2aMaze)
- All Rights Reserved!

MIT License

Copyright (c) 2018 Cătălin Anghel-Ursu (https://github.com/Madness2aMaze/D3-Scatter-Plot)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

window.onload = () => {
  let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
  req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.send();
  req.onload = () => {
    json = JSON.parse(req.responseText);
    const dataset = json.map((el) => Object.values(el));
    //console.log(json);
    //console.log(dataset);
    const width = 950;
    const height = 600;
    const padding = 75;

    d3
      .select(".container-fluid")
      .append("div")
      .attr("id", "title")
      .append("div")
      .attr("id", "logo")
      .append("h1")
      .attr("id", "dee")
      .text("D");

    d3
      .select("#logo")
      .append("h1")
      .attr("id", "three")
      .text("3");

    d3
      .select("#title")
      .append("h3")
      .attr("id", "sub")
      .text("SCATTER PLOT");

    d3
      .select(".container-fluid")
      .append("div")
      .attr("id", "chart")
      .append("h1")
      .attr("id", "chart-title")
      .text("Doping in Professional Bicycle Racing");
    
    d3
      .select("#chart")
      .append("h3")
      .attr("id", "chart-subtitle")
      .text("35 Fastest times up Alpe d'Huez");
    
    d3
      .select("#chart")
      .append("div")
      .attr("id", "legend")
      .append("p")
      .text("No allegations ")
      .append("i")
      .attr("class", "fas fa-square")
      .style("color", "#75aaaa")
      .style("font-size", "16px");      
    
    d3
      .select("#legend")      
      .append("p")
      .text("Doping allegations ")
      .append("i")
      .attr("class", "fas fa-square")
      .style("color", "#ffaffc")
      .style("font-size", "16px");

    d3
      .select(".container-fluid")
      .append("div")
      .attr("id", "nfo");
    
    const parseYear = d3.timeParse("%Y");
    
    const xScale = d3
                    .scaleTime()                    
                    .range([padding, width - padding])
                    .domain([d3.min(dataset, d => parseYear(d[4] - 1)), d3.max(dataset, d => parseYear(d[4] + 1))]);
    
    const parseTime = d3.timeParse("%M:%S");
    
    const yScale = d3
                    .scaleTime()                    
                    .range([height - padding, padding])
                    .domain(d3.extent(dataset, d => parseTime(d[0])));
    
    const tooltip = d3
    .select("#chart")    
    .append("div")
    .attr("id", "tooltip")    
    .style("opacity", 0);

    const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);    
     
    svg
      .selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("data-xvalue", (d) => parseYear(d[4]).getFullYear())
      .attr("data-yvalue", (d) => parseTime(d[0]).toISOString())
      .attr("cx", (d) => xScale(parseYear(d[4])))
      .attr("cy",(d) => yScale(parseTime(d[0])))
      .attr("r", 9)
      .attr("fill", (d) => (d[6] === "" ? "#75aaaa" : "#ffaffc"))
      .on("mouseover", (d) => {
      tooltip
        .transition()
        .duration(50)
        .style("opacity", 0.9);
      tooltip
        .attr("data-year", parseYear(d[4]).getFullYear())
        .html(d[3] + ": " + d[5] + "<br/>" + "Year: " + d[4] + " Time: " + d[0] + "<br/>" + "Info: " + (d[6] === "" ? "None" : d[6]));
    })
      .on("mouseout", (d) => {
      tooltip
        .transition()
        .duration(500)
        .style("opacity", 0);
    });

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale)
                    .tickFormat(d3.timeFormat("%M:%S"));
    
    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("class", "tick")
      .attr("transform", "translate(0," + (height - padding) + ")")
      .call(xAxis)
      .selectAll("text")
      .style("font-size", "11px");
    
    svg.append("text")             
      .attr("transform", "translate(" + (width / 2) + " ," + (height - 25) + ")")
      .style("text-anchor", "middle")
      .style("fill", "#75aaaa")
      .text("Date in Years")
      .style("font-size", "18px");

    svg
      .append("g")
      .attr("id", "y-axis")
      .attr("class", "tick")
      .attr("transform", "translate(" + padding + ", 0)")      
      .call(yAxis)
      .selectAll("text")
      .style("font-size", "11px");
    
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 25 )
      .attr("x", - height / 2 )
      .style("text-anchor", "middle")
      .style("fill", "#75aaaa")
      .text("Time in Minutes")
      .style("font-size", "18px");
    
  };
};
