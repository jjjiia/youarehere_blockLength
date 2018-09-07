//*******************************************************************
//  CREATE MATRIX AND MAP
//*******************************************************************
d3.csv(csv, function (error, data) {
var distanceOnly = distanceOnlyArray(data)
drawLines(distanceOnly)
})


function distanceOnlyArray(data){
	console.log(data)
	var outputArray = []
	var sum = 0
	for(var row in data){
		//console.log(data[row].distance)
		sum = sum+parseFloat(data[row].distance)
		outputArray.push([parseFloat(data[row].distance),data[row].street])
	}
	average = sum/outputArray.length
	console.log(average)
	d3.select("#streetname").html("average street length:"+average + "km  or "+average*1000+"m</br>"+"total:"+sum+"km")
	return outputArray.sort().reverse()
}

function drawLines(data){
	//console.log(data)
	var width = 3000,
	height = 900,
    barHeight = 20;

	var x = d3.scale.linear()
		.domain([0,1])
	    .range([0,300]);
	var y = d3.scale.linear()
	.domain([0,10000])
	.range([0,1000])
	var chart = d3.select("#container").append("svg")
	    .attr("width", width)
		.attr("height", height);
//	console.log(d3.max(data, function(d) { return d; })	)
	
//    x.domain([0, d3.max(data, function(d) { return d; })]);
  var startX = width/2;
  var startY = height/2;
	
  var bar = chart.selectAll("g")
        .data(data)
      	.enter().append("g")
       // .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
        .attr("width", function(d,i) {
			return 1 
			var wDirection = i%2
			if(wDirection == 0){
				return x(d); 
			}
			else{
				return 1
			}
		})
        .attr("height", function(d,i) { 
			var hDirection = i%2
			return x(d[0])
			if(hDirection == 1){
				return x(d); 
			}
			else{
				return 1
			}
		})
        .attr("x", function(d,i) {
			return y(i)+20
			if( i == 0){
				return startX
			}
			var direction = i%4
			
			if(direction == 0){
				startX = startX+0
			}
			else if(direction == 1){
				startX = startX+x(data[i-1])
			}
			else if(direction == 2){
				startX = startX+0-x(d)
			}
			else if(direction == 3){
				startX = startX
			}
			//console.log(startX,startY)
			return startX
			return x(d[i-1].distance);
		})
        .attr("y",function(d,i) {
			return 300-x(d[0])
			if( i == 0){
				return startY
			}
			var direction = i%4
			
			if(direction == 0){
				startY = startY
			}
			else if(direction == 1){
				startY = startY+0
			}
			else if(direction == 2){
				startY = startY+x(data[i-1])
			}
			else if(direction == 3){
				startY = startY+0-x(d)
			}
			//console.log(x(d))
			return startY
		})
		.on("mouseover", function(d,i){ d3.select("#streetname").html(d[1]); console.log(d[1])})

   // bar.append("text")
   //     .attr("x", function(d) { return x(d) - 3; })
   //     .attr("y", barHeight / 2)
   //     .attr("dy", ".35em")
   //     .text(function(d) { return d; });
}