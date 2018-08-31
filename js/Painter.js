function Painter() {
	this.drawCheckerBoard = function(){
		var canvas = document.getElementById("checkerboard");
		var ctx = canvas.getContext("2d");
		var startX = 5, startY = 5 + 0.5;
		var boardWidth = canvas.width - 10, boardHeight = canvas.height - 10;
		var spacing = 14; 
		var biasX = boardWidth / spacing, biasY = boardHeight / spacing;
		ctx.strokeStyle="#000000";
		ctx.lineWidth = 2;
		// 畫直線
		for (i = 0; i <= spacing; i++) {	
			ctx.beginPath();
			ctx.moveTo(startX + (i * biasX), startY);
			ctx.lineTo(startX + (i * biasX), startY + boardHeight);
			ctx.stroke();
		}
		// 畫橫線
		ctx.lineWidth = 1;
		for (j = 0; j <= spacing; j++) {
			ctx.beginPath();
			ctx.moveTo(startX, startY + (j * biasY));
			ctx.lineTo(startX + boardWidth, startY + (j * biasY));
			ctx.stroke();
		}
	}
}
