//subsidiary
var subsLineData = [100, 100, 100, 100, 100, 100];

var margin = 815/(subsLineData.length-1);

drawsubsGraph(subsLineData, margin, "#subs-lineCirle-svg")


function drawsubsGraph(data, margin, svgId) {
    var line = d3.line()
        .x(function(d,i){
            return i * (margin-0.05)+10;
        })
        .y(function(d,i){
            return 250 - d/6 - 30;
        })
    
    var lineElements = d3.select(svgId)
        .append("rect")
        .attr("width", 820)
        .attr("height", 2)
        .attr("transform", "translate(0, 4)")
        .style("fill", "rgba(84, 184, 255, 1)")
        .attr("i", line(data))
    
    var circleElements = d3.select(svgId)
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .style("fill", "rgba(84, 184, 255, 1)")
        .attr("cx", function(d,i){   //원은 중심이 cx
           return i * (margin-0.05)+5;
        })
        .attr("cy", function(d,i){
            return 250 - d/5 - 225;
        })
        .attr("r", 5)
        .on("mouseover", function(d,i){
            d3.select(this)
                .style("fill", "rgba(255, 106, 0, 0.8)");
            
        })
    .on("mouseout", function(){
            d3.select(this)
                .style("fill", "rgba(84, 184, 255, 0.9)")
       
    })        
}

//bar-graph
var horizontalBarData = [200, 321, 439, 440, 500];
var domainB = ["2012년", "2013년", "2014년", "2015년", "2016년"];

drawHorizontalBarGraph("#bar-graph-basic", horizontalBarData, domainB);

function drawHorizontalBarGraph(svgId, data, dm) {
    var barElements = d3.select(svgId)
        .selectAll("rect")
        .data(data)
    
    barElements.enter()
        .append("rect")
        .attr("x", 60) // 막대그래프 처음 시작 x좌표
        .attr("y", function(d, i) { //막대그래프별 간격
            return i * 45;
        })
        .attr("width", function(d, i) {
            return d / 2;  //data 값이 너무 작거나 크면 기준값을 바꿔주는 것
        })
        .attr("height", "30px")  //세로 값
        .style("fill", "rgba(84, 184, 255, 1)")
        .on("mouseover", function(d, i) {
            d3.select(this)
              .style("fill", "rgba(255,115,0,0.9)");
        
            barValue.append("text")  //안에 데이터숫자
                .attr("x", d /2 + 25)  //안에 데이터숫자 x 배열
                .attr("y", i * 45 + 20) //안에 데이터숫자 y 배열  위에 bar그래프별 간격 곱하기 + 그래프 세로높이
                .attr("class", "label")
                .style("font-size", 13)
                .style("font-weight", 400)
                .style("fill", "#FFFFFF")
                .text(data[i])
            d3.select(this)
                .style("fill", "rgba(255,115,0,0.9)")
        })
    
        .on("mouseout", function() {
            barValue.select(".label").remove();
            d3.select(this)
                .style("fill", "rgba(84, 184, 255, 1)")
        })
    
    barElements.enter()
        .append("text")
        .style("fill" ,"#8C8C8C")  //year-legend color
        .attr("x", 0)
        .attr("y", function(d, i){  //YEAR 간격
            return i * 45 + 20;   // 안에 데이터숫자 y 배열  위에 bar그래프별 간격 곱하기 + 그래프 세로높이 
    })
        .text(function(d, i){
            return dm[i];
    })
    
    var barTitle = d3.select(svgId)
        .append("text")
        .style("text-anchor", "middle")
        .attr("class", "bartitle")
        .attr("transform", "translate(180, 260)") 
        .text("온라인 연간 구매자(십억 명)");
    
    var barValue = d3.select(svgId)
        .append("svg")
        .attr("width", 350)
        .attr("height", 240)
        .attr("class", "barValue")
        .append("g")
}

var horizontalBarData2 = [110, 307, 450, 462, 580];
var domainC = ["2012년", "2013년", "2014년", "2015년", "2016년"];

drawHorizontalBarGraph2("#bar-graph-sec", horizontalBarData2, domainC);

function drawHorizontalBarGraph2(svgId, data, dm) {
    var barElements = d3.select(svgId)
        .selectAll("rect")
        .data(data)
    
    barElements.enter()
        .append("rect")
        .attr("x", 60) // 막대그래프 처음 시작 x좌표
        .attr("y", function(d, i) { //막대그래프별 간격
            return i * 45;
        })
        .attr("width", function(d, i) {
            return d / 2;  //data 값이 너무 작거나 크면 기준값을 바꿔주는 것
        })
        .attr("height", "30px")  //세로 값
        .style("fill", "rgba(84, 184, 255, 1)")
        .on("mouseover", function(d, i) {
            d3.select(this)
              .style("fill", "rgba(255,115,0,0.8)");
        
            barValue.append("text")  //안에 데이터숫자
                .attr("x", d /2 + 25)  //안에 데이터숫자 x 배열
                .attr("y", i * 45 + 20) //안에 데이터숫자 y 배열  위에 bar그래프별 간격 곱하기 + 그래프 세로높이
                .attr("class", "label")
                .style("font-size", 13)
                .style("font-weight", 400)
                .style("fill", "#FFFFFF")
                .text(data[i])
            d3.select(this)
                .style("fill", "rgba(255,115,0,0.8)")
        })
    
        .on("mouseout", function() {
            barValue.select(".label").remove();
            d3.select(this)
                .style("fill", "rgba(84, 184, 255, 1)")
        })
    
    barElements.enter()
        .append("text")
        .style("fill" ,"#8C8C8C")  //year-legend color
        .attr("x", 0)
        .attr("y", function(d, i){  //YEAR 간격
            return i * 45 + 20;   // 안에 데이터숫자 y 배열  위에 bar그래프별 간격 곱하기 + 그래프 세로높이 
    })
        .text(function(d, i){
            return dm[i];
    })
    
    var barTitle = d3.select(svgId)
        .append("text")
        .style("text-anchor", "middle")
        .attr("class", "bartitle")
        .attr("transform", "translate(190, 260)") 
        .text("모바일 연간 구매자(십억 명)");
    
    var barValue = d3.select(svgId)
        .append("svg")
        .attr("width", 500)
        .attr("height", 240)
        .attr("class", "barValue")
        .append("g")
}




//pie-graph-basic

var dataBasic = [26.06, 14.11, 13.23, 9.75, 8.97, 4.94, 22.94];
var domain1 = ["G", "A", "F", "A", "T", "B", "E"];


drawPieGraph("#pie-graph-basic", dataBasic, 50, 130, domain1); 


function drawPieGraph(svgId, data, iRadius, oRadius, dm) {
    var pie = d3.pie().sort(null);
    var arc = d3.arc().innerRadius(iRadius).outerRadius(oRadius); 
    
    var pieElements = d3.select(svgId)
        .selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("class", "pieBasic")
        .attr("d", arc)
        .attr("transform", "translate(200, 200)")
        .style("fill", function(d,i){
            return["#66a1ff", "rgba(255,115,0,0.9)", "#abb8d4", "#ffb84d", "#1069d5", "#f57074", "#e6e6e6"][i];
        })
    
    // mouseover가 되었을 때 data별로 다르게 나오는 것
    .on("mouseover", function(d,i){
        svgText.append("text")
            .attr("dy", ".5em") // dy = 단위 0.5 = 50% 
            .style("text-anchor", "middle") // text의 원점을 중앙으로 바꾸는 것
            .attr("class", "label") //styleSheet에서 스타일 주기
            .attr("font-size", 18)  // 여기에 바로 스타일 주는 방법
            .style("font-weight", 300)
            .style("fill", "#666666")
            .text(dm[i] +":"+data[i]+ "%")
        
        // mouseover된 색은 배경 색을 바꿔줘라
        d3.select(this)
            .style("fill", "rgba(255,255,255, 0.8)") 
    })
    
    // mouseOut 되었을 때 data 사라지는 것
    .on("mouseout", function(d,i){
        svgText.select(".label").remove();
         d3.select(this)
            .style("fill", function(){
            return["#66a1ff", "rgba(255,115,0,0.9)", "#abb8d4", "#ffb84d", "#1069d5", " #f57074", "#e6e6e6"][i]
        })
    })
    
        var svgText = d3.select(svgId)
        .append("svg")  //svg하나를 svg안에 또 넣어서 데이터에 따라 text를 넣어주는 것
        .attr("width", 400)
        .attr("height", 400)
        .attr("class", "pietext")
        .append("g")  // group으로 만들기
        .attr("transform", "translate(200,200)")
    
    
    
    var pieTitle = d3.select(svgId)
        .append("text")
        .style("text-anchor", "middle") // text의 원점을 중앙으로 바꾸는 것
        .attr("class", "pietitle")
        .attr("transform", "translate(200, 385)")
        .text("세계 인터넷 기업 시가규모")   
    
}

//pie-graph-sec

var dataBasic2 = [26.06, 14.11, 13.23, 9.75, 8.97, 4.94, 22.94];
var domain2 = ["392.1", "212.3", "199.0", "146.7", "135.0", "74.3", "E"];


drawPieGraph2("#pie-graph-sec", dataBasic2, 50, 130, domain2); 

function drawPieGraph2(svgId, data, iRadius, oRadius, dm) {
    var pie = d3.pie().sort(null);
    var arc = d3.arc().innerRadius(iRadius).outerRadius(oRadius); 
    
    var pieElements = d3.select(svgId)
        .selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("class", "pieBasic")
        .attr("d", arc)
        .attr("transform", "translate(200, 200)")
        .style("fill", function(d,i){
            return["#66a1ff", "rgba(255,115,0,0.9)", "#abb8d4", "#ffb84d", "#1069d5", " #f57074", "#e6e6e6"][i];
        })
    
    // mouseover가 되었을 때 data별로 다르게 나오는 것
    .on("mouseover", function(d,i){
        svgText.append("text")
            .attr("dy", ".5em") // dy = 단위 0.5 = 50% 
            .style("text-anchor", "middle") // text의 원점을 중앙으로 바꾸는 것
            .attr("class", "label") //styleSheet에서 스타일 주기
            .attr("font-size", 18)  // 여기에 바로 스타일 주는 방법
            .style("font-weight", 300)
            .style("fill", "#666666")
            .text(dm[i] +"$")
        
        // mouseover된 색은 배경 색을 바꿔줘라
        d3.select(this)
            .style("fill", "rgba(255,255,255, 0.8)")
    })
    
    // mouseOut 되었을 때 data 사라지는 것
    .on("mouseout", function(d,i){
        svgText.select(".label").remove();
        
         d3.select(this)
            .style("fill", function(){
            return["#66a1ff", "rgba(255,115,0,0.9)", "#abb8d4", "#ffb84d", "#1069d5", " #f57074", "#e6e6e6"][i]
        })
    })
    
        var svgText = d3.select(svgId)
        .append("svg")  //svg하나를 svg안에 또 넣어서 데이터에 따라 text를 넣어주는 것
        .attr("width", 400)
        .attr("height", 400)
        .attr("class", "pietext")
        .append("g")  // group으로 만들기
        .attr("transform", "translate(200,200)")
    
    
    
    var pieTitle = d3.select(svgId)
        .append("text")
        .style("text-anchor", "middle") // text의 원점을 중앙으로 바꾸는 것
        .attr("class", "pietitle")
        .attr("transform", "translate(200, 385)")
        .text("세계 인터넷기업 시가총액")   
    
}


//pie-graph-thi

var domain3 = ["알리바바", "텐페이", "라카라", "바이두", "기타"];
var dataA = [72.9, 17.4, 3, 2.2, 0.5];
var dataB = [52.3, 33.7, 2.7, 1.1, 10.2];

var color = d3.scaleOrdinal()
    .domain(domain3)
    .range(["rgba(255,115,0,0.8)", "#2a82ef", "#6ed5f7", "#f57074", "#e6e6e6"]);

    
var color2 =  d3.scaleOrdinal()
    .domain(domain3)
    .range(d3.schemeCategory20b);

var pie = d3.pie().sort(null);
var arc = d3.arc().innerRadius(80).outerRadius(160);
var svg = d3.select("#pie-graph-thi")

drawPieGraphTrans(dataB);
d3.selectAll("input").on("change", changed);
function changed() {
    if (this.value === "dataA") {
        drawPieGraphTrans(dataA);
    } else if (this.value === "dataB") {
        drawPieGraphTrans(dataB);
    } 
}

function drawPieGraphTrans(data) {
    var thisData = data;
//    console.log(thisData);
   
    var slice = svg.selectAll("path.slice").data(pie(data));
    slice.enter().append("path")
        .style("fill", function(d, i){return color(i)})
        .attr("class", "slice")
        .attr("transform", "translate(200,200)")
        .on("mouseover", function (d, i) {
            svg.append("text")
                .attr("dy", ".5em")
                .style("text-anchor", "middle")
                .style("font-size", 21)
                .style("font-weight", 300)
                .attr("class","label")
                .attr("transform", "translate(200,200)")
                .style("fill", function(d,i){return "#8C8C8C";})
                .text(domain3[i]+": "+d.data+"%");
                console.log(d);

            d3.select(this)
                  .style("fill", "#ffffff");
        }).on("mouseout", function (d, i) {
            svg.select(".label").remove();
            d3.select(this).style("fill", function(){return color(i)})
        });
    
    slice = svg.selectAll("path.slice").data(pie(data));
        
    slice.transition().duration(500)
//        .delay(function(d, i){return i*10;})
        .ease(d3.easeElastic)
        .attrTween("d", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                return arc(interpolate(t));
            };
        });
    
    slice.exit().remove();
}





//linegraph


var firstLineData = [118.1, 81.8, 45.9, 50.0, 46.9, 62.2];
var secondLineData = [36.3, 68.2, 500.0, 391.3, 103.5, 216.4];

var firstXName = ["2011", "2012", "2013", "2014", "2015", "2016", "2017"];

var secondXName = ["2011", "2012", "2013", "2014", "2015", "2016", "2017"];


var margin = 700/(firstLineData.length-0.5);
var margin = 700/(secondLineData.length-0.5);

drawLineGraph(firstLineData, margin, "#first-line-graph-svg", "line-colorA", "dot-colorA")
drawLineGraph(secondLineData, margin,"#first-line-graph-svg", "line-colorB", "dot-colorB")

drawScale(firstXName, margin, "#first-line-graph-svg")
drawScale(secondXName, margin, "#first-line-graph-svg")

function drawLineGraph(data, margin, svgId, className, className2) {
    
    var line = d3.line()
        .x(function(d,i){
            return i * (margin-0.05)+50;
        })
        .y(function(d,i){
            return 250 - d/5 - 10;
        })
    
    var lineElements = d3.select(svgId)
        .append("path")
        .attr("class", className)
        .attr("d", line(data))
    
    var circleElements = d3.select(svgId)
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", className2)
        .attr("cx", function(d,i){   //원은 중심이 cx
           return i * (margin-0.05)+50;
        })
        .attr("cy", function(d,i){
            return 250 - d/5 - 10;
        })
        .attr("r", 5)
        .on("mouseover", function(d,i){
            d3.select(this)
                .attr("class", className2)
        
            
            lineValue.append("text")
                .attr("x", i * (margin-0.05)+50)
                .attr("y", 300-data[i]/5-70)
                .attr("class", className2)
                .style("font-size", 15)
                .style("font-weight", 500)
//                .attr("fill", "#e87aa9")
                .text(data[i]+"%")
        })
        .on("mouseout", function(d,i){
            d3.select(this)
                .attr("class", className2)
            
            lineValue.select(".dot-colorA").remove();
            lineValue.select(".dot-colorB").remove();//어찌해야하는 지 원
        })
    
    var lineValue = d3.select(svgId)
        .append("svg")
        .attr("width", 750)
        .attr("height", 300)
        .append("g")
   
    }

function drawScale(data, margin, svgId){
    var yScale = d3.scaleLinear()
        .domain([30, 500])
        .range([10*20, -50])
    
    
    d3.select(svgId)
        .append("rect")
        .attr("class", "axis")
        .attr("width", 600)
        .attr("height", 0.2)
        .attr("transform", "translate(30, 270)")
    
    var textElements = d3.select(svgId)
        .selectAll("rect")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "lineXName")
        .attr("x", function(d,i) {
            return (i-1)*(margin-1)+50;
        })
        .attr("y", 285)
        .text(function(d,i){
            return data[i-1];
        })
}





