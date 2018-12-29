function Painter(canvas) {
	this.canvas = canvas;
	var context = this.canvas.getContext("2d");
	var dx = 30, dy = 30;
	var startX = 15, startY = 15;
	var spacing = 14; 
	
	this.setMainVeiw = function(mainView) {
		this.mainView = mainView;
	};
	this.drawCheckerBoard = function(){
		context.strokeStyle="#000000";
		context.lineWidth = 2;
		// 畫直線
		for (i = 0; i <= spacing; i++) {
			context.beginPath();
			context.moveTo(startX + (i * dx), startY);
			context.lineTo(startX + (i * dx), startY + spacing * dy);
			context.stroke();
		}
		// 畫橫線
		for (j = 0; j <= spacing; j++) {
			context.beginPath();
			context.moveTo(startX, startY + (j * dy));
			context.lineTo(startX + spacing * dx, startY + (j * dy));
			context.stroke();
		}
	};
	this.drawCircle = function(chessColor, row, column) {
		context.fillStyle = chessColor;
		context.beginPath();
		context.arc(column * dx - 15, row * dy - 15, 10, 0, 2*Math.PI, true);
		context.closePath();
		context.fill();
	};
	this.clearCanvas = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
}

