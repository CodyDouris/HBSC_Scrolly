//scroll page to top of page on refresh
// window.onbeforeunload = function () {
//   window.scrollTo(0, 0);
// }
let language = $('html').attr('lang');
let intensiveData;
let problematicData;
d3.csv("./src/data/Intensive_Bar_Graph.csv").then(function(data){
    intensiveData = data;
    let svg = d3.select("#intensiveFigure");
    
    const margin = {
        top: 30,
        right: 20,
        bottom: 80,
        left: 90
    };
    
    let width = 1100 - margin.left - margin.right;
    let height = 670 - margin.top - margin.bottom;
    
    svg = svg
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 1180 750")
        .append("g")
        .attr("id", "graphG")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    
    let y = d3.scaleLinear()
        .range([height, 0]);
    
    let x = d3.scaleBand()
        .range([0, width]);
        
    svg.append("g")
        .attr("class", "y-axis");
    
    svg.append("g")
        .attr("class", "x-axis");
    
    let xAxisTitle = svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (margin.bottom + 550 ) + ")")
        .style("text-anchor", "middle")
        .style("font-weight","bold")
        .attr("class", "x-axis-title")
        .style("font-size", "26px");
    
    let yAxisTitle = svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -5 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-weight","bold")
        .style("font-size","26px")
        .attr("class", "y-axis-title")
    
    x.domain(data.map((d)=> {
        return d["Age"];
    }));
    
    y.domain([0, 50]);
    
    var xAxis = svg.select(".x-axis").attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    
    xAxis
        .selectAll(".tick line")
        .attr("transform", "rotate(-180)")
        .attr('y2', height);
    
    xAxis
        .selectAll(".tick text")
        .style("font-size", "24px")
        .attr("y", 10);
    
    yAxisTitle
        .transition()
        .duration(600)
        .text(function() {
            if (language == "en") {
                return "Percent";
            }
            else {
                return "Percent";
            }
        });
    
    svg.select(".y-axis")
        .transition()
        .duration(600)
        .call(d3.axisLeft(y))
        .selectAll(".tick text")
        .style("font-size", "25px")
        .text(function(d, i) {
            return d;
        })
    
    xAxisTitle
        .transition()
        .duration(600)
        .text(function() {
            if (language == "en") {
                return "Age";
            }
            else {
                return "Age";
            }
        });
    let girlsG = svg.append("g")
                    .attr("class","gGirls");
     girlsG   
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class","girlRect")
        .attr("fill", "#f9c72a")
        .attr("y",(d)=> { return y(0);}) //d["Girls%"]
        .attr("x", (d)=>{ 
            return x(d["Age"]) + 83;
        })
        .attr("width", x.bandwidth() - 125)
        .attr("height", (d)=> { return y(0) - y(0);}) //d["Girls%"]
        .style("stroke","black");
        
    girlsG
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .style("font-weight","bold")
        .style("font-size","20px")
        .style("opacity",0)
        .attr("y", (d)=> { return y(0) - 10;})//+d["GirlsCI"].substring(5,8)
        .attr("x", (d)=>{ return x(d["Age"]) + 87;})
        .text((d)=>{return d["Girls%"];});
        
    girlsG
        .selectAll(".bottomLines")
        .data(data)
        .enter()
        .append("line")
        .attr("class","bottomLines")
        .style("stroke","black")
        .style("stroke-width","2px")
        .attr("y1",(d)=>{ return y(0)})//+d["GirlsCI"].substring(0,3)
        .attr("x1",(d)=>{ return (x(d["Age"])+ 103) + 12})
        .attr("y2",(d)=>{ return y(0)})//+d["GirlsCI"].substring(0,3)
        .attr("x2",(d)=>{ return (x(d["Age"])+ 103) - 12});
        
    girlsG
        .selectAll(".middleLines")
        .data(data)
        .enter()
        .append("line")
        .attr("class","middleLines")
        .style("stroke","black")
        .style("stroke-width","2px")
        .attr("y1",(d)=>{ return y(0)})//+d["GirlsCI"].substring(0,3)
        .attr("x1",(d)=>{ return x(d["Age"])+ 103})
        .attr("y2",(d)=>{ return y(0)})//+d["GirlsCI"].substring(5,8)
        .attr("x2",(d)=>{ return x(d["Age"])+ 103});
        
    girlsG
        .selectAll(".topLines")
        .data(data)
        .enter()
        .append("line")
        .attr("class","topLines")
        .style("stroke","black")
        .style("stroke-width","2px")
        .attr("y1",(d)=>{ return y(0)})//+d["GirlsCI"].substring(5,8)
        .attr("x1",(d)=>{ return (x(d["Age"])+ 103) + 12})
        .attr("y2",(d)=>{ return y(0)})//+d["GirlsCI"].substring(5,8)
        .attr("x2",(d)=>{ return (x(d["Age"])+ 103) - 12});
        
    let boysG = svg.append("g")
        .attr("class","gBoys");
        
    boysG
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class","boyRect")
        .attr("fill", "#3f8875")
        .attr("y", (d)=> { return y(0);})//d["Boys%"]
        .attr("x", (d)=>{ return x(d["Age"]) + 43;})
        .attr("width", x.bandwidth() - 125)
        .attr("height", (d)=> { return y(0) - y(0);})//d["Boys%"]
        .style("stroke","black");
        
    boysG
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .style("font-weight","bold")
        .style("font-size","20px")
        .style("opacity",0)
        .attr("y", (d)=> { return y(0) - 15;})//+d["BoysCI"].substring(5,8)
        .attr("x", (d)=>{ return x(d["Age"]) + 42;})
        .text((d)=>{return d["Boys%"];});
        
    boysG
        .selectAll(".bottomLines")
        .data(data)
        .enter()
        .append("line")
        .attr("class","bottomLines")
        .style("stroke","black")
        .style("stroke-width","2px")
        .attr("y1",(d)=>{ return y(0)})//+d["BoysCI"].substring(0,3)
        .attr("x1",(d)=>{ return (x(d["Age"])+ 65) + 12})
        .attr("y2",(d)=>{ return y(0)})//+d["BoysCI"].substring(0,3)
        .attr("x2",(d)=>{ return (x(d["Age"])+ 65) - 12});
        
    boysG
        .selectAll(".middleLines")
        .data(data)
        .enter()
        .append("line")
        .attr("class","middleLines")
        .style("stroke","black")
        .style("stroke-width","2px")
        .attr("y1",(d)=>{ return y(0)})//+d["BoysCI"].substring(0,3)
        .attr("x1",(d)=>{ return x(d["Age"])+ 65})
        .attr("y2",(d)=>{ return y(0)})//+d["BoysCI"].substring(5,8)
        .attr("x2",(d)=>{ return x(d["Age"])+ 65});
        
    boysG
        .selectAll(".topLines")
        .data(data)
        .enter()
        .append("line")
        .attr("class","topLines")
        .style("stroke","black")
        .style("stroke-width","2px")
        .attr("y1",(d)=>{ return y(0)})//+d["BoysCI"].substring(5,8)
        .attr("x1",(d)=>{ return (x(d["Age"])+ 65) + 12})
        .attr("y2",(d)=>{ return y(0)})//+d["BoysCI"].substring(5,8)
        .attr("x2",(d)=>{ return (x(d["Age"])+ 65) - 12});
        
    let legendBars = svg.append("g")
        .attr("class", "legendGBars")
        .attr("font-family", "sans-serif")
        .attr("font-size", "25px")
        .attr("text-anchor", "start")
        .attr("transform", "translate(-115,0)")
        .selectAll("g")
        .data(["Girls","Boys"])
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + (width - margin.left + 170) + "," + i * 30 + ")"; });
    
    legendBars.append("rect")
        .attr("x", 30)
        .attr("width", 24)
        .attr("height", 24)
        .attr("fill", (d)=> { 
            if(d == "Girls") 
                return "#f9c72a"; 
            else 
                return "#3f8875"; })
        .style("stroke-width", "0.5px")
        .style("stroke", "black")
    
    legendBars.append("text")
        .attr("x", 59)
        .attr("y", 9.5)
        .attr("dy", "0.4em")
        .text((d)=> { return d; });
});
//horizontal starting graph
d3.csv("./src/data/Problematic_Bar_Graph.csv").then(function(data){
    problematicData = data;
    let svg = d3.select("#problematicFigure");
    
    const margin = {
        top: 30,
        right: 20,
        bottom: 80,
        left: 90
    };
    
    let width = 1100 - margin.left - margin.right;
    let height = 670 - margin.top - margin.bottom;
    
    svg = svg
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 1180 750")
        .append("g")
        .attr("id", "graphG")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    
    let x = d3.scaleLinear()
        .range([0, width]);
    
    let y = d3.scaleBand()
        .range([0, height]);
        
    svg.append("g")
        .attr("class", "y-axis");
    
    svg.append("g")
        .attr("class", "x-axis");
    
    let xAxisTitle = svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (margin.bottom + 550 ) + ")")
        .style("text-anchor", "middle")
        .style("font-weight","bold")
        .attr("class", "x-axis-title")
        .style("font-size", "26px");
    
    let yAxisTitle = svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -5 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-weight","bold")
        .style("font-size","26px")
        .attr("class", "y-axis-title")
    
    y.domain(data.map((d)=> {
        return d["Age"];
    }));
    
    x.domain([0, 13]);
    
    var xAxis = svg.select(".x-axis").attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    
    xAxis
        .selectAll(".tick line")
        .attr("transform", "rotate(-180)")
        .attr('y2', height);
    
    xAxis
        .selectAll(".tick text")
        .style("font-size", "24px")
        .attr("y", 10);
    
    yAxisTitle
        .transition()
        .duration(600)
        .text(function() {
            if (language == "en") {
                return "Age";
            }
            else {
                return "Age";
            }
        });
    
    svg.select(".y-axis")
        .transition()
        .duration(600)
        .call(d3.axisLeft(y))
        .selectAll(".tick text")
        .style("font-size", "25px")
        .text(function(d) {
            return d;
        })
    
    xAxisTitle
        .transition()
        .duration(600)
        .text(function() {
            if (language == "en") {
                return "Percent";
            }
            else {
                return "Percent";
            }
        });
    let girlsG = svg.append("g")
                    .attr("class","gGirls");
     girlsG   
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class","girlRect")
        .attr("fill", "#f9c72a")
        .attr("y",(d)=>{ 
            return y(d["Age"]) + 23;
        })
        .attr("x", x(0))
        .attr("width", x(0) - x(0))
        .attr("height", y.bandwidth() - 70)
        .style("stroke","black");
        
    girlsG
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .style("font-weight","bold")
        .style("font-size","23px")
        .style("opacity",0)
        .attr("y",(d)=>{ return y(d["Age"]) + 42;})
        .attr("x", x(0) - 10)
        .text((d)=>{return d["Girls%"];});
        
    girlsG
        .selectAll(".bottomLines")
        .data(data)
        .enter()
        .append("line")
        .attr("class","bottomLines")
        .style("stroke","black")
        .style("stroke-width","2px")
        .attr("y1",(d)=>{ return (y(d["Age"])+ 35) + 12})
        .attr("x1",(d)=>{ return x(0)})
        .attr("y2",(d)=>{ return (y(d["Age"])+ 35) - 12})
        .attr("x2",(d)=>{ return x(0)});
        
    girlsG
        .selectAll(".middleLines")
        .data(data)
        .enter()
        .append("line")
        .attr("class","middleLines")
        .style("stroke","black")
        .style("stroke-width","2px")
        .attr("y1",(d)=>{ return y(d["Age"])+ 35})
        .attr("x1",(d)=>{ return x(0)})
        .attr("y2",(d)=>{ return y(d["Age"])+ 35})
        .attr("x2",(d)=>{ return x(0)});
        
    girlsG
        .selectAll(".topLines")
        .data(data)
        .enter()
        .append("line")
        .attr("class","topLines")
        .style("stroke","black")
        .style("stroke-width","2px")
        .attr("y1",(d)=>{ return (y(d["Age"])+ 35) + 12})
        .attr("x1",(d)=>{ return x(0)})
        .attr("y2",(d)=>{ return (y(d["Age"])+ 35) - 12})
        .attr("x2",(d)=>{ return x(0)});
        
    let boysG = svg.append("g")
        .attr("class","gBoys");
        
    boysG
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class","boyRect")
        .attr("fill", "#3f8875")
        .attr("y",(d)=>{ 
            return y(d["Age"]) + 47;
        })
        .attr("x", x(0))
        .attr("width", x(0) - x(0))
        .attr("height", y.bandwidth() - 70)
        .style("stroke","black");
        
    boysG
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .style("font-weight","bold")
        .style("font-size","23px")
        .style("opacity",0)
        .attr("y",(d)=>{ return y(d["Age"]) + 67;})
        .attr("x", x(0))
        .text((d)=>{return d["Boys%"];});
        
    boysG
        .selectAll(".bottomLines")
        .data(data)
        .enter()
        .append("line")
        .attr("class","bottomLines")
        .style("stroke","black")
        .style("stroke-width","2px")
        .attr("y1",(d)=>{ return (y(d["Age"])+ 59) + 12})
        .attr("x1",(d)=>{ return x(0)})
        .attr("y2",(d)=>{ return (y(d["Age"])+ 59) - 12})
        .attr("x2",(d)=>{ return x(0)});
        
    boysG
        .selectAll(".middleLines")
        .data(data)
        .enter()
        .append("line")
        .attr("class","middleLines")
        .style("stroke","black")
        .style("stroke-width","2px")
        .attr("y1",(d)=>{ return y(d["Age"])+ 59})
        .attr("x1",(d)=>{ return x(0)})
        .attr("y2",(d)=>{ return y(d["Age"])+ 59})
        .attr("x2",(d)=>{ return x(0)});
        
    boysG
        .selectAll(".topLines")
        .data(data)
        .enter()
        .append("line")
        .attr("class","topLines")
        .style("stroke","black")
        .style("stroke-width","2px")
      .attr("y1",(d)=>{ return (y(d["Age"])+ 59) + 12})
        .attr("x1",(d)=>{ return x(0)})
        .attr("y2",(d)=>{ return (y(d["Age"])+ 59) - 12})
        .attr("x2",(d)=>{ return x(0)});
        
    let legendBars = svg.append("g")
        .attr("class", "legendGBars")
        .attr("font-family", "sans-serif")
        .attr("font-size", "25px")
        .attr("text-anchor", "start")
        .attr("transform", "translate(-115,0)")
        .selectAll("g")
        .data(["Girls","Boys"])
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + (width - margin.left + 90) + "," + i * 30 + ")"; });
    
    legendBars.append("rect")
        .attr("x", 30)
        .attr("width", 24)
        .attr("height", 24)
        .attr("fill", (d)=> { 
            if(d == "Girls") 
                return "#f9c72a"; 
            else 
                return "#3f8875"; })
        .style("stroke-width", "0.5px")
        .style("stroke", "black")
    
    legendBars.append("text")
        .attr("x", 59)
        .attr("y", 9.5)
        .attr("dy", "0.4em")
        .text((d)=> { return d; });
});

// d3.csv("./src/data/Problematic_Bar_Graph.csv").then(function(data){
//     problematicData = data;
//     let svg = d3.select("#problematicFigure");
    
//     const margin = {
//         top: 30,
//         right: 20,
//         bottom: 80,
//         left: 90
//     };
    
//     let width = 1100 - margin.left - margin.right;
//     let height = 670 - margin.top - margin.bottom;
    
//     svg = svg
//         .attr("preserveAspectRatio", "xMinYMin meet")
//         .attr("viewBox", "0 0 1180 750")
//         .append("g")
//         .attr("id", "graphG")
//         .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    
//     let y = d3.scaleLinear()
//         .range([height, 0]);
    
//     let x = d3.scaleBand()
//         .range([0, width]);
        
//     svg.append("g")
//         .attr("class", "y-axis");
    
//     svg.append("g")
//         .attr("class", "x-axis");
    
//     let xAxisTitle = svg.append("text")
//         .attr("transform", "translate(" + (width / 2) + " ," + (margin.bottom + 550 ) + ")")
//         .style("text-anchor", "middle")
//         .style("font-weight","bold")
//         .attr("class", "x-axis-title")
//         .style("font-size", "26px");
    
//     let yAxisTitle = svg.append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", -5 - margin.left)
//         .attr("x", 0 - (height / 2))
//         .attr("dy", "1em")
//         .style("text-anchor", "middle")
//         .style("font-weight","bold")
//         .style("font-size","26px")
//         .attr("class", "y-axis-title")
    
//     x.domain(data.map((d)=> {
//         return d["Age"];
//     }));
    
//     y.domain([0, 13]);
    
//     var xAxis = svg.select(".x-axis").attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x));
    
//     xAxis
//         .selectAll(".tick line")
//         .attr("transform", "rotate(-180)")
//         .attr('y2', height);
    
//     xAxis
//         .selectAll(".tick text")
//         .style("font-size", "24px")
//         .attr("y", 10);
    
//     yAxisTitle
//         .transition()
//         .duration(600)
//         .text(function() {
//             if (language == "en") {
//                 return "Percent";
//             }
//             else {
//                 return "Percent";
//             }
//         });
    
//     svg.select(".y-axis")
//         .transition()
//         .duration(600)
//         .call(d3.axisLeft(y))
//         .selectAll(".tick text")
//         .style("font-size", "25px")
//         .text(function(d) {
//             return d;
//         })
    
//     xAxisTitle
//         .transition()
//         .duration(600)
//         .text(function() {
//             if (language == "en") {
//                 return "Age";
//             }
//             else {
//                 return "Age";
//             }
//         });
//     let girlsG = svg.append("g")
//                     .attr("class","gGirls");
//      girlsG   
//         .selectAll("rect")
//         .data(data)
//         .enter()
//         .append("rect")
//         .attr("class","girlRect")
//         .attr("fill", "#f9c72a")
//         .attr("y",y(0))//d["Girls%"]
//         .attr("x", (d)=>{ 
//             return x(d["Age"]) + 83;
//         })
//         .attr("width", x.bandwidth() - 125)
//         .attr("height", y(0) - y(0))//d["Girls%"]
//         .style("stroke","black");
        
//     girlsG
//         .selectAll("text")
//         .data(data)
//         .enter()
//         .append("text")
//         .style("font-weight","bold")
//         .style("font-size","23px")
//         .style("opacity",0)
//         .attr("y", y(0) - 10)//+d["GirlsCI"].substring(4,6)
//         .attr("x", (d)=>{ return x(d["Age"]) + 84;})
//         .text((d)=>{return d["Girls%"];});//d["Girls%"]
        
//     girlsG
//         .selectAll(".bottomLines")
//         .data(data)
//         .enter()
//         .append("line")
//         .attr("class","bottomLines")
//         .style("stroke","black")
//         .style("stroke-width","2px")
//         .attr("y1",y(0))//+d["GirlsCI"].substring(0,2)
//         .attr("x1",(d)=>{ return (x(d["Age"])+ 103) + 12})
//         .attr("y2",y(0))//+d["GirlsCI"].substring(0,2)
//         .attr("x2",(d)=>{ return (x(d["Age"])+ 103) - 12});
        
//     girlsG
//         .selectAll(".middleLines")
//         .data(data)
//         .enter()
//         .append("line")
//         .attr("class","middleLines")
//         .style("stroke","black")
//         .style("stroke-width","2px")
//         .attr("y1",y(0))//+d["GirlsCI"].substring(0,2)
//         .attr("x1",(d)=>{ return x(d["Age"])+ 103})
//         .attr("y2",y(0))//+d["GirlsCI"].substring(4,6)
//         .attr("x2",(d)=>{ return x(d["Age"])+ 103});
        
//     girlsG
//         .selectAll(".topLines")
//         .data(data)
//         .enter()
//         .append("line")
//         .attr("class","topLines")
//         .style("stroke","black")
//         .style("stroke-width","2px")
//         .attr("y1",y(0))//+d["GirlsCI"].substring(4,6)
//         .attr("x1",(d)=>{ return (x(d["Age"])+ 103) + 12})
//         .attr("y2",y(0))//+d["GirlsCI"].substring(4,6)
//         .attr("x2",(d)=>{ return (x(d["Age"])+ 103) - 12});
        
//     let boysG = svg.append("g")
//         .attr("class","gBoys");
        
//     boysG
//         .selectAll("rect")
//         .data(data)
//         .enter()
//         .append("rect")
//         .attr("class","boyRect")
//         .attr("fill", "#3f8875")
//         .attr("y", y(0))//d["Boys%"]
//         .attr("x", (d)=>{ return x(d["Age"]) + 43;})
//         .attr("width", x.bandwidth() - 125)
//         .attr("height", y(0) - y(0))//d["Boys%"]
//         .style("stroke","black");
        
//     boysG
//         .selectAll("text")
//         .data(data)
//         .enter()
//         .append("text")
//         .style("font-weight","bold")
//         .style("font-size","23px")
//         .style("opacity",0)
//         .attr("y", y(0) - 15)//+d["BoysCI"].substring(4,6)
//         .attr("x", (d)=>{ return x(d["Age"]) + 46;})
//         .text((d)=>{return d["Boys%"];});
        
//     boysG
//         .selectAll(".bottomLines")
//         .data(data)
//         .enter()
//         .append("line")
//         .attr("class","bottomLines")
//         .style("stroke","black")
//         .style("stroke-width","2px")
//         .attr("y1",y(0))//+d["BoysCI"].substring(0,2)
//         .attr("x1",(d)=>{ return (x(d["Age"])+ 65) + 12})
//         .attr("y2", y(0))//+d["BoysCI"].substring(0,2)
//         .attr("x2",(d)=>{ return (x(d["Age"])+ 65) - 12});
        
//     boysG
//         .selectAll(".middleLines")
//         .data(data)
//         .enter()
//         .append("line")
//         .attr("class","middleLines")
//         .style("stroke","black")
//         .style("stroke-width","2px")
//         .attr("y1",y(0))//+d["BoysCI"].substring(0,2)
//         .attr("x1",(d)=>{ return x(d["Age"])+ 65})
//         .attr("y2",y(0))//+d["BoysCI"].substring(4,6)
//         .attr("x2",(d)=>{ return x(d["Age"])+ 65});
        
//     boysG
//         .selectAll(".topLines")
//         .data(data)
//         .enter()
//         .append("line")
//         .attr("class","topLines")
//         .style("stroke","black")
//         .style("stroke-width","2px")
//         .attr("y1",y(0))//+d["BoysCI"].substring(4,6)
//         .attr("x1",(d)=>{ return (x(d["Age"])+ 65) + 12})
//         .attr("y2",y(0))//+d["BoysCI"].substring(4,6)
//         .attr("x2",(d)=>{ return (x(d["Age"])+ 65) - 12});
        
//     let legendBars = svg.append("g")
//         .attr("class", "legendGBars")
//         .attr("font-family", "sans-serif")
//         .attr("font-size", "25px")
//         .attr("text-anchor", "start")
//         .attr("transform", "translate(-115,0)")
//         .selectAll("g")
//         .data(["Girls","Boys"])
//         .enter().append("g")
//         .attr("transform", function(d, i) { return "translate(" + (width - margin.left + 170) + "," + i * 30 + ")"; });
    
//     legendBars.append("rect")
//         .attr("x", 30)
//         .attr("width", 24)
//         .attr("height", 24)
//         .attr("fill", (d)=> { 
//             if(d == "Girls") 
//                 return "#f9c72a"; 
//             else 
//                 return "#3f8875"; })
//         .style("stroke-width", "0.5px")
//         .style("stroke", "black")
    
//     legendBars.append("text")
//         .attr("x", 59)
//         .attr("y", 9.5)
//         .attr("dy", "0.4em")
//         .text((d)=> { return d; });
// });
d3.csv("./src/data/Country_SMU_Data.csv").then(function(data){
    let dataOrderValue = 0;
    let collapsedToggle = true;
     var lastCountry = data.filter(function(d) {
        return d["Country"] == "Wales";
    });
    var blankSpacing = { "Country": "", "Girls Intensive 11 Year Old (%)":0 ,"Boys Intensive 11 Year Old (%)":0,"Girls Intensive 13 Year Old (%)":0,"Boys Intensive 13 Year Old (%)":0,"Girls Intensive 15 Year Old (%)":0,"Boys Intensive 15 Year Old (%)":0,"Girls Problematic 11 Year Old (%)":0,"Boys Problematic 11 Year Old (%)":0,"Girls Problematic 13 Year Old (%)":0,"Boys Problematic 13 Year Old (%)":0,"Girls Problematic 15 Year Old (%)":0,"Boys Problematic 15 Year Old (%)":0 };
    let shortData = data.slice(0, 19).concat(blankSpacing).concat(lastCountry);
    
    let svg = d3.select("#countrySMUFigure");
    
    const margin = {
        top: 40,
        right: 20,
        bottom: 145,
        left: 235
    };
    
    let width = 1170 - margin.left - margin.right;
    let height = 870 - margin.top - margin.bottom;
    
    svg = svg
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 1490 750")
        .append("g")
        .attr("id", "graphG")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    
    let y = d3.scaleBand()
        .range([0, height])
        .padding(0.3);
    
    let x = d3.scaleLinear()
        .range([0, width - margin.right]);
        
    svg.append("g")
        .attr("class", "y-axis");
    
    svg.append("g")
        .attr("class", "x-axis");
    
    let yAxisTitle = svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -5 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size","21px")
        .attr("class", "y-axis-title")
    
    x.domain([0, 70]);
    
    y.domain(shortData.map((d)=> {
            return d["Country"];
    }));
    
    var xAxis = svg.select(".x-axis").attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    
    xAxis
        .selectAll(".tick line")
        .attr("transform", "rotate(-180)")
        .attr('y2', height);
    
    xAxis
        .selectAll(".tick text")
        .style("font-size", "20px")
        .attr("y", 10);
    
    yAxisTitle
        .transition()
        .duration(600)
        .text(function() {
            if (language == "en") {
                return "Countries";
            }
            else {
                return "Des pays";
            }
        });
    
    svg.select(".y-axis")
        .transition()
        .duration(600)
        .call(d3.axisLeft(y))
        .selectAll(".tick text")
        .style("font-size", "20.5px")
        .style("font-weight", (d)=>{
            if(d == "Canada"){
                return "bold";
            } else
                return "normal";
        })
        .style("fill", (d)=>{
            if(d == "Canada")
                return "red";
            else
                return "black";
        })
        .text(function(d) {
            return d;
        })
    
    svg.append("g")
        .attr("class","gGirls")
        .selectAll("rect")
        .data(shortData)
        .enter()
        .append("rect")
        .attr("class","girlRect")
        .attr("fill", "#8c96c6")
        .attr("y", (d)=>{ return y(d["Country"])})
        .attr("x", x(0))
        .attr("width", (d)=> { 
            if(d["Country"] == "")
                return 0;
            return x(Number(d["Girls Intensive 11 Year Old (%)"])) - 5;})
        .attr("height", y.bandwidth() - 12);
    
    svg.append("g")
        .attr("class","gBoys")
        .selectAll("rect")
        .data(shortData)
        .enter()
        .append("rect")
        .attr("class","boyRect")
        .attr("fill", "#88419d")
        .attr("y", (d)=> { return y(d["Country"]) + 10; })
        .attr("x", x(0))
        .attr("width", (d)=> { 
            if(d["Country"] == "")
                return 0;
            return x(Number(d["Boys Intensive 11 Year Old (%)"])) - 5; })
        .attr("height", y.bandwidth() - 12);
    
    let legendBars = svg.append("g")
        .attr("class", "legendGBars")
        .attr("font-family", "sans-serif")
        .attr("font-size", "22px")
        .attr("text-anchor", "start")
        .attr("transform", "translate(-115,0)")
        .selectAll("g")
        .data(["Girls","Boys"])
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + (width - margin.left + 170) + "," + i * 30 + ")"; });
    
    legendBars.append("rect")
        .attr("x", 30)
        .attr("width", 24)
        .attr("height", 24)
        .attr("fill", (d)=> { 
            if(d == "Girls") 
                return "#8c96c6"; 
            else 
                return "#88419d"; })
        .style("stroke-width", "0.5px")
        .style("stroke", "black")
    
    legendBars.append("text")
        .attr("x", 59)
        .attr("y", 9.5)
        .attr("dy", "0.4em")
        .text((d)=> { return d; });
        
     //Adding seperator lines
    svg.select(".y-axis")
        .append("g")
        .style("cursor", "pointer")
        .append("line")
        .attr("class", "seperators")
        .attr("x1", -13)
        .attr("x2", 13)
        .attr("y1", 635)
        .attr("y2", 630)
        .attr("stroke", "black")
        .attr("stroke-width", "1.5px")
        .on("click", function() {
            collapsedToggle = !collapsedToggle;
            d3.select(".dropdown").dispatch('change');
        });

    var _seperator = svg.select(".y-axis")
        .append("g")
        .style("cursor", "pointer")
        .on("click", function() {
            collapsedToggle = !collapsedToggle;
            d3.select(".dropdown").dispatch('change');
        });

    _seperator.append("circle")
        .attr("cx", 0)
        .attr("cy", 640)
        .attr("r", 15)
        .attr("width", 26)
        .attr("height", 15)
        .attr("fill", "#cccccc")
        .style("opacity", 0);

    _seperator.append("line")
        .attr("class", "seperators")
        .attr("x1", -13)
        .attr("x2", 13)
        .attr("y1", 630)
        .attr("y2", 625)
        .attr("stroke", "black")
        .attr("stroke-width", "1.5px");
        
    $(".dropdown").on("change", () => {
        d3.selectAll(".seperators")
            .transition()
            .duration(500)
            .style("opacity",(!collapsedToggle ? 0 : 1));
        updateCountrySMUFigure((!collapsedToggle ? data : shortData), d3.select("#SMUOption").property("value"), d3.select("#SMUAge").property("value"));
    });
    
    $("#dataOrderBtn").on("click",() => {
        dataOrderValue = (dataOrderValue == 2 ? 0 :dataOrderValue + 1);
        updateCountrySMUFigure((!collapsedToggle ? data : shortData), d3.select("#SMUOption").property("value"), d3.select("#SMUAge").property("value"));
    });
    
    $("#showBtn").on("click",() => {
        collapsedToggle = !collapsedToggle;
        d3.selectAll(".seperators")
            .transition()
            .duration(500)
            .style("opacity",(!collapsedToggle ? 0 : 1));
        updateCountrySMUFigure((!collapsedToggle ? data : shortData), d3.select("#SMUOption").property("value"), d3.select("#SMUAge").property("value"));
    });
    function updateCountrySMUFigure(newData, measure, measure2) {
        switch(dataOrderValue){
            case 0:
                newData.sort((a,b)=>{
                    if(a["Country"] !== "" && b["Country"] !== "" && 
                    (!collapsedToggle ? true:(a["Country"] !== "Wales" && b["Country"] !== "Wales")))
                        return a["Country"].localeCompare(b["Country"]);
                });
                $("#dataOrderBtn").text("Alphabetical");
                break;
            case 1:
                newData.sort((a,b)=>{
                    if(a["Country"] !== "" && b["Country"] !== "" && 
                    (!collapsedToggle ? true:(a["Country"] !== "Wales" && b["Country"] !== "Wales")))
                        return Number(b["Girls "+measure+""+measure2.replace("Aged","")+" Year Old (%)"])  - Number(a["Girls "+measure+""+measure2.replace("Aged","")+" Year Old (%)"]);
                });
                $("#dataOrderBtn").text("Hightest Girls");
                break;
            case 2:
                newData.sort((a,b)=>{
                    if(a["Country"] !== "" && b["Country"] !== "" && 
                    (!collapsedToggle ? true:(a["Country"] !== "Wales" && b["Country"] !== "Wales")))
                        return Number(b["Boys "+measure+""+measure2.replace("Aged","")+" Year Old (%)"]) - Number(a["Boys "+measure+""+measure2.replace("Aged","")+" Year Old (%)"]);
                });
                $("#dataOrderBtn").text("Highest Boys");
                break;
        }
        let svg = d3.select("#countrySMUFigure");
    
        x.domain([0, 70]);
    
        let xAxis = svg.select(".x-axis")
            .transition()
            .duration(600)
            .call(d3.axisBottom(x));
    
        xAxis.selectAll(".tick line")
            .attr("transform", "rotate(-180)")
            .attr('y2', height);
    
        xAxis.selectAll(".tick text")
            .style("font-size", "20px")
            .attr("y", 10);
    
        y.domain(newData.map((d)=> {
            return d["Country"];
        }));
    
        svg.select(".y-axis")
            .transition()
            .duration(600)
            .call(d3.axisLeft(y))
            .selectAll("text")
            .style("font-size", (!collapsedToggle ? "17px" : "20.5px"))
            .text((d)=> {
                if (language == "en")
                    return d;
                else
                    return d;
            });
    
        svg.select(".y-axis")
            .selectAll("text")
            .style("font-size", (!collapsedToggle ? "17px" : "20.5px"));
        try{
            svg.select(".gGirls")
                .selectAll("rect")
                .data(newData)
                .join( 
                    enter => enter.append("rect")
                        .attr("width", 0)
                        .attr("x", x(0))
                        .attr("y", (d)=>{ return y(d["Country"])})
                        .attr("height", y.bandwidth() - (!collapsedToggle ? 6.5 : 12))
                        .attr("class","girlRect")
                        .transition()
                        .duration(600)
                        .attr("fill", "#8c96c6")
                        .attr("width", (d)=> { 
                            if(d["Country"] == "")
                                return 0;
                            return x(Number(d["Girls "+measure+""+measure2.replace("Aged","")+" Year Old (%)"])) - 5;}),
                    
                    update => update
                        .transition()
                        .duration(600)
                        .attr("y", (d)=> { return y(d["Country"]);})
                        .attr("width", (d)=> { 
                            if(d["Country"] == "")
                                    return 0;
                            return x(Number(d["Girls "+measure+""+measure2.replace("Aged","")+" Year Old (%)"])) - 5;})
                        .attr("height", y.bandwidth() - (!collapsedToggle ? 6.5 : 12)),
                    
                    exit => exit
                        .transition()
                        .duration(600)
                        .attr("width",0)
                        .style("opacity",0)
                        .remove()
                );
        }
        catch(e){
            console.log(e);
        }
        try{
            svg.select(".gBoys")
            .selectAll("rect")
            .data(newData)
            .join( 
                enter => enter.append("rect")
                    .attr("width", 0)
                    .attr("x", x(0))
                    .attr("y", (d)=>{ return y(d["Country"]) + (!collapsedToggle ? 4.4 : 10)})
                    .attr("height", y.bandwidth() - (!collapsedToggle ? 6.5 : 12))
                    .attr("class","boyRect")
                    .transition()
                    .duration(600)
                    .attr("fill", "#88419d")
                    .attr("width", (d)=> { 
                        if(d["Country"] == "")
                            return 0;
                        return x(Number(d["Boys "+measure+""+measure2.replace("Aged","")+" Year Old (%)"])) - 5;}),
                
                update => update
                    .transition()
                    .duration(600)
                    .attr("y", (d)=> { return y(d["Country"]) + (!collapsedToggle ? 4.4 : 10);})
                    .attr("width", (d)=> { 
                        if(d["Country"] == "")
                                return 0;
                        return x(Number(d["Boys "+measure+""+measure2.replace("Aged","")+" Year Old (%)"])) - 5;})
                    .attr("height", y.bandwidth() - (!collapsedToggle ? 6.5 : 12)),
                
                exit => exit
                    .transition()
                    .duration(600)
                    .attr("width",0)
                    .style("opacity",0)
                    .remove()
            );
        }
        catch(e){
            console.log(e);
        }
    }
});

function updateProgress(num1, num2){
  let percent = Math.ceil( num1 / num2 * 100 );
  if(percent >= 8)
    d3.select(".bookmark1").style("border","0.1875em solid #DB4437");
  else
    d3.select(".bookmark1").style("border","0.1875em solid #0F1C3F");
  	if(percent >= 35)
    	d3.select(".bookmark2").style("border","0.1875em solid #DB4437");
  else
    d3.select(".bookmark2").style("border","0.1875em solid #0F1C3F");
    if(percent >= 58)
    	d3.select(".bookmark3").style("border","0.1875em solid #DB4437");
  else
    d3.select(".bookmark3").style("border","0.1875em solid #0F1C3F");
    if(percent >= 82)
    	d3.select(".bookmark4").style("border","0.1875em solid #DB4437");
  else
    d3.select(".bookmark4").style("border","0.1875em solid #0F1C3F");

}

let section1scrolly = d3.select("#section1-scrolly");
let section1Figure = section1scrolly.select("figure");

let figure1Scrolly = d3.select("#figure1-scrolly");
// let figure1Figure = figure1Scrolly.select("figure");

let section2Scrolly = d3.select("#section2-scrolly");
let section2Figure = section2Scrolly.select("figure");

let figure2Scrolly = d3.select("#figure2-scrolly");
// let figure2Figure = figure2Scrolly.select("figure");

let section3Scrolly = d3.select("#section3-scrolly");
let section3Figure = section3Scrolly.select("figure");

let section4Scrolly = d3.select("#section4-scrolly");
let section4Figure = section4Scrolly.select("figure");

// initialize the scrollama for each scrolly section
let section1Scroller = scrollama();
let figure1Scroller = scrollama();
let section2Scroller = scrollama();
let figure2Scroller = scrollama();
let section3Scroller = scrollama();
let section4Scroller = scrollama();

// generic window resize listener event
function handleResize() {
	// 1. update height of step elements
	let stepH = Math.floor(window.innerHeight * 0.75);
    // 	step.style("height", stepH + "px");

	let figureHeight = window.innerHeight / 3;
	let figureMarginTop = (window.innerHeight - figureHeight - 800) / 64;

	section1Figure
		.style("height", figureHeight + "px")
		.style("top", figureMarginTop + "px");
		
	section2Figure
		.style("height", figureHeight - 100 + "px")
		.style("top", figureMarginTop + "px");
		
	section3Figure
		.style("height", figureHeight - 100 + "px")
		.style("top", figureMarginTop + "px");
		
	section4Figure
		.style("height", figureHeight - 100 + "px")
		.style("top", figureMarginTop + "px");
	
	// 3. tell scrollama to update new element dimensions
    section1Scroller.resize();
    figure1Scroller.resize();
    section2Scroller.resize();
    figure2Scroller.resize();
    section3Scroller.resize();
    section4Scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
 	if(response.element.className.includes("figure"))
 	    updateGraph(response.element.className,response.index);
 	else if(response.element.className.includes("numTransition")){
 	    if(response.element.innerHTML == "0" || response.element.innerHTML == "0%")
     	    d3.select(response.element)
     	        .text(0)
     	        .transition()
     	        .duration(2500)
                .tween("text", ()=> {
                    let item = d3.select(response.element);
                    let i = d3.interpolateNumber(0,parseFloat(response.element.id.replace("%","")));
                    return function(t){
                        if(response.element.id.includes("%"))
                            item.text(d3.format(".0f")(i(t)) + "%"); 
                        else if(parseFloat(response.element.id) >= 1000)
                            item.text(d3.format(",.2r")(i(t)));
                        else
                            item.text(d3.format(".0f")(i(t))); 
                    }
                });
}
}
//change opacity for text message animation
function handleStepProgress(response){
    d3.select(response.element).style("opacity",response.progress);
}

function init() {
	// 1. force a resize on load to ensure proper dimensions are sent to scrollama
	handleResize();
	// 2. setup the scroller passing options
	// 		this will also initialize trigger observations
	// 3. bind scrollama event handlers (this can be chained like below)
	section1Scroller
		.setup({
			step: "#section1-scrolly article .step",
			progress:true,
			offset: 0.75,
			debug: false
		})
		.onStepEnter(handleStepEnter)
 		.onStepProgress(handleStepProgress);
 		
 	figure1Scroller.setup({
			step: "#figure1-scrolly article .figure1-step",
			progress:true,
			offset: 0.4,
			debug: false
		})
		.onStepEnter(handleStepEnter);
		
	section2Scroller.setup({
			step: "#section2-scrolly article .section2-step",
			progress:true,
			offset: 0.8,
			debug: false
		})
		.onStepEnter(handleStepEnter);
		
	figure2Scroller.setup({
			step: "#figure2-scrolly article .figure2-step",
			progress:true,
			offset: 0.4,
			debug: false
		})
		.onStepEnter(handleStepEnter);
		
	section3Scroller.setup({
			step: "#section3-scrolly article .section3-step",
			progress:true,
			offset: 0.8,
			debug: false
		})
		.onStepEnter(handleStepEnter);
	
	section4Scroller.setup({
			step: "#section4-scrolly article",
			progress:true,
			offset: 0.33,
			debug: false
		})
		.onStepEnter(handleStepEnter);
}

function updateGraph(graph,step){
    let graph1Bool = (graph == "figure1-step");
    //deep copy of data
    // JSON.parse(JSON.stringify(d));
    //shallow copy of data
    let data = (graph1Bool ? intensiveData:problematicData).map((d)=>{
        return Object.assign({}, d);
    });
    
    for(let i = step + 1; i <= 5; i++){
        data[i]["Girls%"] = 0;
        data[i]["GirlsLowerCI"] = 0;
        data[i]["GirlsUpperCI"] = 0;
        data[i]["Boys%"] = 0;
        data[i]["BoysLowerCI"] = 0;
        data[i]["BoysUpperCI"] = 0;
    }

    let svg = d3.select(graph1Bool ? "#intensiveFigure":"#problematicFigure").select("#graphG");

    const margin = {
        top: 30,
        right: 20,
        bottom: 80,
        left: 90
    };
    
    let width = 1100 - margin.left - margin.right;
    let height = 670 - margin.top - margin.bottom;
    let y;
    let x;
    if(graph1Bool){
        y = d3.scaleLinear()
            .range([height, 0]);
        
        x = d3.scaleBand()
            .range([0, width]);
        
        x.domain(data.map((d)=> {
            return d["Age"];
        }));
        
        y.domain([0, 50]);
    }
    else{
        x = d3.scaleLinear()
            .range([0, width]);
    
        y = d3.scaleBand()
            .range([0, height]);
        
        y.domain(data.map((d)=> {
            return d["Age"];
        }));
        
        x.domain([0, 13]);
    }
        
    let girlsG = svg.select(".gGirls");
    let boysG = svg.select(".gBoys");
    if(graph1Bool){
        girlsG   
            .selectAll("rect")
            .data(data)
            .transition()
            .duration(600)
            .attr("y", (d)=> { return y(d["Girls%"]);})
            .attr("height", (d)=> { return y(0) - y(d["Girls%"]);});
            
        girlsG
            .selectAll("text")
            .data(data)
            .transition()
            .duration(600)
            .attr("y", (d)=> { return y(+d["GirlsUpperCI"]) - 10;})
            .style("opacity",(d)=>{
                if(d["Girls%"] !== 0)
                    return 1
                return 0;    
            })
            .tween("text", (d)=> {
                let item = d3.select(this);
                item.property("previousValue",d["Girls%"]);
                let i = d3.interpolateNumber(item.property("previousValue"), d["Girls%"]);
                return function(t) { item.text(d3.format(".1f")(i(t))); };
            });
        
        girlsG
            .selectAll(".bottomLines")
            .data(data)
            .transition()
            .duration(600)
            .attr("y1",(d)=>{ return y(+d["GirlsLowerCI"])})
            .attr("x1",(d)=>{ return (x(d["Age"])+ 103) + 12})
            .attr("y2",(d)=>{ return y(+d["GirlsLowerCI"])})
            .attr("x2",(d)=>{ return (x(d["Age"])+ 103) - 12});
            
        girlsG
            .selectAll(".middleLines")
            .data(data)
            .transition()
            .duration(600)
            .attr("y1",(d)=>{ return y(+d["GirlsLowerCI"])})
            .attr("x1",(d)=>{ return x(d["Age"])+ 103})
            .attr("y2",(d)=>{ return y(+d["GirlsUpperCI"])})
            .attr("x2",(d)=>{ return x(d["Age"])+ 103});
            
        girlsG
            .selectAll(".topLines")
            .data(data)
            .transition()
            .duration(600)
            .attr("y1",(d)=>{ return y(+d["GirlsUpperCI"])})
            .attr("x1",(d)=>{ return (x(d["Age"])+ 103) + 12})
            .attr("y2",(d)=>{ return y(+d["GirlsUpperCI"])})
            .attr("x2",(d)=>{ return (x(d["Age"])+ 103) - 12});
            
        boysG
            .selectAll("rect")
            .data(data)
            .transition()
            .duration(600)
            .attr("y", (d)=> { return y(d["Boys%"]);})
            .attr("height", (d)=> { return y(0) - y(d["Boys%"]);});
            
        boysG
            .selectAll("text")
            .data(data)
            .transition()
            .duration(600)
            .attr("y", (d)=> { return y(+d["BoysUpperCI"]) - 15;})
            .style("opacity",(d)=>{
                if(d["Boys%"] !== 0)
                    return 1
                return 0;    
            })
            .tween("text", (d)=> {
                let item = d3.select(this);
                item.property("previousValue",d["Boys%"]);
                let i = d3.interpolateNumber(item.property("previousValue"), d["Boys%"]);
                return function(t) { item.text(d3.format(".1f")(i(t))); };
            });
            
        boysG
            .selectAll(".bottomLines")
            .data(data)
            .transition()
            .duration(600)
            .attr("y1",(d)=>{ return y(+d["BoysLowerCI"])})
            .attr("x1",(d)=>{ return (x(d["Age"])+ 65) + 12})
            .attr("y2",(d)=>{ return y(+d["BoysLowerCI"])})
            .attr("x2",(d)=>{ return (x(d["Age"])+ 65) - 12});
            
        boysG
            .selectAll(".middleLines")
            .data(data)
            .transition()
            .duration(600)
            .attr("y1",(d)=>{ return y(+d["BoysLowerCI"])})
            .attr("x1",(d)=>{ return x(d["Age"])+ 65})
            .attr("y2",(d)=>{ return y(+d["BoysUpperCI"])})
            .attr("x2",(d)=>{ return x(d["Age"])+ 65});
            
        boysG
            .selectAll(".topLines")
            .data(data)
            .transition()
            .duration(600)
            .attr("y1",(d)=>{ return y(+d["BoysUpperCI"])})
            .attr("x1",(d)=>{ return (x(d["Age"])+ 65) + 12})
            .attr("y2",(d)=>{ return y(+d["BoysUpperCI"])})
            .attr("x2",(d)=>{ return (x(d["Age"])+ 65) - 12});
    }
    else {
        girlsG   
            .selectAll("rect")
            .data(data)
            .transition()
            .duration(600)
            .attr("y",(d)=>{ 
                return y(d["Age"]) + 23;
            })
            .attr("x", x(0))
            .attr("width", (d)=>{ return x(d["Girls%"])})
            
        girlsG
            .selectAll("text")
            .data(data)
            .transition()
            .duration(600)
            .attr("x", (d)=> { return x(+d["GirlsUpperCI"]) + 8;})
            .style("opacity",(d)=>{
                if(d["Girls%"] !== 0)
                    return 1
                return 0;    
            })
            .tween("text", (d)=> {
                let item = d3.select(this);
                item.property("previousValue",d["Girls%"]);
                let i = d3.interpolateNumber(item.property("previousValue"), d["Girls%"]);
                return function(t) { item.text(d3.format(".1f")(i(t))); };
            });
        
        girlsG
            .selectAll(".bottomLines")
            .data(data)
            .transition()
            .duration(600)
            .attr("y1",(d)=>{ return (y(d["Age"])+ 35) + 12})
            .attr("x1",(d)=>{ return x(d["GirlsLowerCI"])})
            .attr("y2",(d)=>{ return (y(d["Age"])+ 35) - 12})
            .attr("x2",(d)=>{ return x(d["GirlsLowerCI"])});
            
        girlsG
            .selectAll(".middleLines")
            .data(data)
            .transition()
            .duration(600)
            .attr("y1",(d)=>{ return y(d["Age"])+ 35})
            .attr("x1",(d)=>{ return x(d["GirlsLowerCI"])})
            .attr("y2",(d)=>{ return y(d["Age"])+ 35})
            .attr("x2",(d)=>{ return x(d["GirlsUpperCI"])});
            
        girlsG
            .selectAll(".topLines")
            .data(data)
            .transition()
            .duration(600)
            .attr("y1",(d)=>{ return (y(d["Age"])+ 35) + 12})
            .attr("x1",(d)=>{ return x(d["GirlsUpperCI"])})
            .attr("y2",(d)=>{ return (y(d["Age"])+ 35) - 12})
            .attr("x2",(d)=>{ return x(d["GirlsUpperCI"])});
        
        boysG
            .selectAll("rect")
            .data(data)
            .transition()
            .duration(600)
            .attr("y",(d)=>{ 
            return y(d["Age"]) + 47;
            })
            .attr("x", x(0))
            .attr("width", (d)=>{ return x(d["Boys%"])});
            
        boysG
            .selectAll("text")
            .data(data)
            .transition()
            .duration(600)
            .attr("x", (d)=> { return x(+d["BoysUpperCI"]) + 8;})
            .style("opacity",(d)=>{
                if(d["Boys%"] !== 0)
                    return 1
                return 0;    
            })
            .tween("text", (d)=> {
                let item = d3.select(this);
                item.property("previousValue",d["Boys%"]);
                let i = d3.interpolateNumber(item.property("previousValue"), d["Boys%"]);
                return function(t) { item.text(d3.format(".1f")(i(t))); };
            });
            
        boysG
            .selectAll(".bottomLines")
            .data(data)
            .transition()
            .duration(600)
            .attr("y1",(d)=>{ return (y(d["Age"])+ 59) + 12})
            .attr("x1",(d)=>{ return x(d["BoysLowerCI"])})
            .attr("y2",(d)=>{ return (y(d["Age"])+ 59) - 12})
            .attr("x2",(d)=>{ return x(d["BoysLowerCI"])});
            
        boysG
            .selectAll(".middleLines")
            .data(data)
            .transition()
            .duration(600)
            .attr("y1",(d)=>{ return y(d["Age"])+ 59})
            .attr("x1",(d)=>{ return x(d["BoysLowerCI"])})
            .attr("y2",(d)=>{ return y(d["Age"])+ 59})
            .attr("x2",(d)=>{ return x(d["BoysUpperCI"])});
            
        boysG
            .selectAll(".topLines")
            .data(data)
            .transition()
            .duration(600)
            .attr("y1",(d)=>{ return (y(d["Age"])+ 59) + 12})
            .attr("x1",(d)=>{ return x(d["BoysUpperCI"])})
            .attr("y2",(d)=>{ return (y(d["Age"])+ 59) - 12})
            .attr("x2",(d)=>{ return x(d["BoysUpperCI"])});
    }
}
// kick things off
init();

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
  direction: 'vertical',
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
})

//get scroll value
lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
// console.log({ scroll, limit, velocity, direction, progress })
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

window.onscroll = function () {

    var windowWidth = window.innerWidth;
    var scrollTop = window.pageYOffset;

    var wrap = document.querySelector(".horizontal-section");
    var elWrap = wrap.querySelector(".element-wrapper");

    var horLength = elWrap.scrollWidth;
    var distFromTop = wrap.offsetTop;

    var scrollDistance = distFromTop + horLength - windowWidth;

    wrap.style.height = horLength + "px";

    if (scrollTop >= distFromTop && scrollTop <= scrollDistance) {
        elWrap.style.transform = "translateX(-" + (scrollTop - distFromTop) + "px)";
    }
}