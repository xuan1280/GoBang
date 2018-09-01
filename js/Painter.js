function Painter() {
	var canvas = document.getElementById("checkerboard");
	var ctx = canvas.getContext("2d");
	var getMousePos = function(e){
		var rect = canvas.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,//相對於Canvas左上角的X座標
			y: e.clientY - rect.top,//相對於Canvas左上角的Y座標
			rectLeft : rect.left,
			rectTop : rect.top,
			clientX : e.clientX,
			clientY : e.clientY
		}
	};
	canvas.addEventListener('mousemove', function(e){
		var pos = getMousePos(e);
		ctx.font = "5px Arial";
		var x = Math.ceil(pos.x / 30), y = Math.ceil(pos.y / 30);
		var coordinate = "座標值: (" + x + "," + y + ")";
    	document.getElementById("site").innerHTML = coordinate;
	});
	this.drawCheckerBoard = function(){
		var startX = 15, startY = 15;
		var spacing = 14; 
		var dx = 30, dy = 30;
		ctx.strokeStyle="#000000";
		ctx.lineWidth = 2;
		// 畫直線
		for (i = 0; i <= spacing; i++) {
			ctx.beginPath();
			ctx.moveTo(startX + (i * dx), startY);
			ctx.lineTo(startX + (i * dx), startY + spacing * dy);
			ctx.stroke();
		}
		// 畫橫線
		for (j = 0; j <= spacing; j++) {
			ctx.beginPath();
			ctx.moveTo(startX, startY + (j * dy));
			ctx.lineTo(startX + spacing * dx, startY + (j * dy));
			ctx.stroke();
		}
	}
	this.drawCircle = function() {
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.arc(15, 15, 10, 0, 2*Math.PI, true);
		ctx.closePath();
		ctx.fill();
	}
}

