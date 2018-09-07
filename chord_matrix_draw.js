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
	for(var row in data){
		//console.log(data[row].distance)
		outputArray.push(parseFloat(data[row].distance))
	}
	return outputArray.reverse()
}

function drawLines(data){
	//console.log(data)
	var width = 900,
	height = 900,
	    barHeight = 20;

	var x = d3.scale.linear()
		//.domain([0,.5])
	    .range([0,100]);

	var chart = d3.select("#container").append("svg")
	    .attr("width", width)
		.attr("height", height);
	console.log(d3.max(data, function(d) { return d; })	)
	
    x.domain([0, d3.max(data, function(d) { return d; })]);
	  var startX = width/2;
	  var startY = height/2;
	
    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
       // .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
        .attr("width", function(d,i) { 
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
			if(hDirection == 1){
				return x(d); 
			}
			else{
				return 1
			}
		})
        .attr("x", function(d,i) {
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
		.transition()
		.delay(function(d,i){return i * 100})

   // bar.append("text")
   //     .attr("x", function(d) { return x(d) - 3; })
   //     .attr("y", barHeight / 2)
   //     .attr("dy", ".35em")
   //     .text(function(d) { return d; });
}